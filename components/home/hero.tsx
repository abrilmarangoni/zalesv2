"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { DataFlowDiagram } from "@/components/data-flow-diagram"
import { useLanguage } from "@/contexts/language-context"
import { interTight } from "@/lib/fonts"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex flex-col pt-0">
        <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-24 sm:pb-32 relative z-10 flex-1 flex flex-col">
          <div className="mx-auto max-w-5xl lg:max-w-6xl text-center flex-1 flex flex-col justify-start">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
              style={{ marginTop: "58px" }}
            >
              <h1 id="main-title" className="text-4xl font-extralight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {t("hero.title")} <span className="bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-transparent" style={{ fontWeight: 200, fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>ZalesMachine</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-4 max-w-4xl lg:max-w-5xl text-lg text-muted-foreground space-y-6"
            >
              <p>
                {t("hero.description1")}
              </p>
              <p>
                {t("hero.description2")}
              </p>
            </motion.div>

            {/* Flow Diagram */}
            <DataFlowDiagram />

            {/* Book a call and Learn more buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-6 mt-8"
            >
              <div className="flex items-center justify-center gap-6">
                {/* Book a call button - white background */}
                <a href="#pricing" className="group">
                  <div className={`${interTight.className} cursor-pointer bg-white h-[44px] rounded-lg flex items-center justify-center px-6 shadow-lg hover:bg-gray-50 transition-colors`}>
                    <p className="font-extralight tracking-tight flex items-center gap-2 justify-center text-sm text-gray-900">
                      {t("hero.schedule")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </a>
                {/* Learn more button - text only */}
                <a href="#features" className="group">
                  <div className={`${interTight.className} cursor-pointer flex items-center justify-center`}>
                    <p className="font-extralight tracking-tight flex items-center gap-2 justify-center text-sm text-gray-300 hover:text-white transition-colors">
                      {t("hero.learnMore")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  )
}
