import { motion } from 'framer-motion'
import { BarChart3, Users, Zap, Globe, TrendingUp, Trophy, Clock, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useGasStore } from '@/store/gasStore'

const DashboardPage = () => {
  const { stats, donors, recentClaimants } = useGasStore()

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  const getBadgeInfo = (badge?: string) => {
    switch (badge) {
      case 'gold':
        return { label: 'Gold', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' }
      case 'silver':
        return { label: 'Silver', color: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' }
      case 'bronze':
        return { label: 'Bronze', color: 'bg-gradient-to-r from-amber-600 to-amber-800 text-white' }
      default:
        return { label: 'Supporter', color: 'bg-gradient-primary text-white' }
    }
  }

  const statCards = [
    {
      title: 'Total ETH Donated',
      value: `${stats.totalDonated.toFixed(2)} ETH`,
      description: 'From generous sponsors',
      icon: TrendingUp,
      gradient: 'bg-gradient-primary',
      change: '+12.5% this week'
    },
    {
      title: 'Gas Claims Made',
      value: stats.totalClaims.toLocaleString(),
      description: 'Successful transactions',
      icon: Zap,
      gradient: 'bg-gradient-secondary',
      change: '+8.3% this week'
    },
    {
      title: 'Users Onboarded',
      value: stats.totalUsers.toLocaleString(),
      description: 'New to Ethereum',
      icon: Users,
      gradient: 'bg-gradient-hero',
      change: '+15.2% this week'
    },
    {
      title: 'ENS Subdomains',
      value: stats.totalSubdomains.toLocaleString(),
      description: 'Created for users',
      icon: Globe,
      gradient: 'bg-gradient-warm',
      change: '+18.7% this week'
    }
  ]

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
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
              Gas4All Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time transparency into our mission of making Ethereum accessible to everyone
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-stats relative overflow-hidden">
                  <div className={`absolute inset-0 ${stat.gradient} opacity-10`} />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <stat.icon className="w-8 h-8 text-white/80" />
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {stat.change}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-white/80">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Claims */}
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span>Recent Gas Claims</span>
                  </CardTitle>
                  <CardDescription>
                    Latest users who claimed sponsored gas fees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentClaimants.map((claimant) => (
                    <div key={claimant.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {claimant.ensSubdomain || `${claimant.address.slice(0, 6)}...${claimant.address.slice(-4)}`}
                            </span>
                            {claimant.verified && (
                              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Claimed {claimant.amount} ETH • {formatTimeAgo(claimant.timestamp)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open('https://etherscan.io', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <span>Impact Metrics</span>
                  </CardTitle>
                  <CardDescription>
                    Measuring our success in Web3 onboarding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Gas Pool Utilization</span>
                        <span className="font-medium">73%</span>
                      </div>
                      <Progress value={73} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        104.2 ETH used of 142.7 ETH donated
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>User Retention Rate</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Users still active after 30 days
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Transactions per User</span>
                        <span className="font-medium">12.4</span>
                      </div>
                      <Progress value={62} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Post-onboarding transaction activity
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">$2.1M</p>
                      <p className="text-sm text-muted-foreground">Value transacted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">94%</p>
                      <p className="text-sm text-muted-foreground">Success rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Sponsors */}
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <span>Top Sponsors</span>
                  </CardTitle>
                  <CardDescription>
                    Our generous supporters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {donors.slice(0, 5).map((donor, index) => {
                    const badgeInfo = getBadgeInfo(donor.badge)
                    return (
                      <div key={donor.id} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                          index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                          'bg-gradient-primary'
                        } text-white`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm truncate">
                              {donor.ensName || `${donor.address.slice(0, 6)}...${donor.address.slice(-4)}`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <Badge className={`${badgeInfo.color} text-xs`}>
                              {badgeInfo.label}
                            </Badge>
                            <span className="text-muted-foreground">{donor.amount} ETH</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Live Stats */}
              <Card className="card-ethereum">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span>Live Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gas Price</span>
                      <span className="font-medium">25 gwei</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Network</span>
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Ethereum
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Block Height</span>
                      <span className="font-medium">18,523,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pool Balance</span>
                      <span className="font-medium">38.5 ETH</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success">System Operational</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last claim: 2 minutes ago
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage