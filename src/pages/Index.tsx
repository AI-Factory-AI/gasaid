import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wallet, Shield, Users, BarChart3, ChevronRight, Coins, Globe, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGasStore } from '@/store/gasStore'
import heroImage from '@/assets/hero-bg.jpg'
import { useEffect, useRef, useState } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import SponsorsSection from '@/components/landing/SponsorsSection'
import ImpactStatsSection from '@/components/landing/ImpactStatsSection'
import CTASection from '@/components/landing/CTASection'


const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SponsorsSection />
      <ImpactStatsSection />
      <CTASection />
    </div>
  )
}

export default Index
