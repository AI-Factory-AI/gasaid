import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, CheckCircle, AlertCircle, Shield, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGasStore } from '@/store/gasStore'
import confetti from 'canvas-confetti'

const ClaimPage = () => {
  const { isConnected, userAddress, userEnsName, addClaim } = useGasStore()
  const [claimStatus, setClaimStatus] = useState<'idle' | 'verifying' | 'claiming' | 'success' | 'error'>('idle')
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending')

  const handleConnect = () => {
    // Simulate wallet connection
    useGasStore.getState().setConnected(true)
    useGasStore.getState().setUserAddress('0xNewUser1234567890abcdef1234567890abcdef12')
    useGasStore.getState().setUserEnsName('alex.gasfund.eth')
  }

  const handleVerifyEFP = async () => {
    setClaimStatus('verifying')
    
    // Simulate EFP verification
    setTimeout(() => {
      setVerificationStatus('verified')
      setClaimStatus('idle')
    }, 2000)
  }

  const handleClaimGas = async () => {
    if (verificationStatus !== 'verified') {
      handleVerifyEFP()
      return
    }

    setClaimStatus('claiming')
    
    // Simulate claiming process
    setTimeout(() => {
      addClaim({
        address: userAddress || '0xNewUser1234567890abcdef1234567890abcdef12',
        ensSubdomain: 'alex.gasfund.eth',
        amount: 0.05,
        timestamp: Date.now(),
        verified: true
      })
      
      setClaimStatus('success')
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }, 2000)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
                Claim Your Sponsored Gas
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect your wallet to claim sponsored gas fees and get your free ENS subdomain
              </p>
            </div>

            <Card className="card-ethereum max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  Get started by connecting your Ethereum wallet to claim sponsored gas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleConnect}
                  className="btn-ethereum w-full py-6 text-lg font-semibold"
                >
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
              Claim Your Gas
            </h1>
            <p className="text-xl text-muted-foreground">
              Get sponsored gas fees and your ENS subdomain
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* User Info Card */}
            <Card className="card-ethereum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span>Your Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    {userAddress || '0xNewUser1234567890abcdef1234567890abcdef12'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">ENS Subdomain</label>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm flex items-center justify-between">
                    <span>{userEnsName || 'alex.gasfund.eth'}</span>
                    <Badge variant="secondary" className="bg-gradient-primary text-white border-0">
                      Assigned
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                  <div className="flex items-center space-x-2">
                    {verificationStatus === 'verified' ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="text-success font-medium">EFP Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-warning" />
                        <span className="text-warning font-medium">Verification Required</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claim Card */}
            <Card className="card-ethereum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span>Gas Claim</span>
                </CardTitle>
                <CardDescription>
                  Claim your sponsored gas fees to start using Ethereum
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {claimStatus === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-success">Claim Successful!</h3>
                      <p className="text-muted-foreground">0.05 ETH has been added to your wallet</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open('https://etherscan.io', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Etherscan
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gas Amount:</span>
                        <span className="font-semibold">0.05 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Gas Price:</span>
                        <span className="font-semibold">25 gwei</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transactions Covered:</span>
                        <span className="font-semibold">~15-20 txns</span>
                      </div>
                    </div>

                    {verificationStatus !== 'verified' && (
                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                          <div className="space-y-2">
                            <h4 className="font-medium text-warning">EFP Verification Required</h4>
                            <p className="text-sm text-muted-foreground">
                              Verify your identity with EFP Passport to claim sponsored gas fees
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleClaimGas}
                      disabled={claimStatus === 'verifying' || claimStatus === 'claiming'}
                      className="btn-ethereum w-full py-6 text-lg font-semibold"
                    >
                      {claimStatus === 'verifying' && 'Verifying Identity...'}
                      {claimStatus === 'claiming' && 'Claiming Gas...'}
                      {claimStatus === 'idle' && verificationStatus === 'verified' && 'Claim 0.05 ETH'}
                      {claimStatus === 'idle' && verificationStatus !== 'verified' && 'Verify & Claim Gas'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClaimPage