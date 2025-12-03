"use client"
import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { inter, interTight } from "@/lib/fonts"
import Hero from "@/components/home/hero"
import EmailHorizontalScroll from "@/components/email-horizontal-scroll"
import { VideoSection } from "@/components/video-section"
import Features from "@/components/features"
import FullStackAISolutions from "@/components/full-stack-ai-solutions"
import { TestimonialsSection } from "@/components/testimonials"
import { FAQSection } from "@/components/faq-section"
import { PricingSection } from "@/components/pricing-section"
import { ROICalculator } from "@/components/roi-calculator"
import { StickyFooter } from "@/components/sticky-footer"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { SectionDivider } from "@/components/section-divider"

function HomeContent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <>
    <div className="min-h-screen w-full relative bg-black">
      {/* Desktop Header - Parte del flujo normal de la página */}
      <header
        className="relative w-full z-[9999] hidden flex-row items-center justify-between bg-black md:flex px-12 py-6"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        <div className="z-50 flex items-center justify-center gap-2 ml-8">
          <img 
            src="/image13.png" 
            alt="ZalesMachine" 
            className="h-10 object-contain"
          />
        </div>

        <div className={`hidden flex-1 flex-row items-center justify-center space-x-6 text-base font-extralight text-muted-foreground md:flex md:space-x-6 ${interTight.className}`}>
          <a
            className="relative px-5 py-2.5 text-muted-foreground hover:text-white transition-colors cursor-pointer whitespace-nowrap font-extralight"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("features")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20 text-inherit">{t("nav.features")}</span>
          </a>
          <a
            className="relative px-5 py-2.5 text-muted-foreground hover:text-white transition-colors cursor-pointer whitespace-nowrap font-extralight"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("pricing")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20 text-inherit">{t("nav.pricing")}</span>
          </a>
          <a
            className="relative px-5 py-2.5 text-muted-foreground hover:text-white transition-colors cursor-pointer whitespace-nowrap font-extralight"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("testimonials")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20 text-inherit">{t("nav.testimonials")}</span>
          </a>
          <a
            className="relative px-5 py-2.5 text-muted-foreground hover:text-white transition-colors cursor-pointer whitespace-nowrap font-extralight"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("faq")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20 text-inherit">{t("nav.faq")}</span>
          </a>
          <a
            href="/team"
            className="relative px-3 py-2 text-muted-foreground hover:text-white transition-colors cursor-pointer whitespace-nowrap font-extralight"
          >
            <span className="relative z-20 text-inherit">{t("nav.team")}</span>
          </a>
        </div>

        <div className="flex items-center gap-4 relative z-50 mr-8">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setLanguage(language === "en" ? "es" : "en")
            }}
            className={`${interTight.className} flex items-center gap-1.5 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 transition-colors font-extralight text-foreground cursor-pointer whitespace-nowrap px-3 py-2 text-sm`}
            aria-label="Change language"
            type="button"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "en" ? "EN" : "ES"}</span>
          </button>
          <a
            href="#pricing"
            className={`${interTight.className} rounded-md font-extralight relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center text-white px-6 py-2.5 text-base`}
            style={{
              background: "linear-gradient(to bottom, rgba(181, 126, 220, 0.9), rgba(181, 126, 220, 0.8))",
              boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.6), 0 0 20px rgba(181, 126, 220, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(0, 0, 0, 0.7), 0 0 30px rgba(181, 126, 220, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(0, 0, 0, 0.6), 0 0 20px rgba(181, 126, 220, 0.3)"
            }}
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("pricing")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            {t("nav.contact")}
          </a>
        </div>
      </header>

      {/* Mobile Header - Parte del flujo normal de la página */}
      <header 
        className="relative w-full z-[9999] flex flex-row items-center justify-between bg-black md:hidden px-5 py-6"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        <div className="flex items-center justify-center gap-2 ml-2">
          <img 
            src="/image13.png" 
            alt="ZalesMachine" 
            className="h-10 object-contain"
          />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-24 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("features")}
                className={`${interTight.className} text-left px-4 py-3 text-lg font-extralight text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50`}
              >
                {t("nav.features")}
              </button>
              <button
                onClick={() => handleMobileNavClick("pricing")}
                className={`${interTight.className} text-left px-4 py-3 text-lg font-extralight text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50`}
              >
                {t("nav.pricing")}
              </button>
              <button
                onClick={() => handleMobileNavClick("testimonials")}
                className={`${interTight.className} text-left px-4 py-3 text-lg font-extralight text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50`}
              >
                {t("nav.testimonials")}
              </button>
              <button
                onClick={() => handleMobileNavClick("faq")}
                className={`${interTight.className} text-left px-4 py-3 text-lg font-extralight text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50`}
              >
                {t("nav.faq")}
              </button>
              <a
                href="/team"
                className={`${interTight.className} text-left px-4 py-3 text-lg font-extralight text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.team")}
              </a>
              <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setLanguage(language === "en" ? "es" : "en")
                  }}
                  className={`${interTight.className} flex items-center justify-center gap-1.5 px-2.5 py-2 text-sm font-extralight border border-border/50 bg-background/50 hover:bg-background/80 transition-colors rounded-lg text-foreground relative z-50 cursor-pointer`}
                  aria-label="Change language"
                  type="button"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "English" : "Español"}</span>
                </button>
                <a
                  href="#pricing"
                  className={`${interTight.className} px-4 py-3 text-lg font-extralight text-center text-white rounded-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}
                  style={{
                    background: "linear-gradient(to bottom, rgba(181, 126, 220, 0.9), rgba(181, 126, 220, 0.8))",
                    boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.6), 0 0 20px rgba(181, 126, 220, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(0, 0, 0, 0.7), 0 0 30px rgba(181, 126, 220, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(0, 0, 0, 0.6), 0 0 20px rgba(181, 126, 220, 0.3)"
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsMobileMenuOpen(false)
                    setTimeout(() => {
                      const element = document.getElementById("pricing")
                      if (element) {
                        const headerOffset = 120
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                        const offsetPosition = elementPosition - headerOffset

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        })
                      }
                    }, 100)
                  }}
                >
                  {t("nav.contact")}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Sección Hero */}
      <div className="relative w-full">
        {/* Luz blanca para profundidad */}
        <div
          className="absolute inset-0 z-0 min-h-screen pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 20%, rgba(255, 255, 255, 0.08), transparent 60%)",
          }}
        />
      {/* Hero Section */}
      <Hero />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* Email Horizontal Scroll Section */}
      <div>
        <EmailHorizontalScroll />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* Video Section */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28">
        <VideoSection />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* Features Section */}
      <div id="features" className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ backgroundColor: '#171717' }}>
        <Features />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* Full Stack AI Solutions Section */}
      <div id="full-stack-ai-solutions" className="pt-32 pb-20 md:pt-40 md:pb-28">
        <FullStackAISolutions />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* ROI Calculator Section */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ backgroundColor: '#171717' }}>
        <ROICalculator />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="pt-32 pb-20 md:pt-40 md:pb-28">
        <PricingSection />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ backgroundColor: '#171717' }}>
        <TestimonialsSection />
      </div>

      {/* Section Divider */}
      <div className="relative w-full">
        <SectionDivider />
      </div>

      {/* FAQ Section */}
      <div id="faq" className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ backgroundColor: '#000000' }}>
        <FAQSection />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
    </>
  )
}

export default function Home() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  
  const handleLanguageChange = (newLang: "en" | "es") => {
    setLanguage(newLang)
  }
  
  return (
    <LanguageProvider language={language} setLanguage={handleLanguageChange}>
      <HomeContent />
    </LanguageProvider>
  )
}
