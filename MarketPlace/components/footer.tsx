export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Solana Breakout Hackathon. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="https://solana.com" target="_blank" rel="noreferrer" className="hover:underline">
            Solana
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
