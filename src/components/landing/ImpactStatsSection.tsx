import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart3, Users, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGasStore } from '@/store/gasStore'

const ImpactStatsSection = () => {
  const { donors } = useGasStore()

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Making Real <span className="bg-gradient-primary bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See how Gas4All is transforming Web3 onboarding
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="card-stats">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>Growth Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/90">New Users This Month</span>
                <span className="text-2xl font-bold text-white">+847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Average Gas Saved</span>
                <span className="text-2xl font-bold text-white">$42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Success Rate</span>
                <span className="text-2xl font-bold text-white">94.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-ethereum">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {donors.slice(0, 3).map((donor, index) => (
                <div key={donor.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                    'bg-gradient-to-r from-amber-600 to-amber-800'
                  } text-white`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {donor.ensName || `${donor.address.slice(0, 6)}...${donor.address.slice(-4)}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{donor.amount} ETH contributed</p>
                  </div>
                </div>
              ))}
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="w-full mt-4 group">
                  View Full Dashboard
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ImpactStatsSection
