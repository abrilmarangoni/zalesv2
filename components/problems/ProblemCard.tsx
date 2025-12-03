"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Earth from "../ui/globe"
import type { ProblemData } from "./problemsData"

interface ProblemCardProps {
  problem: ProblemData
  countries: string[]
  accentColor?: string
}

export function ProblemCard({ problem, countries, accentColor = "#4ca1f5" }: ProblemCardProps) {
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
    if (problem.type !== "globally" || !isHovering) {
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
    }, 2000)

    return () => {
      clearInterval(scrambleInterval)
      clearInterval(finalInterval)
    }
  }, [isHovering, countries, problem.type])

  const gradientStyle = {
    background: `linear-gradient(180deg, ${accentColor}66 0%, ${accentColor}1A 100%)`,
  }

  if (problem.type === "globally") {
    return (
      <motion.div
        className="group text-card-foreground relative flex flex-col overflow-visible rounded-xl border-2 p-10 shadow-xl transition-all ease-in-out w-full min-h-[600px]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{
          scale: 1.02,
          borderColor: accentColor,
          boxShadow: `0 0 30px ${accentColor}33`,
        }}
        style={{ borderColor: accentColor, backgroundColor: accentColor }}
      >
        <div className="flex flex-col gap-6 mb-6">
          <h3 className="text-2xl leading-none font-extralight tracking-tight text-white">{problem.title}</h3>
          <div className="text-md flex flex-col gap-4 text-sm text-white/90">
            <p>{problem.description}</p>
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
      className="group text-card-foreground relative flex flex-col overflow-hidden rounded-xl border border-red-500/30 p-8 shadow-xl transition-all ease-in-out w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{
        scale: 1.01,
        borderColor: "rgba(220, 38, 38, 0.5)",
        boxShadow: `0 8px 32px rgba(220, 38, 38, 0.2)`,
      }}
      style={{ 
        borderColor: "rgba(220, 38, 38, 0.3)", 
        backgroundColor: "rgba(220, 38, 38, 0.08)",
        backdropFilter: "blur(10px)"
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded border-2 border-red-500/50 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L3 9M3 3L9 9" stroke="rgb(220, 38, 38)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl leading-tight font-extralight tracking-tight text-white mb-3">{problem.title}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

