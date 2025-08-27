import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Trophy, ExternalLink, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGasStore } from '@/store/gasStore'
import { Network, NETWORKS } from '@/components/NetworkSelector'
import confetti from 'canvas-confetti'

const DonatePage = () => {
  const { isConnected, donors, addDonation } = useGasStore()
  const [donationAmount, setDonationAmount] = useState('')
  const [donationType, setDonationType] = useState<'main' | 'subdomain'>('main')
  const [targetSubdomain, setTargetSubdomain] = useState('')
  const [donationStatus, setDonationStatus] = useState<'idle' | 'processing' | 'success'>('idle')
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0]) // Default to Ethereum

  const handleConnect = () => {
    useGasStore.getState().setConnected(true)
    useGasStore.getState().setUserAddress('0x742d35Cc6635C0532925a3b8C17C5f54aa8900F2')
    useGasStore.getState().setUserEnsName('donor.eth')
  }

  const handleDonate = async () => {
    if (!donationAmount || !isConnected) return

    setDonationStatus('processing')

    // Simulate donation process
    setTimeout(() => {
      addDonation({
        address: '0x742d35Cc6635C0532925a3b8C17C5f54aa8900F2',
        ensName: 'donor.eth',
        amount: parseFloat(donationAmount),
        timestamp: Date.now(),
        badge: parseFloat(donationAmount) >= 10 ? 'gold' : parseFloat(donationAmount) >= 5 ? 'silver' : 'bronze'
      })

      setDonationStatus('success')
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      // Reset form
      setTimeout(() => {
        setDonationAmount('')
        setTargetSubdomain('')
        setDonationStatus('idle')
      }, 3000)
    }, 2000)
  }

  const getBadgeInfo = (badge?: string) => {
    switch (badge) {
      case 'gold':
        return { label: 'Gold Sponsor', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' }
      case 'silver':
        return { label: 'Silver Sponsor', color: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' }
      case 'bronze':
        return { label: 'Bronze Sponsor', color: 'bg-gradient-to-r from-amber-600 to-amber-800 text-white' }
      default:
        return { label: 'Supporter', color: 'bg-gradient-primary text-white' }
    }
  }

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
              Sponsor Gas Fees
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Support Web3 adoption by sponsoring gas fees for new users. Every donation helps onboard more people to Ethereum.
            </p>
          </div>

          {/* Main Donation Card */}
          <div className="bg-background border border-border/50 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Sponsor Gas Fees</h2>
              <p className="text-muted-foreground">
                Help onboard new users to Ethereum by sponsoring their gas fees
              </p>
            </div>
            <div className="space-y-6">
              {/* Network Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Selected Network</label>
                <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                      🔷
                    </div>
                    <div>
                      <p className="font-medium">{selectedNetwork.name}</p>
                      <p className="text-xs text-muted-foreground">Chain ID: {selectedNetwork.chainId}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-secondary text-white border-0">
                    {selectedNetwork.gasToken}
                  </Badge>
                </div>
              </div>

              {/* Donation Form */}
              {!isConnected ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">Connect your wallet to start donating</p>
                  <Button onClick={handleConnect} className="btn-ethereum w-full py-6 text-lg font-semibold">
                    Connect Wallet
                  </Button>
                </div>
              ) : donationStatus === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Thank You!</h3>
                    <p className="text-muted-foreground">Your donation of {donationAmount} {selectedNetwork.gasToken} will help onboard new users</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://etherscan.io', '_blank')}
                  >
                    View Transaction
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Donation Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Donation Amount ({selectedNetwork.gasToken})</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.001"
                      min="0"
                      placeholder="0.1"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="text-lg font-semibold"
                    />
                    <div className="flex space-x-2">
                      {['0.1', '0.5', '1.0', '5.0'].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDonationAmount(amount)}
                        >
                          {amount} {selectedNetwork.gasToken}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Donation Target */}
                  <div className="space-y-2">
                    <Label>Donation Target</Label>
                    <Select
                      value={donationType}
                      onValueChange={(value) => setDonationType(value as 'main' | 'subdomain')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">
                          <span>Main Pool (gasfund.eth)</span>
                        </SelectItem>
                        <SelectItem value="subdomain">
                          <span>Specific ENS Subdomain</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Target Subdomain */}
                  {donationType === 'subdomain' && (
                    <div className="space-y-2">
                      <Label htmlFor="subdomain">Target ENS Subdomain</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="subdomain"
                          placeholder="alex.gasfund.eth"
                          value={targetSubdomain}
                          onChange={(e) => setTargetSubdomain(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  {/* Donation Summary */}
                  {donationAmount && (
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Donation Amount:</span>
                        <span className="font-semibold">{donationAmount} {selectedNetwork.gasToken}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network:</span>
                        <span className="font-semibold">{selectedNetwork.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Users Supported:</span>
                        <span className="font-semibold">~{Math.floor(parseFloat(donationAmount || '0') / 0.05)} users</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sponsor Badge:</span>
                        <Badge className={getBadgeInfo(
                          parseFloat(donationAmount) >= 10 ? 'gold' : 
                          parseFloat(donationAmount) >= 5 ? 'silver' : 'bronze'
                        ).color}>
                          {getBadgeInfo(
                            parseFloat(donationAmount) >= 10 ? 'gold' : 
                            parseFloat(donationAmount) >= 5 ? 'silver' : 'bronze'
                          ).label}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Donate Button */}
                  <Button
                    onClick={handleDonate}
                    disabled={!donationAmount || donationStatus === 'processing'}
                    className="btn-ethereum w-full py-6 text-lg font-semibold"
                  >
                    {donationStatus === 'processing' ? 'Processing Donation...' : 'Donate to Gas4All'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Top Donors */}
          <div className="bg-background border border-border/50 rounded-lg p-6 max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">Top Donors</h2>
              <p className="text-sm text-muted-foreground">
                Our amazing sponsors making Web3 accessible
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rank</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Donor</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Badge</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.slice(0, 9).map((donor, index) => {
                    const badgeInfo = getBadgeInfo(donor.badge)
                    return (
                      <tr key={donor.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                            index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                            'bg-primary'
                          } text-white`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium">
                            {donor.ensName || `${donor.address.slice(0, 6)}...${donor.address.slice(-4)}`}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${badgeInfo.color} text-xs`}>
                            {badgeInfo.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 font-semibold">
                          {donor.amount} ETH
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {formatTimeAgo(donor.timestamp)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DonatePage