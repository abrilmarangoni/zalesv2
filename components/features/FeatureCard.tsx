"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Earth from "../ui/globe"
import type { FeatureData } from "./featuresData"

interface FeatureCardProps {
  feature: FeatureData
  countries: string[]
  accentColor?: string
}

export function FeatureCard({ feature, countries, accentColor = "#4ca1f5" }: FeatureCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0)
  const [scrambledCountry, setScrambledCountry] = useState(countries[0] || "")
  const { theme } = useTheme()

  // Convert accentColor hex to RGB normalized for Earth component
  const getColorFromHex = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b]
  }

  const [baseColor, setBaseColor] = useState<[number, number, number]>(getColorFromHex(accentColor))
  const [glowColor, setGlowColor] = useState<[number, number, number]>(getColorFromHex(accentColor))
  const [dark, setDark] = useState<number>(theme === "dark" ? 1 : 0)

  useEffect(() => {
    const color = getColorFromHex(accentColor)
    setBaseColor(color)
    setGlowColor(color)
    setDark(theme === "dark" ? 1 : 0)
  }, [theme, accentColor])

  useEffect(() => {
    if (feature.type !== "globally" || !isHovering) {
      setCurrentCountryIndex(0)
      setScrambledCountry(countries[0] || "")
      return
    }

    const scrambleInterval = setInterval(() => {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)]
      setScrambledCountry(randomCountry)
    }, 150)

    const finalInterval = setInterval(() => {
      setCurrentCountryIndex((prev) => (prev + 1) % countries.length)
    }, 3500)

    return () => {
      clearInterval(scrambleInterval)
      clearInterval(finalInterval)
    }
  }, [isHovering, countries, feature.type])

  const gradientStyle = {
    background: `linear-gradient(180deg, ${accentColor}66 0%, ${accentColor}1A 100%)`,
  }

  if (feature.type === "globally") {
    return (
      <motion.div
        className="group text-card-foreground relative flex flex-col overflow-visible rounded-xl border-2 p-10 shadow-xl transition-all ease-in-out w-full min-h-[600px]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{
          scale: 1.02,
          borderColor: `${accentColor}99`,
          boxShadow: `0 0 30px ${accentColor}33`,
        }}
        style={{ borderColor: `${accentColor}66`, background: `linear-gradient(180deg, ${accentColor}26, transparent)` }}
      >
        <div className="flex flex-col gap-6 mb-6">
          <h3 className="text-2xl leading-none font-extralight tracking-tight">{feature.title}</h3>
          <div className="text-md text-muted-foreground flex flex-col gap-4 text-sm">
            <p>{feature.description}</p>
          </div>
        </div>
        <div className="flex min-h-[400px] grow items-start justify-center select-none relative overflow-visible">
          <h1 className="text-center text-5xl leading-[100%] font-extralight sm:leading-normal lg:text-6xl z-20 relative" style={{ marginTop: 'calc(16rem + 68px)' }}>
            <span
              className="cursor-pointer"
              style={{ color: accentColor }}
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
                <Earth baseColor={accentColor === "#4ca1f5" ? [0.298, 0.631, 0.961] : [0.710, 0.494, 0.863]} markerColor={[0, 0, 0]} glowColor={accentColor === "#4ca1f5" ? [0.298, 0.631, 0.961] : [0.710, 0.494, 0.863]} dark={dark} />
              </Suspense>
            </div>
          </div>
          <div className="absolute top-1/2 w-full translate-y-20 scale-x-[1.2] opacity-70 transition-all duration-1000 group-hover:translate-y-8 group-hover:opacity-100">
            <div
              className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%]"
              style={{ background: `radial-gradient(circle, ${accentColor}80 0%, transparent 70%)`, opacity: 0.25 }}
            ></div>
            <div
              className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%]"
              style={{ background: `radial-gradient(circle, ${accentColor}4d 0%, transparent 70%)`, opacity: 0.25 }}
            ></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="group text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-2 p-10 shadow-xl transition-all ease-in-out w-full min-h-[600px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{
        scale: 1.02,
        borderColor: `${accentColor}99`,
        boxShadow: `0 0 30px ${accentColor}33`,
      }}
      style={{ borderColor: `${accentColor}66`, background: `linear-gradient(180deg, ${accentColor}26, transparent)` }}
    >
      <div className="flex flex-col gap-6 mb-6">
        <h3 className="text-2xl leading-none font-semibold tracking-tight">{feature.title}</h3>
        <div className="text-md text-muted-foreground flex flex-col gap-4 text-sm">
          {feature.description.split(". ").map((sentence, idx, arr) => (
            <p key={idx} className="leading-relaxed">
              {sentence}
              {idx < arr.length - 1 ? "." : ""}
            </p>
          ))}
        </div>
      </div>

      <div className="pointer-events-none flex grow items-center justify-center select-none relative mt-4">
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden" style={{ borderRadius: 20 }}>
          <div className="absolute inset-0 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]" style={gradientStyle}></div>

          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)",
            }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isHovering ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
              <motion.path
                d="M 60.688 1.59 L 119.368 1.59 M 60.688 1.59 L 1.414 1.59"
                stroke={accentColor}
                fill="transparent"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={isHovering ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </svg>
            <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
              <motion.path
                d="M 60.688 92.449 L 119.368 92.449 M 60.688 92.449 L 1.414 92.449"
                stroke={accentColor}
                fill="transparent"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={isHovering ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full blur-[74px] opacity-65 transform -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: accentColor }}
            initial={{ scale: 1 }}
            animate={isHovering ? { scale: [1, 1.342, 1, 1.342] } : { scale: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
              repeatType: "loop",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              className="flex flex-col gap-4 p-6 bg-black/60 backdrop-blur-md rounded-xl max-w-lg w-full border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHovering ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-extralight text-white">Deliverables</h4>
                <span className="text-xs text-white/60 font-medium">{feature.deliverablesCount} items</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/90 max-h-[200px] overflow-y-auto pr-2">
                {feature.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span style={{ color: accentColor }} className="mt-0.5">
                      •
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="mt-2 inline-flex items-center justify-center rounded-md font-medium transition-all text-white h-10 px-6 py-2 text-sm pointer-events-auto shadow-lg hover:shadow-xl hover:scale-105"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 4px 14px 0 ${accentColor}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor === "#4ca1f5" ? "#3a8de0" : "#9d6bc4"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor
                }}
              >
                Explore Capabilities
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

