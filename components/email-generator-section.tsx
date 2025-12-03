'use client'

import { useEffect, useState, useRef } from 'react'
import { interTight } from '@/lib/fonts'
import { useLanguage } from '@/contexts/language-context'

export default function EmailGeneratorSection() {
  const { t, language } = useLanguage()
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const emailText = `${t("email.subject")}

${t("email.kindDeleted")}

${t("email.genericOpening")}

${t("email.genericOpeningText")}

${t("email.vagueValueProp")}

${t("email.vagueValueText")}

${t("email.pushyCTATitle")}

${t("email.pushyCTAText")}

${t("email.noCredibility")}

${t("email.noCredibilityText")}`

  const results = [
    { label: t("email.responseRate"), value: '2%' },
    { label: t("email.conversion"), value: '0.1%' },
    { label: t("email.deleted"), value: '95%' }
  ]

  useEffect(() => {
    // Reset cuando cambia el idioma
    setDisplayedText('')
    setCurrentIndex(0)
    setShowResults(false)
  }, [language])

  useEffect(() => {
    if (currentIndex < emailText.length) {
      const char = emailText[currentIndex]
      
      let delay = Math.random() * 20 + 15 // 15-35ms
      
      if (currentIndex > 0 && emailText[currentIndex - 1] === '\n') {
        delay = Math.random() * 150 + 150 // 150-300ms
      }
      
      timeoutRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + char)
        setCurrentIndex((prev) => prev + 1)
      }, delay)
    } else {
      setShowResults(true)
      setTimeout(() => {
        setDisplayedText('')
        setCurrentIndex(0)
        setShowResults(false)
      }, 4000)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, emailText])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`relative bg-black py-20 md:py-28 px-6 md:px-12 lg:px-20 ${interTight.className}`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center mb-20">
          <h1 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px]`}>
            {t("email.title")}
          </h1>
        </div>
        <div className="grid gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 items-center">
          {/* Left Column - Email Generator */}
          <div className="relative">
            <div className="email-generator-container relative overflow-hidden rounded-2xl bg-[#151515] p-[17px] shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/5 min-h-[600px]">
              {/* Subtle glare effect */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Editor Header */}
              <div className="mb-6 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                  <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                  <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                </div>
                <span className="ml-4 text-sm text-white/40">{t("email.failedColdEmail")}</span>
              </div>
              {/* Email Content */}
              <div className="font-mono text-[15px] leading-tight text-white/90">
                <pre className="whitespace-pre-wrap">
                  {displayedText.split('\n').map((line, index) => {
                    const isAllCaps = line.trim().length > 0 && line.trim() === line.trim().toUpperCase() && /^[A-Z\s:]+$/.test(line.trim());
                    return (
                      <span key={index} className={isAllCaps ? 'text-red-500' : ''}>
                        {line}
                        {index < displayedText.split('\n').length - 1 && '\n'}
                      </span>
                    );
                  })}
                </pre>
                {showResults && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {results.map((result, index) => (
                      <span key={index}>
                        <span className="text-red-500 font-semibold">{result.value}</span>
                        <span className="text-white/70"> {result.label}</span>
                        {index < results.length - 1 && <span className="text-white/40 ml-3">|</span>}
                      </span>
                    ))}
                  </div>
                )}
                <span className={`inline-block ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </div>
            </div>
          </div>
          {/* Right Column - Title & CTA */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className={`${interTight.className} text-3xl leading-none font-extralight tracking-tight text-white`}>
                {t("email.subtitle")}
              </h2>
              
              <div className="space-y-2">
                <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                  {t("email.genericTemplates")}
                </p>
                <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                  {t("email.vagueValue")}
                </p>
                <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                  {t("email.pushyCTA")}
                </p>
                <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                  {t("email.noSocialProof")}
                </p>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={`${interTight.className} cursor-pointer bg-white h-[44px] rounded-lg flex items-center justify-center px-6 shadow-lg hover:bg-gray-50 transition-colors`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById("full-stack-ai-solutions")
                  if (element) {
                    const headerOffset = 120
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    const offsetPosition = elementPosition - headerOffset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                <p className="font-extralight tracking-tight flex items-center gap-2 justify-center text-sm text-gray-900">
                  {t("email.howWeSolve")}
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
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

