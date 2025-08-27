import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-primary">
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
            Gas Aid makes Web3 accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/claim">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6">
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
  )
}

export default CTASection
