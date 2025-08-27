import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Heart, BarChart3, Users, TrendingUp, Shield, ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGasStore } from '@/store/gasStore'
import heroImage from '@/assets/hero-bg.jpg'
import { useEffect, useRef, useState } from 'react'

const Index = () => {
  const { stats, donors } = useGasStore()
  const [position, setPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const speed = 0.5 // Pixels per frame - slower for better visibility

  const features = [
    {
      icon: Zap,
      title: 'Free Gas Claims',
      description: 'New users can claim sponsored gas fees to start their Web3 journey without barriers',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Shield,
      title: 'ENS Subdomains',
      description: 'Get your personalized ENS subdomain (e.g., alex.gasfund.eth) as your Web3 identity',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Sponsored by DAOs, organizations, and generous community members',
      gradient: 'bg-gradient-warm'
    },
    {
      icon: BarChart3,
      title: 'Full Transparency',
      description: 'Track all donations, claims, and impact metrics in real-time on our dashboard',
      gradient: 'bg-gradient-hero'
    }
  ]

  const sponsors = [
    { name: 'Ethereum Foundation', logo: '🔷' },
    { name: 'ConsenSys', logo: '🦄' },
    { name: 'Uniswap Labs', logo: '🦄' },
    { name: 'Polygon', logo: '🔶' },
    { name: 'Gitcoin', logo: '💚' },
    { name: 'MetaMask', logo: '🦊' },
    { name: 'Arbitrum', logo: '🔵' },
    { name: 'Optimism', logo: '🔴' },
    { name: 'Base', logo: '🔷' },
    { name: 'Chainlink', logo: '🔗' }
  ]

  // Animation effect for scrolling logos
  useEffect(() => {
    let animationId: number
    let lastTime = 0
    
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      const deltaTime = currentTime - lastTime
      
      setPosition(prev => {
        const newPosition = prev - speed * (deltaTime / 16)
        // Reset when first set is completely out of view
        if (Math.abs(newPosition) >= sponsors.length * 200) {
          return 0
        }
        return newPosition
      })
      
      lastTime = currentTime
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [sponsors.length, speed])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Gas4All Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
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
                 <Badge className="bg-gradient-secondary text-white border-0 px-3 py-1.5 text-xs font-medium">
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
                   <span className="text-secondary-glow">Empowering Adoption</span>
                 </h1>
                 <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
                   The revolutionary Ethereum dApp where organizations sponsor gas fees for new users, 
                   complete with free ENS subdomains and seamless onboarding.
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
                   <Button size="lg" className="btn-warm text-base px-6 py-4 group">
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
                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-white/70 text-sm font-medium">You pay</label>
                      <div className="flex items-center bg-muted/30 rounded-lg p-3">
                        <input 
                          type="text" 
                          value="0.05" 
                          readOnly
                          className="bg-transparent text-white text-lg font-semibold flex-1 outline-none"
                        />
                        <div className="text-white/70 text-sm ml-2">ETH</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white/70 text-sm font-medium">You get</label>
                      <div className="flex items-center bg-muted/30 rounded-lg p-3">
                        <input 
                          type="text" 
                          value="0.05" 
                          readOnly
                          className="bg-transparent text-white text-lg font-semibold flex-1 outline-none"
                        />
                        <div className="text-white/70 text-sm ml-2">Gas Fee</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  <div className="text-center">
                    <p className="text-white/50 text-xs">
                      Gas fee will be recalculated in <span className="text-white font-medium">24:32</span>
                    </p>
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              How <span className="bg-gradient-hero bg-clip-text text-transparent">Gas4All</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Breaking down barriers to Web3 adoption through sponsored gas fees and seamless onboarding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-ethereum h-full group hover:shadow-ethereum transition-all duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Trusted by Leading <span className="bg-gradient-hero bg-clip-text text-transparent">Web3 Organizations</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the growing ecosystem of sponsors supporting Web3 adoption
            </p>
          </motion.div>

          <div className="relative overflow-hidden" ref={containerRef}>
            <div 
              className="flex items-center gap-8 lg:gap-12 opacity-70"
              style={{
                transform: `translateX(${position}px)`,
                width: 'max-content'
              }}
            >
              {/* First set of logos */}
              {sponsors.map((sponsor, index) => (
                <div key={`first-${index}`} className="hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <div className="w-36 h-20 flex items-center justify-center bg-transparent border border-border/50 rounded-full p-4 flex-shrink-0">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {sponsor.logo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {sponsors.map((sponsor, index) => (
                <div key={`second-${index}`} className="hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <div className="w-36 h-20 flex items-center justify-center bg-transparent border border-border/50 rounded-full p-4 flex-shrink-0">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {sponsor.logo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Third set for extra smoothness */}
              {sponsors.map((sponsor, index) => (
                <div key={`third-${index}`} className="hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <div className="w-36 h-20 flex items-center justify-center bg-transparent border border-border/50 rounded-full p-4 flex-shrink-0">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {sponsor.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Making Real <span className="bg-gradient-hero bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how Gas4All is transforming Web3 onboarding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-stats">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6" />
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
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Ready to Join the Revolution?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Whether you're a new user looking for free gas or an organization wanting to sponsor adoption, 
              Gas4All makes Web3 accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                             <Link to="/claim">
                 <Button size="lg" className="btn-warm text-lg px-8 py-6">
                   Start Your Web3 Journey
                 </Button>
               </Link>
               <Link to="/donate">
                 <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                   Become a Sponsor
                 </Button>
               </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Index
