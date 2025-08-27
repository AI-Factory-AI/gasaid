import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface Network {
  id: string
  name: string
  chainId: number
  logo: string
  isTestnet?: boolean
  gasToken: string
}

const NETWORKS: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum Mainnet',
    chainId: 1,
    logo: '🔷',
    gasToken: 'ETH'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    logo: '🟣',
    gasToken: 'MATIC'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    chainId: 42161,
    logo: '🔵',
    gasToken: 'ETH'
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    logo: '🔴',
    gasToken: 'ETH'
  },
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    logo: '🔷',
    gasToken: 'ETH'
  },
  {
    id: 'sepolia',
    name: 'Sepolia Testnet',
    chainId: 11155111,
    logo: '🔷',
    isTestnet: true,
    gasToken: 'SepoliaETH'
  },
  {
    id: 'mumbai',
    name: 'Polygon Mumbai',
    chainId: 80001,
    logo: '🟣',
    isTestnet: true,
    gasToken: 'MATIC'
  }
]

interface NetworkSelectorProps {
  selectedNetwork: Network
  onNetworkChange: (network: Network) => void
  title?: string
  description?: string
}

export const NetworkSelector = ({ 
  selectedNetwork, 
  onNetworkChange, 
  title,
  description
}: NetworkSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-12 px-3 border-border/50 hover:bg-muted/50"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">{selectedNetwork.logo}</span>
            <div className="text-left">
              <div className="font-medium text-sm">{selectedNetwork.name}</div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        {NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => onNetworkChange(network)}
            className="p-3 cursor-pointer hover:bg-muted/50"
          >
            <div className="flex items-center space-x-3 w-full">
              <span className="text-lg">{network.logo}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{network.name}</div>
                <div className="text-xs text-muted-foreground">
                  {network.gasToken}
                </div>
              </div>
              {selectedNetwork.id === network.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { NETWORKS }
export default NetworkSelector