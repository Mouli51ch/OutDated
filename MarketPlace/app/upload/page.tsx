import { FileUpload } from "@/components/file-upload"

export default function UploadPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Your NFT</h1>
          <p className="text-muted-foreground">Upload your artwork and create an NFT on the Solana blockchain</p>
        </div>
        <FileUpload />
      </div>
    </div>
  )
}
