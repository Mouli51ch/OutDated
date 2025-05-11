import { NextResponse } from "next/server"

// Mock data for NFTs
const nfts = [
  {
    id: "1",
    title: "Cosmic Horizon",
    description: "A journey through the stars and beyond",
    price: 2.5,
    image: "/placeholder.svg?key=29m7e",
    creator: "8xn3WHv2dtt7GRxBnPJQ3TxBBXzEShxQi4E456ewh7qz",
  },
  {
    id: "2",
    title: "Digital Dreams",
    description: "Exploring the boundaries of digital art",
    price: 1.8,
    image: "/placeholder.svg?key=ckrxe",
    creator: "6Yg5Cgs7wMxJqLpXEfZNUBzYNQXy8rWQApxPZQXRJgWk",
  },
  {
    id: "3",
    title: "Neon Jungle",
    description: "Vibrant colors in a digital ecosystem",
    price: 3.2,
    image: "/placeholder.svg?key=z64h8",
    creator: "2xn3WHv2dtt7GRxBnPJQ3TxBBXzEShxQi4E456ewh7qz",
  },
  {
    id: "4",
    title: "Quantum Leap",
    description: "A visualization of quantum mechanics",
    price: 4.5,
    image: "/placeholder.svg?key=6tfqs",
    creator: "9Yg5Cgs7wMxJqLpXEfZNUBzYNQXy8rWQApxPZQXRJgWk",
  },
  {
    id: "5",
    title: "Solana Sunrise",
    description: "The dawn of a new blockchain era",
    price: 5.0,
    image: "/placeholder.svg?key=ctbld",
    creator: "3xn3WHv2dtt7GRxBnPJQ3TxBBXzEShxQi4E456ewh7qz",
  },
  {
    id: "6",
    title: "Crypto Waves",
    description: "Riding the waves of cryptocurrency",
    price: 2.2,
    image: "/placeholder.svg?key=8gmiq",
    creator: "7Yg5Cgs7wMxJqLpXEfZNUBzYNQXy8rWQApxPZQXRJgWk",
  },
]

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(nfts)
  } catch (error) {
    console.error("Error fetching datasets:", error)
    return NextResponse.json({ error: "Failed to fetch datasets" }, { status: 500 })
  }
}
