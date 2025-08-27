import { create } from 'zustand'

// Mock data for demo purposes
export interface Donor {
  id: string
  address: string
  ensName?: string
  amount: number
  timestamp: number
  badge?: 'gold' | 'silver' | 'bronze' | 'supporter'
}

export interface Claimant {
  id: string
  address: string
  ensSubdomain?: string
  amount: number
  timestamp: number
  verified: boolean
}

export interface Stats {
  totalDonated: number
  totalClaims: number
  totalUsers: number
  totalSubdomains: number
}

interface GasStore {
  // State
  stats: Stats
  donors: Donor[]
  recentClaimants: Claimant[]
  isConnected: boolean
  userAddress?: string
  userEnsName?: string
  userBalance: number
  
  // Actions
  setConnected: (connected: boolean) => void
  setUserAddress: (address: string) => void
  setUserEnsName: (ensName: string) => void
  updateStats: (stats: Partial<Stats>) => void
  addDonation: (donation: Omit<Donor, 'id'>) => void
  addClaim: (claim: Omit<Claimant, 'id'>) => void
}

// Mock data
const mockDonors: Donor[] = [
  {
    id: '1',
    address: '0x742d35Cc6635C0532925a3b8C17C5f54aa8900F2',
    ensName: 'vitalik.eth',
    amount: 5.2,
    timestamp: Date.now() - 3600000,
    badge: 'gold'
  },
  {
    id: '2',
    address: '0x8ba1f109551bD432803012645Hac136c60dCdC34',
    ensName: 'consensys.eth',
    amount: 10.0,
    timestamp: Date.now() - 7200000,
    badge: 'gold'
  },
  {
    id: '3',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    ensName: 'uniswap.eth',
    amount: 15.5,
    timestamp: Date.now() - 10800000,
    badge: 'gold'
  },
  {
    id: '4',
    address: '0xA0b86a33E6c6C1A7C0DB4b7D6CF4d7a8A7B8E89C',
    ensName: 'polygon.eth',
    amount: 3.8,
    timestamp: Date.now() - 14400000,
    badge: 'silver'
  },
  {
    id: '5',
    address: '0xB1234567890abcdef1234567890abcdef12345678',
    ensName: 'ethereum.eth',
    amount: 25.0,
    timestamp: Date.now() - 18000000,
    badge: 'gold'
  }
]

const mockClaimants: Claimant[] = [
  {
    id: '1',
    address: '0xNewUser1234567890abcdef1234567890abcdef12',
    ensSubdomain: 'alex.gasfund.eth',
    amount: 0.05,
    timestamp: Date.now() - 1800000,
    verified: true
  },
  {
    id: '2',
    address: '0xNewUser5678901234567890abcdef1234567890ab',
    ensSubdomain: 'sarah.gasfund.eth',
    amount: 0.03,
    timestamp: Date.now() - 3600000,
    verified: true
  },
  {
    id: '3',
    address: '0xNewUser9012345678901234567890abcdef123456',
    ensSubdomain: 'marcus.gasfund.eth',
    amount: 0.04,
    timestamp: Date.now() - 5400000,
    verified: true
  }
]

const mockStats: Stats = {
  totalDonated: 142.7,
  totalClaims: 287,
  totalUsers: 1250,
  totalSubdomains: 847
}

export const useGasStore = create<GasStore>((set, get) => ({
  // Initial state
  stats: mockStats,
  donors: mockDonors,
  recentClaimants: mockClaimants,
  isConnected: false,
  userBalance: 0,

  // Actions
  setConnected: (connected) => set({ isConnected: connected }),
  
  setUserAddress: (address) => set({ userAddress: address }),
  
  setUserEnsName: (ensName) => set({ userEnsName: ensName }),
  
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats }
  })),
  
  addDonation: (donation) => set((state) => ({
    donors: [
      { ...donation, id: Date.now().toString() },
      ...state.donors
    ].slice(0, 50), // Keep only last 50
    stats: {
      ...state.stats,
      totalDonated: state.stats.totalDonated + donation.amount
    }
  })),
  
  addClaim: (claim) => set((state) => ({
    recentClaimants: [
      { ...claim, id: Date.now().toString() },
      ...state.recentClaimants
    ].slice(0, 20), // Keep only last 20
    stats: {
      ...state.stats,
      totalClaims: state.stats.totalClaims + 1,
      totalUsers: state.stats.totalUsers + 1
    }
  }))
}))