import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Badge } from '@/components/ui/badge'
import { useGasStore } from '@/store/gasStore'
import NetworkSelector, { Network, NETWORKS } from '@/components/NetworkSelector'
import confetti from 'canvas-confetti'

const ClaimPage = () => {
  const { isConnected, userAddress, userEnsName, addClaim } = useGasStore()
  const [claimStatus, setClaimStatus] = useState<'idle' | 'verifying' | 'claiming' | 'success' | 'error'>('idle')
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending')
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0]) // Default to Ethereum

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

            <div className="bg-background border border-border/50 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Connect Your Wallet</h2>
                <p className="text-sm text-muted-foreground">
                  Get started by connecting your Ethereum wallet to claim sponsored gas
                </p>
              </div>
              <Button 
                onClick={handleConnect}
                className="btn-ethereum w-full py-6 text-lg font-semibold"
              >
                Connect Wallet
              </Button>
            </div>
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

                     {/* Main Claim Card */}
           <div className="bg-background border border-border/50 rounded-lg p-6 max-w-2xl mx-auto">
           
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

               {/* User Info */}
               <div className="space-y-4">
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
               </div>

              {/* Claim Status */}
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
                    View on Etherscan
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {/* Gas Details */}
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

                  {/* Verification Warning */}
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

                  {/* Claim Button */}
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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClaimPage