import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, Globe, Heart, Eye } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Coins,
      title: 'Free Gas Claims',
      description: 'New users can claim sponsored gas fees to start their Web3 journey without barriers',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Globe,
      title: 'ENS Subdomains',
      description: 'Get your personalized ENS subdomain (e.g., alex.gasfund.eth) as your Web3 identity',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Sponsored by DAOs, organizations, and generous community members',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      description: 'Track all donations, claims, and impact metrics in real-time on our dashboard',
      gradient: 'bg-gradient-primary'
    }
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">Gas4All</span> Works
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
              <Card className="card-ethereum h-full group hover:shadow-lg transition-all duration-300">
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
  )
}

export default FeaturesSection
