import { motion } from 'framer-motion'
import { TrendingUp, Trophy, Clock } from 'lucide-react'

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
      value: '142.70 ETH',
      description: 'From generous sponsors',
      change: '+12.5% this week'
    },
    {
      title: 'Gas Claims Made',
      value: '287',
      description: 'Successful transactions',
      change: '+8.3% this week'
    },
    {
      title: 'Users Onboarded',
      value: '1,250',
      description: 'New to Ethereum',
      change: '+15.2% this week'
    },
    {
      title: 'ENS Subdomains',
      value: '847',
      description: 'Created for users',
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
                 <div className="p-6 bg-background border border-border/50 rounded-lg">
                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                       <Badge variant="secondary" className="bg-primary text-primary-foreground border-0 text-xs">
                         {stat.change}
                       </Badge>
                     </div>
                     <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                     <p className="text-xs text-muted-foreground">{stat.description}</p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>

                     {/* Main Content Grid */}
           <div className="grid lg:grid-cols-3 gap-8">
             {/* Recent Activity */}
             <div className="lg:col-span-2 space-y-6">
               {/* Recent Claims */}
               <div className="bg-background border border-border/50 rounded-lg p-6">
                 <div className="mb-4">
                   <h2 className="text-lg font-semibold text-foreground">Recent Gas Claims</h2>
                   <p className="text-sm text-muted-foreground">
                     Latest users who claimed sponsored gas fees
                   </p>
                 </div>
                 <div className="space-y-3">
                   {recentClaimants.map((claimant) => (
                     <div key={claimant.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                           {claimant.ensSubdomain ? claimant.ensSubdomain.charAt(0).toUpperCase() : 'U'}
                         </div>
                         <div>
                           <div className="flex items-center space-x-2">
                             <span className="font-medium text-sm">
                               {claimant.ensSubdomain || `${claimant.address.slice(0, 6)}...${claimant.address.slice(-4)}`}
                             </span>
                             {claimant.verified && (
                               <Badge variant="secondary" className="bg-success/20 text-success border-success/30 text-xs">
                                 Verified
                               </Badge>
                             )}
                           </div>
                           <p className="text-xs text-muted-foreground">
                             Claimed {claimant.amount} ETH • {formatTimeAgo(claimant.timestamp)}
                           </p>
                         </div>
                       </div>
                       <Button
                         variant="ghost"
                         size="sm"
                         className="text-xs hover:bg-muted/50"
                         onClick={() => window.open('https://etherscan.io', '_blank')}
                       >
                         View
                       </Button>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Impact Metrics */}
               <div className="bg-background border border-border/50 rounded-lg p-6">
                 <div className="mb-4">
                   <h2 className="text-lg font-semibold text-foreground">Impact Metrics</h2>
                   <p className="text-sm text-muted-foreground">
                     Measuring our success in Web3 onboarding
                   </p>
                 </div>
                 <div className="space-y-4">
                   <div className="space-y-3">
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

                   <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/30">
                     <div className="text-center">
                       <p className="text-xl font-bold text-foreground">$2.1M</p>
                       <p className="text-xs text-muted-foreground">Value transacted</p>
                     </div>
                     <div className="text-center">
                       <p className="text-xl font-bold text-foreground">94%</p>
                       <p className="text-xs text-muted-foreground">Success rate</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Sidebar */}
             <div className="space-y-6">
               {/* Top Sponsors */}
               <div className="bg-background border border-border/50 rounded-lg p-6">
                 <div className="mb-4">
                   <h2 className="text-lg font-semibold text-foreground">Top Sponsors</h2>
                   <p className="text-sm text-muted-foreground">
                     Our generous supporters
                   </p>
                 </div>
                 <div className="space-y-3">
                   {donors.slice(0, 5).map((donor, index) => {
                     const badgeInfo = getBadgeInfo(donor.badge)
                     return (
                       <div key={donor.id} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg border border-border/30">
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                           index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                           index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                           index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
                           'bg-primary'
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
                 </div>
               </div>

               {/* Live Stats */}
               <div className="bg-background border border-border/50 rounded-lg p-6">
                 <div className="mb-4">
                   <h2 className="text-lg font-semibold text-foreground">Live Stats</h2>
                 </div>
                 <div className="space-y-3">
                   <div className="space-y-2">
                     <div className="flex justify-between">
                       <span className="text-sm text-muted-foreground">Gas Price</span>
                       <span className="font-medium text-sm">25 gwei</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-sm text-muted-foreground">Network</span>
                       <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                         Ethereum
                       </Badge>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-sm text-muted-foreground">Block Height</span>
                       <span className="font-medium text-sm">18,523,847</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-sm text-muted-foreground">Pool Balance</span>
                       <span className="font-medium text-sm">38.5 ETH</span>
                     </div>
                   </div>

                   <div className="pt-3 border-t border-border/30">
                     <div className="flex items-center space-x-2 text-sm">
                       <div className="w-2 h-2 bg-success rounded-full"></div>
                       <span className="text-success">System Operational</span>
                     </div>
                     <p className="text-xs text-muted-foreground mt-1">
                       Last claim: 2 minutes ago
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage