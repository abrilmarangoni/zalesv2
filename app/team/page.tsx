"use client"

import { useState, useEffect } from "react"
import { Globe, ArrowLeft, Linkedin } from "lucide-react"
import { interTight } from "@/lib/fonts"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { motion } from "framer-motion"

function TeamContent() {
  const [isScrolled, setIsScrolled] = useState(false)
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

  const coFounders = [
    {
      name: "Nicolas Francese",
      role: { en: "Co-Founder", es: "Co-Fundador" },
      bio: {
        en: "I'm from Argentina. I'm 29 years old. Used to be Product Manager. I studied Business Administration. I'm passionate about entrepreneurship and co-founded ZalesMachine, where we design and build automated GTM engineering systems for B2B companies. Through our proven framework, we've booked over 1,000 calls and generated more than $1M in pipeline for our clients. My hobbies are fly fishing.",
        es: "Soy de Argentina. Tengo 29 años. Fui Product Manager. Estudié Administración de Empresas. Soy apasionado del emprendimiento y co-fundé ZalesMachine, donde diseñamos y construimos sistemas automatizados de ingeniería GTM para empresas B2B. A través de nuestro framework probado, hemos agendado más de 1,000 llamadas y generado más de $1M en pipeline para nuestros clientes. Mis hobbies son la pesca con mosca."
      },
      image: "/cofound1.png",
      linkedin: "https://www.linkedin.com/in/nicolas-francese/",
    },
    {
      name: "Nicolás Kwiatkowski",
      role: { en: "Co-Founder", es: "Co-Fundador" },
      bio: {
        en: "Industrial Engineer and Full Stack Web Developer. I collaborate on software development projects for Endeavor Labs (USA) and co-founded ZalesMachine. Previously, I was Global Director of Operations at The Coca-Cola Company's digitalization project Wabi. In 2020, I co-created SOMOS Sin Lactosa, Argentina's largest digital community for lactose-intolerant people.",
        es: "Ingeniero Industrial y Desarrollador Full Stack Web. Colaboro en proyectos de desarrollo de software para Endeavor Labs (USA) y co-fundé ZalesMachine. Anteriormente, fui Director Global de Operaciones en el proyecto de digitalización Wabi de The Coca-Cola Company. En 2020, co-creé SOMOS Sin Lactosa, la comunidad digital más grande de Argentina para personas intolerantes a la lactosa."
      },
      image: "/cofound2.png",
      linkedin: "https://www.linkedin.com/in/nicolaskw/",
    },
  ]

  return (
    <>
      <div className="min-h-screen w-full relative bg-black">
        {/* Desktop Header */}
        <header
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] hidden w-[75%] flex-row items-center justify-between rounded-lg bg-background/80 md:flex backdrop-blur-sm border border-border/40 shadow-lg transition-all duration-300 ${
            isScrolled ? "px-4" : "px-6"
          } py-4`}
        >
          <Link href="/" className="flex items-center justify-center gap-2">
            <img 
              src="/image13.png" 
              alt="ZalesMachine" 
              className={`transition-all duration-300 ${
                isScrolled ? "h-8" : "h-10"
              } object-contain`}
            />
          </Link>

          <div className="flex items-center gap-3 relative z-50">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setLanguage(language === "en" ? "es" : "en")
              }}
              className={`${interTight.className} flex items-center gap-1.5 rounded-md border border-border/50 bg-background/50 hover:bg-background/80 transition-colors font-extralight text-foreground cursor-pointer whitespace-nowrap ${
                isScrolled ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm"
              }`}
              aria-label="Change language"
              type="button"
            >
              <Globe className={`${isScrolled ? "w-3 h-3" : "w-3.5 h-3.5"}`} />
              <span>{language === "en" ? "EN" : "ES"}</span>
            </button>
            <Link
              href="/"
              className={`${interTight.className} flex items-center gap-2 rounded-md border border-border/50 bg-background/50 hover:bg-background/80 transition-colors font-extralight text-foreground cursor-pointer whitespace-nowrap px-2.5 py-1.5 text-sm`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("footer.home")}</span>
            </Link>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="fixed top-6 left-4 right-4 z-[9999] flex w-auto flex-row items-center justify-between rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg md:hidden px-5 py-6">
          <Link href="/" className="flex items-center justify-center gap-2">
            <img 
              src="/image13.png" 
              alt="ZalesMachine" 
              className="h-10 object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setLanguage(language === "en" ? "es" : "en")
              }}
              className={`${interTight.className} flex items-center gap-1.5 rounded-md border border-border/50 bg-background/50 hover:bg-background/80 transition-colors font-extralight text-foreground cursor-pointer px-2 py-1 text-xs`}
              aria-label="Change language"
              type="button"
            >
              <Globe className="w-3 h-3" />
              <span>{language === "en" ? "EN" : "ES"}</span>
            </button>
            <Link
              href="/"
              className={`${interTight.className} flex items-center gap-1.5 rounded-md border border-border/50 bg-background/50 hover:bg-background/80 transition-colors font-extralight text-foreground cursor-pointer px-2 py-1 text-xs`}
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-xs">{t("footer.home")}</span>
            </Link>
          </div>
        </header>

        {/* Team Section */}
        <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-20">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px] mb-4`}>
                {language === "en" ? "Our Team" : "Nuestro Equipo"}
              </h1>
              <p className={`${interTight.className} text-lg font-extralight text-white/60 max-w-2xl mx-auto`}>
                {language === "en" 
                  ? "Meet the founders behind ZalesMachine" 
                  : "Conoce a los fundadores detrás de ZalesMachine"}
              </p>
            </motion.div>

            {/* Co-Founders Grid - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
              {coFounders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Photo */}
                  <div className="mb-6 w-48 h-48 rounded-full overflow-hidden border-2 border-white/20 bg-white/5 flex items-center justify-center">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className={`${interTight.className} text-2xl font-extralight text-white mb-2`}>
                    {founder.name}
                  </h3>
                  <p className={`${interTight.className} text-lg font-extralight text-white/60 mb-4`}>
                    {founder.role[language]}
                  </p>

                  {/* LinkedIn Link */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className={`${interTight.className} text-sm font-extralight`}>LinkedIn</span>
                  </a>

                  {/* Bio */}
                  <p className={`${interTight.className} text-base font-extralight text-white/70 leading-relaxed`}>
                    {founder.bio[language]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default function TeamPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  
  const handleLanguageChange = (newLang: "en" | "es") => {
    setLanguage(newLang)
  }
  
  return (
    <LanguageProvider language={language} setLanguage={handleLanguageChange}>
      <TeamContent />
    </LanguageProvider>
  )
}

