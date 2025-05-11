"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { toast } from "sonner"

// Mock public key class
class MockPublicKey {
  _key: string

  constructor(key = "8xn3WHv2dtt7GRxBnPJQ3TxBBXzEShxQi4E456ewh7qz") {
    this._key = key
  }

  toString() {
    return this._key
  }

  toBase58() {
    return this._key
  }

  toBuffer() {
    return Buffer.from(this._key)
  }
}

// Mock wallet context type
type MockWalletContextState = {
  publicKey: MockPublicKey | null
  connected: boolean
  connecting: boolean
  disconnect: () => Promise<void>
  connect: () => Promise<void>
  select: () => void
  wallet: any | null
  wallets: any[]
}

// Create context with default values
const MockWalletContext = createContext<MockWalletContextState>({
  publicKey: null,
  connected: false,
  connecting: false,
  disconnect: async () => {},
  connect: async () => {},
  select: () => {},
  wallet: null,
  wallets: [],
})

// Mock wallet modal context
type MockWalletModalContextState = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const MockWalletModalContext = createContext<MockWalletModalContextState>({
  visible: false,
  setVisible: () => {},
})

// Provider component
export function MockWalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicKey, setPublicKey] = useState<MockPublicKey | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Mock connect function
  const connect = async () => {
    setConnecting(true)

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setConnected(true)
    setPublicKey(new MockPublicKey())
    setConnecting(false)
    setModalVisible(false)

    toast.success("Wallet connected successfully")
  }

  // Mock disconnect function
  const disconnect = async () => {
    setConnected(false)
    setPublicKey(null)
    toast.success("Wallet disconnected")
  }

  // Mock wallet values
  const walletContextValue: MockWalletContextState = {
    publicKey,
    connected,
    connecting,
    disconnect,
    connect,
    select: () => setModalVisible(true),
    wallet: connected ? { adapter: { publicKey } } : null,
    wallets: [{ adapter: { name: "Phantom" } }, { adapter: { name: "Solflare" } }, { adapter: { name: "Glow" } }],
  }

  const modalContextValue: MockWalletModalContextState = {
    visible: modalVisible,
    setVisible: setModalVisible,
  }

  return (
    <MockWalletContext.Provider value={walletContextValue}>
      <MockWalletModalContext.Provider value={modalContextValue}>
        {children}
        {modalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Connect Wallet</h2>
              <p className="mb-4 text-muted-foreground">Select a wallet to connect:</p>
              <div className="space-y-2">
                <button
                  className="w-full rounded-md bg-purple-500/20 p-3 text-left hover:bg-purple-500/30"
                  onClick={connect}
                >
                  Phantom (Mock)
                </button>
                <button
                  className="w-full rounded-md bg-purple-500/20 p-3 text-left hover:bg-purple-500/30"
                  onClick={connect}
                >
                  Solflare (Mock)
                </button>
                <button
                  className="w-full rounded-md bg-purple-500/20 p-3 text-left hover:bg-purple-500/30"
                  onClick={connect}
                >
                  Glow (Mock)
                </button>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="rounded-md bg-muted px-4 py-2 hover:bg-muted/80"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </MockWalletModalContext.Provider>
    </MockWalletContext.Provider>
  )
}

// Custom hooks to use the mock wallet context
export const useWallet = () => useContext(MockWalletContext)
