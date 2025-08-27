import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useGasStore } from '@/store/gasStore'

const HeroSection = () => {
  const { stats } = useGasStore()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/ecosheane/image/upload/v1756314963/cyberpunk-bitcoin-illustration-min_iwdpvk.jpg"
          alt="Cyberpunk Bitcoin Illustration" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-screen py-20"
        >
          {/* Left Side - Main Content */}
          <div className="space-y-4 ml-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-gradient-primary text-white border-0 px-3 py-1.5 text-xs font-medium">
                #No.1 Gas Sponsorship Platform
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Sponsoring Gas,
                <br />
                <span className="text-[hsl(250_95%_60%)]">Empowering Adoption</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
                Free gas fees and ENS subdomains for new Web3 users.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/claim">
                <Button size="lg" className="btn-ethereum text-base px-6 py-4 group">
                  Claim Free Gas
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="outline" className="text-base px-6 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 group">
                  Sponsor Users
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3"
            >
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-white">{stats.totalDonated.toFixed(1)} ETH</p>
                <p className="text-white/80 text-xs">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-white/80 text-xs">Users Onboarded</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-white">{stats.totalClaims}</p>
                <p className="text-white/80 text-xs">Gas Claims</p>
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-white">{stats.totalSubdomains}</p>
                <p className="text-white/80 text-xs">ENS Subdomains</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Quick Claim Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center lg:justify-end mr-4"
          >
            <div className="bg-background/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Claim Free Gas</h3>
                <p className="text-white/70 text-sm">
                  Get started with Web3 in seconds
                </p>
              </div>
              
                             <div className="space-y-6">
                 {/* Gas Fee Display */}
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-white/70 text-sm font-medium">Market Gas Fee</label>
                     <div className="flex items-center bg-muted/30 rounded-lg p-3">
                       <input 
                         type="text" 
                         value="0.002" 
                         readOnly
                         className="bg-transparent text-white text-lg font-semibold flex-1 outline-none"
                       />
                       <div className="text-white/70 text-sm ml-2">ETH</div>
                     </div>
                   </div>
                   
                   <div className="text-center bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                     <p className="text-green-400 font-semibold text-sm">100% FREE</p>
                     <p className="text-green-300 text-xs">No payment required</p>
                   </div>
                 </div>
                
                {/* Network Status */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-white/70 text-xs">Ethereum Mainnet</p>
                  </div>
                </div>
                
                {/* Terms */}
                <div className="text-center">
                  <a href="#" className="text-white/60 text-xs hover:text-white transition-colors">
                    Terms and Conditions
                  </a>
                </div>
                
                {/* Claim Button */}
                <div className="text-center">
                  <Link to="/claim">
                    <Button className="bg-white text-black hover:bg-white/90 w-full py-4 text-lg font-semibold rounded-xl">
                      Claim Gas Instantly
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="text-center">
                  <p className="text-white/50 text-xs">
                    No wallet required • Instant approval • Free forever
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
