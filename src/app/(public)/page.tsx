import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProtocols } from '@/components/home/featured-protocols'
import { HowItWorks } from '@/components/home/how-it-works'
import { QuickTips } from '@/components/home/quick-tips'
import { SignupCta } from '@/components/home/signup-cta'
import { FeaturedProducts } from '@/components/home/featured-products'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProtocols />
      <HowItWorks />
      <QuickTips />
      <SignupCta />
      <FeaturedProducts />
    </>
  )
}
