"""
Module for downloading datasets from the Walrus aggregator.
"""
import requests
from pathlib import Path
import logging
import base64
import hashlib
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import tempfile
import shutil
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

AGGREGATOR_URL = "https://aggregator.walrus-testnet.walrus.space"

def _openssl_kdf(passphrase: bytes, salt: bytes, key_len: int = 32, iv_len: int = 16):
    """
    Derive key and IV using OpenSSL's EVP_BytesToKey (MD5-based) algorithm.
    """
    d = b''
    last = b''
    # Keep hashing until we have enough bytes for key+iv
    while len(d) < key_len + iv_len:
        last = hashlib.md5(last + passphrase + salt).digest()
        d += last
    return d[:key_len], d[key_len:key_len+iv_len]

def decrypt_blob_id(ciphertext_b64: str, passphrase: str) -> str:
    """
    Decrypts a CryptoJS OpenSSL-formatted AES blob:
      - ciphertext_b64: the Base64 string from CryptoJS.AES.encrypt(...).toString()
      - passphrase: the same key string you passed into CryptoJS (here, the hex SHA-256 of your JWT secret)
    """
    try:
        logger.info("Starting blob ID decryption")
        raw = base64.b64decode(ciphertext_b64)                            # Base64 ▶ bytes
        assert raw.startswith(b"Salted__"), "Invalid OpenSSL header"       # Check for Salted__ prefix
        salt = raw[8:16]                                                   # Next 8 bytes = salt
        ct = raw[16:]                                                      # Remaining bytes = ciphertext
        key, iv = _openssl_kdf(passphrase.encode('utf-8'), salt)           # Derive key & IV
        cipher = AES.new(key, AES.MODE_CBC, iv)                            # AES-CBC mode
        pt = unpad(cipher.decrypt(ct), AES.block_size)                     # Remove PKCS#7 padding
        decrypted = pt.decode('utf-8')
        logger.info("Successfully decrypted blob ID")
        return decrypted
    except Exception as e:
        logger.error(f"Failed to decrypt blob ID: {str(e)}")
        raise Exception(f"Decryption failed: {str(e)}")

def download_dataset(encrypted_blob_id: str, jwt_secret: str, output_file: str) -> None:
    """
    Download a dataset using requests.
    
    Args:
        encrypted_blob_id (str): The encrypted blob ID of the dataset to download.
        jwt_secret (str): The JWT secret used to decrypt the blob ID.
        output_file (str): The name of the file to save the dataset to.
    """
    temp_file = None
    temp_path = None
    try:
        # Decrypt the blob ID
        logger.info("Generating JWT key from secret")
        jwt_key = hashlib.sha256(jwt_secret.encode('utf-8')).hexdigest()
        logger.info("Decrypting blob ID")
        blob_id = decrypt_blob_id(encrypted_blob_id, jwt_key)
        logger.info(f"Decrypted blob ID: {blob_id}")
        
        # Download the dataset
        url = f"{AGGREGATOR_URL}/v1/blobs/{blob_id}"
        logger.info(f"Downloading from {url}")
        
        # Create a temporary file for downloading
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        temp_path = Path(temp_file.name)
        temp_file.close()  # Close the file handle before writing
        
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Get content length if available
        content_length = response.headers.get('content-length')
        if content_length:
            logger.info(f"Content length: {content_length} bytes")
        
        # Download to temporary file
        with temp_path.open('wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        # Verify the temporary file was created and has content
        if not temp_path.exists():
            raise Exception(f"Failed to create temporary file: {temp_path}")
        
        temp_size = temp_path.stat().st_size
        if temp_size == 0:
            raise Exception(f"Downloaded file is empty: {temp_path}")
            
        logger.info(f"Successfully downloaded {temp_size} bytes to temporary file")
        
        # Create output directory if it doesn't exist
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Move the temporary file to the final location
        try:
            shutil.move(str(temp_path), str(output_path))
            logger.info(f"Moved dataset to {output_path}")
        except Exception as e:
            # If move fails, try copy and delete
            logger.warning(f"Move failed, trying copy and delete: {str(e)}")
            shutil.copy2(str(temp_path), str(output_path))
            os.unlink(str(temp_path))
            logger.info(f"Copied dataset to {output_path}")
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to download dataset: {str(e)}")
        if hasattr(e.response, 'text'):
            logger.error(f"Response text: {e.response.text}")
        raise
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise
    finally:
        # Clean up temporary file if it exists
        if temp_path and temp_path.exists():
            try:
                os.unlink(str(temp_path))
                logger.info("Cleaned up temporary file")
            except Exception as e:
                logger.error(f"Failed to clean up temporary file: {str(e)}")

if __name__ == "__main__":
    # Example usage
    encrypted_blob_id = "U2FsdGVkX1+b4DRNpbrtDpkJid8126xTdyD4DcHas5lBw4o6FVVVa/8yomldQcYYnrDygNHiHxHs91NCjRotoQ=="
    jwt_secret = "my-super-secret"  # Replace with your actual JWT secret
    output_file = "dataset.csv"
    download_dataset(encrypted_blob_id, jwt_secret, output_file)
