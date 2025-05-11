"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"

export function ConnectButton() {
  const { connected, publicKey } = useWallet()
  const { setVisible } = useWalletModal()

  const handleConnect = () => {
    setVisible(true)
  }

  if (connected && publicKey) {
    return (
      <Button variant="outline" className="font-mono">
        {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
      </Button>
    )
  }

  return (
    <Button onClick={handleConnect} className="bg-solana-gradient hover:opacity-90 text-white">
      Connect Wallet
    </Button>
  )
}
