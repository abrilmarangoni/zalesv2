"use client"

import type React from "react"

import { useTheme } from "next-themes"
import Earth from "./ui/globe"
import { FollowerPointerCard } from "./ui/following-pointer"
import { motion, useInView } from "framer-motion"
import { Suspense, useEffect, useRef, useState } from "react"
import { inter, interTight } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export default function Features() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { theme } = useTheme()
  const [isHovering, setIsHovering] = useState(false)
  const [isCliHovering, setIsCliHovering] = useState(false)
  const [isFeature3Hovering, setIsFeature3Hovering] = useState(false)
  const [isFeature4Hovering, setIsFeature4Hovering] = useState(false)
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0)

  const countries = [
    "Argentina", "México", "USA", "Colombia", "Chile", "España", "Brasil",
    "Perú", "Ecuador", "Venezuela", "Uruguay", "Paraguay", "Bolivia",
    "Costa Rica", "Panamá", "Guatemala", "Honduras",
    "Francia", "Alemania", "Italia", "Reino Unido", "Portugal", "Países Bajos",
    "Bélgica", "Suiza", "Austria", "Suecia", "Noruega", "Dinamarca", "Polonia"
  ]
  
  const [scrambledCountry, setScrambledCountry] = useState(countries[0])

  const [baseColor, setBaseColor] = useState<[number, number, number]>([0.298, 0.631, 0.961]) // #4ca1f5 in RGB normalized
  const [glowColor, setGlowColor] = useState<[number, number, number]>([0.298, 0.631, 0.961]) // #4ca1f5 in RGB normalized

  const [dark, setDark] = useState<number>(theme === "dark" ? 1 : 0)

  useEffect(() => {
    setBaseColor([0.298, 0.631, 0.961]) // #4ca1f5
    setGlowColor([0.298, 0.631, 0.961]) // #4ca1f5
    setDark(theme === "dark" ? 1 : 0)
  }, [theme])

  useEffect(() => {
    // Solo rotar países cuando hay hover
    if (!isHovering) {
      // Resetear a Argentina cuando no hay hover
      setCurrentCountryIndex(0)
      setScrambledCountry(countries[0])
      return
    }

    // Mostrar países aleatorios durante el hover
    const scrambleInterval = setInterval(() => {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)]
      setScrambledCountry(randomCountry)
    }, 150)

    // Rotar al país final cada 3.5 segundos cuando hay hover
    const finalInterval = setInterval(() => {
      setCurrentCountryIndex((prev) => (prev + 1) % countries.length)
    }, 3500)

    return () => {
      clearInterval(scrambleInterval)
      clearInterval(finalInterval)
    }
  }, [isHovering, countries.length])

  return (
    <section id="features" className="text-foreground relative overflow-hidden py-4 sm:py-8 md:py-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >
        <h2
          className={cn(
            "mb-8 bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px]",
            interTight.className,
          )}
        >
          {t("features.title")}
        </h2>
        <FollowerPointerCard
          title={
            <div className="flex items-center gap-2">
              <span>ZalesMachine</span>
            </div>
          }
        >
          <div className="cursor-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
              {/* Outbound Machine */}
              <motion.div
                className="group border-[#4ca1f5]/40 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-2 p-8 shadow-xl transition-all ease-in-out"
                onMouseEnter={() => setIsFeature3Hovering(true)}
                onMouseLeave={() => setIsFeature3Hovering(false)}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(76, 161, 245, 0.6)",
                  boxShadow: "0 0 30px rgba(76, 161, 245, 0.2)",
                }}
              >
                <div className="flex flex-col gap-6 mb-6">
                  <h3 className="text-2xl leading-none font-extralight tracking-tight">{t("features.outbound.title")}</h3>
                  <div className="text-md text-muted-foreground flex flex-col gap-4 text-sm">
                    <p className="leading-relaxed">
                      {t("features.outbound.description")}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none flex grow items-center justify-center select-none relative mt-4">
                  <div
                    className="relative w-full h-[400px] rounded-xl overflow-hidden"
                    style={{ borderRadius: "20px" }}
                  >
                    {/* Background with blue gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4ca1f5]/40 to-[#4ca1f5]/10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"></div>
                    
                    {/* Grid pattern */}
                    <div 
                      className="absolute inset-0 z-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    
                    {/* Static radial glow */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)",
                      }}
                    />

                    {/* Animated SVG Connecting Lines */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={isFeature3Hovering ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                        <motion.path
                          d="M 60.688 1.59 L 119.368 1.59 M 60.688 1.59 L 1.414 1.59"
                          stroke="rgb(181, 126, 220)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={isFeature3Hovering ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        />
                      </svg>
                      <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                        <motion.path
                          d="M 60.688 92.449 L 119.368 92.449 M 60.688 92.449 L 1.414 92.449"
                          stroke="rgb(181, 126, 220)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={isFeature3Hovering ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{
                            duration: 2,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      </svg>
                    </motion.div>

                    {/* Animated Violet Blur Effect */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full blur-[74px] opacity-65 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: "rgb(181, 126, 220)" }}
                      initial={{ scale: 1 }}
                      animate={isFeature3Hovering ? { scale: [1, 1.342, 1, 1.342] } : { scale: 1 }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: isFeature3Hovering ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                      }}
                    />

                    {/* Main Content Container with Deliverables */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                            <motion.div
                        className="flex flex-col gap-4 p-6 bg-black/60 backdrop-blur-md rounded-xl max-w-lg w-full border border-white/10 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isFeature3Hovering ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-extralight text-white">Deliverables</h4>
                          <span className="text-xs text-white/60 font-medium">17 items</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/90 max-h-[200px] overflow-y-auto pr-2">
                          {[
                            "Graph Email Prospecting",
                            "LinkedIn Prospecting",
                            "ICP Modeling",
                            "TAM Map",
                            "Email Infrastructure",
                            "Plays Selection",
                            "Tools Selection",
                            "List Building",
                            "Contact Sourcing",
                            "Data Enrichment",
                            "Lead Scoring",
                            "Personalized Copywriting",
                            "ICP Connection Requests",
                            "AI Reply Drafts",
                            "CRM Workflows",
                            "CRM Sync",
                            "Analytics Reports",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#b57edc] mt-0.5">•</span>
                              <span>{item}</span>
                          </div>
                          ))}
                        </div>
                        <a
                          href="#"
                          className="mt-2 inline-flex items-center justify-center rounded-md font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 text-sm pointer-events-auto shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          Explore Capabilities
                        </a>
                            </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Machine */}
              <motion.div
                className="group border-[#4ca1f5]/40 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-2 p-8 shadow-xl transition-all ease-in-out"
                onMouseEnter={() => setIsFeature4Hovering(true)}
                onMouseLeave={() => setIsFeature4Hovering(false)}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(76, 161, 245, 0.6)",
                  boxShadow: "0 0 30px rgba(76, 161, 245, 0.2)",
                }}
              >
                <div className="flex flex-col gap-6 mb-6">
                  <h3 className="text-2xl leading-none font-extralight tracking-tight">{t("features.content.title")}</h3>
                  <div className="text-md text-muted-foreground flex flex-col gap-4 text-sm">
                    <p className="leading-relaxed">
                      {t("features.content.description")}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none flex grow items-center justify-center select-none relative mt-4">
                  <div
                    className="relative w-full h-[400px] rounded-xl overflow-hidden"
                    style={{ borderRadius: "20px" }}
                  >
                    {/* Background with blue gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4ca1f5]/40 to-[#4ca1f5]/10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"></div>
                    
                    {/* Grid pattern */}
                    <div 
                      className="absolute inset-0 z-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    
                    {/* Static radial glow */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)",
                      }}
                    />

                    {/* Animated SVG Connecting Lines */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={isFeature4Hovering ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                        <motion.path
                          d="M 60.688 1.59 L 119.368 1.59 M 60.688 1.59 L 1.414 1.59"
                          stroke="rgb(181, 126, 220)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={isFeature4Hovering ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        />
                      </svg>
                      <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                        <motion.path
                          d="M 60.688 92.449 L 119.368 92.449 M 60.688 92.449 L 1.414 92.449"
                          stroke="rgb(181, 126, 220)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={isFeature4Hovering ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{
                            duration: 2,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      </svg>
                    </motion.div>

                    {/* Animated Violet Blur Effect */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full blur-[74px] opacity-65 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: "rgb(181, 126, 220)" }}
                      initial={{ scale: 1 }}
                      animate={isFeature4Hovering ? { scale: [1, 1.342, 1, 1.342] } : { scale: 1 }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: isFeature4Hovering ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                      }}
                    />

                    {/* Main Content Container with Deliverables */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.div
                        className="flex flex-col gap-4 p-6 bg-black/60 backdrop-blur-md rounded-xl max-w-lg w-full border border-white/10 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isFeature4Hovering ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-extralight text-white">Deliverables</h4>
                          <span className="text-xs text-white/60 font-medium">14 items</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/90 max-h-[200px] overflow-y-auto pr-2">
                          {[
                            "Graph CMS Distribution",
                            "LinkedIn Distribution",
                            "Team Interviews",
                            "Customer Interviews",
                            "Strategic Ideation",
                            "Content Calendar",
                            "Creative Design",
                            "Case Study Creation",
                            "Analytics Reports",
                            "Attribution Setup",
                            "LinkedIn Profile Optimization",
                            "Sales Enablement",
                            "Lifecycle Sequences",
                            "Directory Listings",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#b57edc] mt-0.5">•</span>
                              <span>{item}</span>
                          </div>
                          ))}
                        </div>
                        <a
                          href="#"
                          className="mt-2 inline-flex items-center justify-center rounded-md font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 text-sm pointer-events-auto shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          Explore Capabilities
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* AI RevOps Agents */}
              <motion.div
                className="group border-[#4ca1f5]/40 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-2 p-8 shadow-xl transition-all ease-in-out"
                onMouseEnter={() => setIsCliHovering(true)}
                onMouseLeave={() => setIsCliHovering(false)}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(76, 161, 245, 0.6)",
                  boxShadow: "0 0 30px rgba(76, 161, 245, 0.2)",
                }}
              >
                <div className="flex flex-col gap-6 mb-6">
                  <h3 className="text-2xl leading-none font-extralight tracking-tight">{t("features.ai.title")}</h3>
                  <div className="text-md text-muted-foreground flex flex-col gap-4 text-sm">
                    <p className="leading-relaxed">
                      {t("features.ai.description1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("features.ai.description2")}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none flex grow items-center justify-center select-none relative mt-4">
                  <div
                    className="relative w-full h-[400px] rounded-xl overflow-hidden"
                    style={{ borderRadius: "20px" }}
                  >
                    {/* Background with blue gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4ca1f5]/40 to-[#4ca1f5]/10 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"></div>
                    
                    {/* Grid pattern */}
                    <div 
                      className="absolute inset-0 z-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    
                    {/* Static radial glow */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)",
                      }}
                    />

                    {/* Animated SVG Connecting Lines */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={isCliHovering ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                        <motion.path
                          d="M 60.688 1.59 L 119.368 1.59 M 60.688 1.59 L 1.414 1.59"
                          stroke="rgb(181, 126, 220)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={isCliHovering ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        />
                      </svg>
                      <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                        <motion.path
                          d="M 60.688 92.449 L 119.368 92.449 M 60.688 92.449 L 1.414 92.449"
                          stroke="rgb(181, 126, 220)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={isCliHovering ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{
                            duration: 2,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                        />
                            </svg>
                    </motion.div>

                    {/* Animated Violet Blur Effect */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full blur-[74px] opacity-65 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: "rgb(181, 126, 220)" }}
                      initial={{ scale: 1 }}
                      animate={isCliHovering ? { scale: [1, 1.342, 1, 1.342] } : { scale: 1 }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: isCliHovering ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                      }}
                    />

                    {/* Main Content Container with Deliverables */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.div
                        className="flex flex-col gap-4 p-6 bg-black/60 backdrop-blur-md rounded-xl max-w-lg w-full border border-white/10 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isCliHovering ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-extralight text-white">Deliverables</h4>
                          <span className="text-xs text-white/60 font-medium">20 items</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/90 max-h-[200px] overflow-y-auto pr-2">
                          {[
                            "Custom AI Agents",
                            "AI Agent Calendar",
                            "SDRs Enablement",
                            "AEs Enablement",
                            "TAL Creation",
                            "Lead Routing",
                            "Lead Scoring",
                            "Signal Tracking",
                            "Phone Numbers",
                            "Sequences",
                            "Slack Notifications",
                            "CRM Workflows",
                            "CRM Clean-Up",
                            "CRM Enrichment",
                            "Inbound Enrichment",
                            "Job-Change Tracking",
                            "Data Formatting",
                            "Product Analytics",
                            "Lifecycle Stages",
                            "Analytics Reports",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#b57edc] mt-0.5">•</span>
                              <span>{item}</span>
                          </div>
                          ))}
                        </div>
                        <a
                          href="#"
                          className="mt-2 inline-flex items-center justify-center rounded-md font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 text-sm pointer-events-auto shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          Explore Capabilities
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Globally Usable */}
              <motion.div
                className="group border-[#4ca1f5]/40 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-2 p-8 shadow-xl transition-all ease-in-out"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 1.25 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(76, 161, 245, 0.6)",
                  boxShadow: "0 0 30px rgba(76, 161, 245, 0.2)",
                }}
              >
                <div className="flex flex-col gap-6 mb-6">
                  <h3 className="text-2xl leading-none font-extralight tracking-tight">{t("features.globally.title")}</h3>
                  <div className="text-md text-muted-foreground flex flex-col gap-4 text-sm">
                    <p>
                      {t("features.globally.description")}
                    </p>
                  </div>
                </div>
                <div className="flex min-h-[400px] grow items-start justify-center select-none relative overflow-visible">
                  <h1 className="text-center text-5xl leading-[100%] font-extralight sm:leading-normal lg:text-6xl z-20 relative" style={{ marginTop: 'calc(16rem + 68px)' }}>
                    <span
                      className="cursor-pointer"
                      style={{ color: "rgb(76, 161, 245)" }}
                    >
                        {isHovering ? scrambledCountry : countries[currentCountryIndex]}
                    </span>
                  </h1>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                    <div className="w-[400px] h-[400px]">
                      <Suspense
                        fallback={
                          <div className="bg-secondary/20 h-[400px] w-[400px] animate-pulse rounded-full"></div>
                        }
                      >
                        <Earth baseColor={baseColor} markerColor={[0, 0, 0]} glowColor={glowColor} dark={dark} />
                      </Suspense>
                    </div>
                  </div>
                  <div className="absolute top-1/2 w-full translate-y-20 scale-x-[1.2] opacity-70 transition-all duration-1000 group-hover:translate-y-8 group-hover:opacity-100">
                    <div
                      className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%]"
                      style={{ background: `radial-gradient(circle, rgb(181, 126, 220)80 0%, transparent 70%)`, opacity: 0.25 }}
                    ></div>
                    <div
                      className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%]"
                      style={{ background: `radial-gradient(circle, rgb(181, 126, 220)4d 0%, transparent 70%)`, opacity: 0.25 }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </FollowerPointerCard>
      </motion.div>
    </section>
  )
}
