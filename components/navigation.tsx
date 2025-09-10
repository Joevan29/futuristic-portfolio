"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, User, Briefcase, Mail, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "What I Do", icon: User },
  { id: "experience", label: "Experience", icon: Zap },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "services", label: "Services", icon: Code },
  { id: "contact", label: "Contact", icon: Mail },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="glass-morphism rounded-2xl p-4 space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground neon-glow"
                    : "hover:bg-primary/20 text-muted-foreground hover:text-primary"
                }`}
                title={item.label}
              >
                <Icon size={20} />
                <span className="absolute left-16 bg-popover text-popover-foreground px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="fixed top-6 right-6 z-50 glass-morphism border-primary/30 bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg">
            <div className="flex items-center justify-center min-h-screen">
              <div className="grid grid-cols-2 gap-6 p-8">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex flex-col items-center space-y-2 p-6 rounded-2xl transition-all duration-300 ${
                        isActive ? "glass-morphism border-primary neon-glow" : "glass-morphism hover:border-primary/50"
                      }`}
                    >
                      <Icon size={24} className={isActive ? "text-primary" : "text-muted-foreground"} />
                      <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
