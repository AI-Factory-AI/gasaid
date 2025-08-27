import { useState } from 'react'
import { ChevronDown, Globe, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

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
  title = "Select Network",
  description = "Choose the network for your transaction"
}: NetworkSelectorProps) => {
  return (
    <Card className="card-ethereum">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span>{title}</span>
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-14 px-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedNetwork.logo}</span>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{selectedNetwork.name}</span>
                    {selectedNetwork.isTestnet && (
                      <Badge variant="secondary" className="text-xs">
                        Testnet
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Chain ID: {selectedNetwork.chainId}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[300px]" align="start">
            {NETWORKS.map((network) => (
              <DropdownMenuItem
                key={network.id}
                onClick={() => onNetworkChange(network)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{network.logo}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{network.name}</span>
                        {network.isTestnet && (
                          <Badge variant="secondary" className="text-xs">
                            Testnet
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Chain ID: {network.chainId} • Gas: {network.gasToken}
                      </span>
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

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Selected Network:</span>
            <span className="font-medium">{selectedNetwork.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gas Token:</span>
            <span className="font-medium">{selectedNetwork.gasToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Chain ID:</span>
            <span className="font-medium">{selectedNetwork.chainId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { NETWORKS }
export default NetworkSelector