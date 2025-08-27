import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGasStore } from '@/store/gasStore'

const AdminPage = () => {
  const { isConnected, recentClaimants, stats } = useGasStore()
  const [newSubdomain, setNewSubdomain] = useState('')
  const [gasAllocation, setGasAllocation] = useState('')
  const [isAdmin, setIsAdmin] = useState(true) // Mock admin status

  // Mock pending claims
  const pendingClaims = [
    {
      id: '1',
      address: '0xPending1234567890abcdef1234567890abcdef12',
      requestedAmount: 0.05,
      timestamp: Date.now() - 1800000,
      status: 'pending',
      verificationScore: 85
    },
    {
      id: '2',
      address: '0xPending5678901234567890abcdef1234567890ab',
      requestedAmount: 0.03,
      timestamp: Date.now() - 3600000,
      status: 'reviewing',
      verificationScore: 92
    },
    {
      id: '3',
      address: '0xPending9012345678901234567890abcdef123456',
      requestedAmount: 0.04,
      timestamp: Date.now() - 5400000,
      status: 'flagged',
      verificationScore: 45
    }
  ]

  const handleCreateSubdomain = () => {
    if (newSubdomain) {
      // Mock subdomain creation
      console.log('Creating subdomain:', newSubdomain)
      setNewSubdomain('')
    }
  }

  const handleAllocateGas = () => {
    if (gasAllocation) {
      // Mock gas allocation
      console.log('Allocating gas:', gasAllocation)
      setGasAllocation('')
    }
  }

  const handleClaimAction = (claimId: string, action: 'approve' | 'reject') => {
    console.log(`${action} claim:`, claimId)
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

  if (!isConnected || !isAdmin) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-white text-4xl font-bold">
                A
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Access Required
              </h1>
              <p className="text-xl text-muted-foreground">
                {!isConnected 
                  ? 'Connect your wallet to access the admin panel'
                  : 'This page is restricted to Gas4All administrators only'
                }
              </p>
            </div>

            {!isConnected && (
              <Button 
                onClick={() => {
                  useGasStore.getState().setConnected(true)
                  useGasStore.getState().setUserAddress('0x742d35Cc6635C0532925a3b8C17C5f54aa8900F2')
                  setIsAdmin(true)
                }}
                className="btn-ethereum"
              >
                Connect Admin Wallet
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage Gas4All operations and user onboarding
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-background border border-border/50 rounded-lg p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{pendingClaims.length}</p>
                <p className="text-sm text-muted-foreground">Pending Claims</p>
              </div>
            </div>

            <div className="bg-background border border-border/50 rounded-lg p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{stats.totalSubdomains}</p>
                <p className="text-sm text-muted-foreground">ENS Subdomains</p>
              </div>
            </div>

            <div className="bg-background border border-border/50 rounded-lg p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">38.5</p>
                <p className="text-sm text-muted-foreground">ETH Available</p>
              </div>
            </div>

            <div className="bg-background border border-border/50 rounded-lg p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">99.2%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="claims" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="claims">Pending Claims</TabsTrigger>
              <TabsTrigger value="subdomains">ENS Management</TabsTrigger>
              <TabsTrigger value="allocation">Gas Allocation</TabsTrigger>
            </TabsList>

            {/* Pending Claims */}
            <TabsContent value="claims" className="space-y-6">
              <div className="bg-background border border-border/50 rounded-lg p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Pending Gas Claims</h2>
                  <p className="text-sm text-muted-foreground">
                    Review and approve gas fee claims from new users
                  </p>
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User Address</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Verification Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-mono">
                            {claim.address.slice(0, 10)}...{claim.address.slice(-8)}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {claim.requestedAmount} ETH
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                claim.verificationScore >= 80 ? 'bg-success' :
                                claim.verificationScore >= 60 ? 'bg-warning' : 'bg-destructive'
                              }`} />
                              <span className={
                                claim.verificationScore >= 80 ? 'text-success' :
                                claim.verificationScore >= 60 ? 'text-warning' : 'text-destructive'
                              }>
                                {claim.verificationScore}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              claim.status === 'pending' ? 'secondary' :
                              claim.status === 'reviewing' ? 'default' : 'destructive'
                            }>
                              {claim.status === 'flagged' && <AlertTriangle className="w-3 h-3 mr-1" />}
                              {claim.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatTimeAgo(claim.timestamp)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-success hover:bg-success/90"
                                onClick={() => handleClaimAction(claim.id, 'approve')}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleClaimAction(claim.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* ENS Management */}
            <TabsContent value="subdomains" className="space-y-6">
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle>Create ENS Subdomain</CardTitle>
                  <CardDescription>
                    Issue new ENS subdomains for verified users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subdomain">Subdomain Name</Label>
                      <div className="flex">
                        <Input
                          id="subdomain"
                          placeholder="username"
                          value={newSubdomain}
                          onChange={(e) => setNewSubdomain(e.target.value)}
                          className="rounded-r-none"
                        />
                        <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                          .gasfund.eth
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleCreateSubdomain}
                        disabled={!newSubdomain}
                        className="btn-ethereum w-full"
                      >
                        Create Subdomain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle>Recent Subdomains</CardTitle>
                  <CardDescription>
                    Recently created ENS subdomains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentClaimants.map((claimant) => (
                      <div key={claimant.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                            {claimant.ensSubdomain ? claimant.ensSubdomain.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-medium">{claimant.ensSubdomain}</p>
                            <p className="text-sm text-muted-foreground">
                              {claimant.address.slice(0, 10)}...{claimant.address.slice(-8)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-success/20 text-success">
                            Active
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimeAgo(claimant.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gas Allocation */}
            <TabsContent value="allocation" className="space-y-6">
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle>Manual Gas Allocation</CardTitle>
                  <CardDescription>
                    Manually allocate gas fees to specific users or addresses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="allocation-address">Recipient Address</Label>
                      <Input
                        id="allocation-address"
                        placeholder="0x..."
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allocation-amount">Amount (ETH)</Label>
                      <Input
                        id="allocation-amount"
                        type="number"
                        step="0.001"
                        placeholder="0.05"
                        value={gasAllocation}
                        onChange={(e) => setGasAllocation(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleAllocateGas}
                        disabled={!gasAllocation}
                        className="btn-ethereum w-full"
                      >
                        Allocate Gas
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle>Pool Management</CardTitle>
                  <CardDescription>
                    Monitor and manage the gas sponsorship pool
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-primary">38.5 ETH</p>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-secondary">104.2 ETH</p>
                      <p className="text-sm text-muted-foreground">Total Allocated</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-success">73%</p>
                      <p className="text-sm text-muted-foreground">Utilization Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminPage