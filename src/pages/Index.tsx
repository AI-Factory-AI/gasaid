import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Heart, BarChart3, Users, TrendingUp, Shield, ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGasStore } from '@/store/gasStore'
import heroImage from '@/assets/hero-bg.jpg'

const Index = () => {
  const { stats, donors } = useGasStore()

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
    { name: 'MetaMask', logo: '🦊' }
  ]

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
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2">
                🏆 Hackathon Winner
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                Sponsoring Gas,
                <br />
                <span className="text-secondary-glow">Empowering Adoption</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                The revolutionary Ethereum dApp where organizations sponsor gas fees for new users, 
                complete with free ENS subdomains and seamless onboarding.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/claim">
                <Button size="lg" className="btn-warm text-lg px-8 py-6 group">
                  <Zap className="w-5 h-5 mr-2" />
                  Claim Free Gas
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 group">
                  <Heart className="w-5 h-5 mr-2" />
                  Sponsor Users
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
            >
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stats.totalDonated.toFixed(1)}ETH</p>
                <p className="text-white/80">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-white/80">Users Onboarded</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stats.totalClaims}</p>
                <p className="text-white/80">Gas Claims</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stats.totalSubdomains}</p>
                <p className="text-white/80">ENS Subdomains</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border border-white/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-ethereum p-6 text-center group hover:shadow-ethereum transition-all duration-300"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {sponsor.logo}
                </div>
                <p className="font-medium text-sm">{sponsor.name}</p>
              </motion.div>
            ))}
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
                  <Zap className="w-5 h-5 mr-2" />
                  Start Your Web3 Journey
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Heart className="w-5 h-5 mr-2" />
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
