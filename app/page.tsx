import { Navigation } from "@/components/navigation"
import { CinematicHero } from "@/components/cinematic-hero"
import { WhatIDoSection } from "@/components/what-i-do-section"
import { ParallaxStorytelling } from "@/components/parallax-storytelling"
import { PortfolioShowcase } from "@/components/portfolio-showcase"
import { BiometricServices } from "@/components/biometric-services"
import { FuturisticContact } from "@/components/futuristic-contact"
import { SectionTransition } from "@/components/section-transition"
import { ScrollProgress } from "@/components/scroll-progress"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { ConsciousnessCursor } from "@/components/consciousness-cursor"

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
