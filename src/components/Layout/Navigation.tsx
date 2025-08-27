import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Zap, Heart, BarChart3, Settings, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGasStore } from '@/store/gasStore'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isConnected, userEnsName, userAddress } = useGasStore()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/claim', label: 'Claim Gas', icon: Zap },
    { path: '/donate', label: 'Donate', icon: Heart },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin', label: 'Admin', icon: Settings },
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-8 py-6 bg-background/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
            Gas4All
          </span>
        </Link>

        <div className="flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-muted/50 ${
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="px-3 py-2 bg-muted rounded-lg">
                <span className="text-sm font-medium">
                  {userEnsName || (userAddress && formatAddress(userAddress))}
                </span>
              </div>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button className="btn-ethereum">
              Connect Wallet
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
              Gas4All
            </span>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="overflow-hidden bg-background border-t border-border/50"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            <div className="pt-4 border-t border-border/50">
              {isConnected ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-muted rounded-lg">
                    <span className="text-sm font-medium">
                      {userEnsName || (userAddress && formatAddress(userAddress))}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button className="btn-ethereum w-full">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  )
}

export default Navigation