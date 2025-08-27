import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SponsorsSection = () => {
  const [position, setPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const speed = 0.5 // Pixels per frame - slower for better visibility

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
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Trusted by Leading <span className="bg-gradient-primary bg-clip-text text-transparent">Web3 Organizations</span>
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
  )
}

export default SponsorsSection
