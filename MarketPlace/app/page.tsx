export const dynamic = "force-static"

export function generateMetadata() {
  return {
    title: "Redirecting...",
    description: "Redirecting to marketplace",
  }
}

export default function HomePage() {
  return null
}

export const runtime = "edge"

export async function generateStaticParams() {
  return []
}

export function generateViewport() {
  return {
    themeColor: "#000000",
  }
}
