import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Trophy, ExternalLink, Search, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGasStore } from '@/store/gasStore'
import confetti from 'canvas-confetti'

const DonatePage = () => {
  const { isConnected, donors, addDonation } = useGasStore()
  const [donationAmount, setDonationAmount] = useState('')
  const [donationType, setDonationType] = useState<'main' | 'subdomain'>('main')
  const [targetSubdomain, setTargetSubdomain] = useState('')
  const [donationStatus, setDonationStatus] = useState<'idle' | 'processing' | 'success'>('idle')

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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span>Make a Donation</span>
                  </CardTitle>
                  <CardDescription>
                    Help onboard new users to Ethereum by sponsoring their gas fees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isConnected ? (
                    <div className="text-center space-y-4">
                      <p className="text-muted-foreground">Connect your wallet to start donating</p>
                      <Button onClick={handleConnect} className="btn-ethereum">
                        Connect Wallet
                      </Button>
                    </div>
                  ) : donationStatus === 'success' ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-4 py-8"
                    >
                      <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">Thank You!</h3>
                        <p className="text-muted-foreground">Your donation of {donationAmount} ETH will help onboard new users</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => window.open('https://etherscan.io', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Transaction
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Donation Amount (ETH)</Label>
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
                                {amount} ETH
                              </Button>
                            ))}
                          </div>
                        </div>

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
                                <div className="flex items-center space-x-2">
                                  <Zap className="w-4 h-4" />
                                  <span>Main Pool (gasfund.eth)</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="subdomain">
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4" />
                                  <span>Specific ENS Subdomain</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

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
                      </div>

                      {donationAmount && (
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Donation Amount:</span>
                            <span className="font-semibold">{donationAmount} ETH</span>
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

                      <Button
                        onClick={handleDonate}
                        disabled={!donationAmount || donationStatus === 'processing'}
                        className="btn-ethereum w-full py-6 text-lg font-semibold"
                      >
                        {donationStatus === 'processing' ? 'Processing Donation...' : 'Donate to Gas4All'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <div className="space-y-6">
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <span>Top Donors</span>
                  </CardTitle>
                  <CardDescription>
                    Our amazing sponsors making Web3 accessible
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {donors.slice(0, 10).map((donor, index) => {
                    const badgeInfo = getBadgeInfo(donor.badge)
                    return (
                      <div key={donor.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                            index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                            'bg-gradient-primary'
                          } text-white`}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm truncate">
                              {donor.ensName || `${donor.address.slice(0, 6)}...${donor.address.slice(-4)}`}
                            </span>
                            <Badge className={`${badgeInfo.color} text-xs`}>
                              {badgeInfo.label}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{donor.amount} ETH</span>
                            <span>{formatTimeAgo(donor.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DonatePage