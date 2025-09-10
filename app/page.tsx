import dynamic from 'next/dynamic'
import { CinematicHero } from "@/components/cinematic-hero"
import { SectionTransition } from "@/components/section-transition"

// --- Impor komponen yang aman (tidak mengakses 'window'/'document' di luar useEffect) ---
// Navigation akan di-load secara dinamis juga karena menggunakan useEffect untuk scroll
const Navigation = dynamic(
  () => import('@/components/navigation').then(mod => mod.Navigation),
  { ssr: false }
)

// --- Gunakan Dynamic Import untuk Komponen Interaktif yang menyebabkan error ---
// Opsi { ssr: false } mencegah komponen ini dirender di server
const PerformanceOptimizer = dynamic(
  () => import('@/components/performance-optimizer').then(mod => mod.PerformanceOptimizer),
  { ssr: false }
)
const ScrollProgress = dynamic(
  () => import('@/components/scroll-progress').then(mod => mod.ScrollProgress),
  { ssr: false }
)
const ConsciousnessCursor = dynamic(
  () => import('@/components/consciousness-cursor').then(mod => mod.ConsciousnessCursor),
  { ssr: false }
)
const WhatIDoSection = dynamic(
  () => import('@/components/what-i-do-section').then(mod => mod.WhatIDoSection),
  { ssr: false }
)
const ParallaxStorytelling = dynamic(
  () => import('@/components/parallax-storytelling').then(mod => mod.ParallaxStorytelling),
  { ssr: false }
)
const PortfolioShowcase = dynamic(
  () => import('@/components/portfolio-showcase').then(mod => mod.PortfolioShowcase),
  { ssr: false }
)
const BiometricServices = dynamic(
  () => import('@/components/biometric-services').then(mod => mod.BiometricServices),
  { ssr: false }
)
const FuturisticContact = dynamic(
  () => import('@/components/futuristic-contact').then(mod => mod.FuturisticContact),
  { ssr: false }
)


export default function Home() {
  return (
    <main className="relative min-h-screen">
      <PerformanceOptimizer />
      <ScrollProgress />
      <ConsciousnessCursor />

      <Navigation />

      <SectionTransition sectionId="hero" transitionType="quantum">
        <CinematicHero />
      </SectionTransition>

      <SectionTransition sectionId="what-i-do" transitionType="reality-bend">
        <WhatIDoSection />
      </SectionTransition>

      <SectionTransition sectionId="experience" transitionType="time-dilation">
        <ParallaxStorytelling />
      </SectionTransition>

      <SectionTransition sectionId="portfolio" transitionType="consciousness">
        <PortfolioShowcase />
      </SectionTransition>

      <SectionTransition sectionId="services" transitionType="quantum">
        <BiometricServices />
      </SectionTransition>

      <SectionTransition sectionId="contact" transitionType="consciousness">
        <FuturisticContact />
      </SectionTransition>
    </main>
  )
}