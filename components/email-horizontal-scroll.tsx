'use client'

import { useEffect, useRef, useState } from 'react'
import { interTight } from '@/lib/fonts'
import { useLanguage } from '@/contexts/language-context'

export default function EmailHorizontalScroll() {
  const { t, language } = useLanguage()
  const horizontalSectionRef = useRef<HTMLElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  
  // Estado para la animación del email fallido (Slide 1)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()


  // Estado para la animación del output email (Slide 3)
  const [outputDisplayedText, setOutputDisplayedText] = useState('')
  const [outputCurrentIndex, setOutputCurrentIndex] = useState(0)
  const [showOutputCursor, setShowOutputCursor] = useState(true)
  const [showOutputResults, setShowOutputResults] = useState(false)
  const outputTimeoutRef = useRef<NodeJS.Timeout>()

  // Email fallido texto
  const emailText = `${t("email.subject")}

${t("email.genericOpening")}

${t("email.genericOpeningText")}

${t("email.vagueValueProp")}

${t("email.vagueValueText")}

${t("email.pushyCTATitle")}

${t("email.pushyCTAText")}

${t("email.noCredibility")}

${t("email.noCredibilityText")}`

  // Output email texto (con marcadores para highlights)
  const outputEmailText = `${t("email.successSubject")}

${t("email.outputGreeting")}

${t("email.outputHighlight1")}

${t("email.outputAttention")}

${t("email.outputThinking")}

${t("email.outputClosing")}`

  const failedResults = [
    { label: t("email.responseRate"), value: '2%' },
    { label: t("email.conversion"), value: '0.1%' },
    { label: t("email.deleted"), value: '95%' }
  ]

  const successResults = [
    { label: t("email.responseRate"), value: '34%' },
    { label: t("email.conversion"), value: '12%' },
    { label: t("email.meetingsBooked"), value: '8x' }
  ]

  // Reset cuando cambia el idioma
  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setShowResults(false)
    setOutputDisplayedText('')
    setOutputCurrentIndex(0)
    setShowOutputResults(false)
  }, [language])

  // Animación del email fallido (Slide 1)
  useEffect(() => {
    if (currentIndex < emailText.length) {
      const char = emailText[currentIndex]
      let delay = Math.random() * 20 + 15
      if (currentIndex > 0 && emailText[currentIndex - 1] === '\n') {
        delay = Math.random() * 150 + 150
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

  // Animación del output email (Slide 2)
  useEffect(() => {
    if (outputCurrentIndex < outputEmailText.length) {
      const char = outputEmailText[outputCurrentIndex]
      let delay = Math.random() * 20 + 15
      if (outputCurrentIndex > 0 && outputEmailText[outputCurrentIndex - 1] === '\n') {
        delay = Math.random() * 150 + 150
      }
      outputTimeoutRef.current = setTimeout(() => {
        setOutputDisplayedText((prev) => prev + char)
        setOutputCurrentIndex((prev) => prev + 1)
      }, delay)
    } else {
      setShowOutputResults(true)
      setTimeout(() => {
        setOutputDisplayedText('')
        setOutputCurrentIndex(0)
        setShowOutputResults(false)
      }, 4000)
    }
    return () => {
      if (outputTimeoutRef.current) clearTimeout(outputTimeoutRef.current)
    }
  }, [outputCurrentIndex, outputEmailText])

  // Cursor blink para ambos emails
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
      setShowOutputCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Scroll horizontal - 4 slides
  useEffect(() => {
    const handleScroll = () => {
      if (!horizontalSectionRef.current || !horizontalTrackRef.current) return

      const section = horizontalSectionRef.current
      const track = horizontalTrackRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      const scrollDelay = windowHeight * 0.2
      const startScroll = sectionTop + scrollDelay
      const endScroll = sectionTop + sectionHeight - windowHeight

      if (scrollY >= startScroll && scrollY <= endScroll) {
        const progress = (scrollY - startScroll) / (endScroll - startScroll)
        const clampedProgress = Math.max(0, Math.min(1, progress))
        const viewportWidth = window.innerWidth
        const totalSlides = 2
        const maxTranslate = (totalSlides - 1) * viewportWidth
        const translateX = -clampedProgress * maxTranslate

        requestAnimationFrame(() => {
          track.style.transform = `translateX(${translateX}px)`
        })
      } else if (scrollY < startScroll) {
        requestAnimationFrame(() => {
          track.style.transform = `translateX(0px)`
        })
      } else {
        const viewportWidth = window.innerWidth
        const totalSlides = 2
        const maxTranslate = (totalSlides - 1) * viewportWidth
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${-maxTranslate}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para resaltar texto entre [] en el output (verde sin fondo)
  const renderOutputText = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g)
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const content = part.slice(1, -1)
        return <span key={index} className="text-[#22c55e]">{content}</span>
      }
      return <span key={index}>{part}</span>
    })
  }

  // Output email with highlights (legacy - keeping for reference)
  const outputEmail = {
    greeting: {
      prefix: "Hola ",
      highlight1: "Nico",
      middle: " - vi que ",
      highlight2: "alcanzaron 4.2M ARR - felicitaciones por ese hito!!",
    },
    attention: {
      prefix: "Me llamó la atención algo: ",
      highlight: "están escalando operaciones con un equipo de recruiting de pocas personas",
      suffix: "."
    },
    thinking: {
      prefix: "Esto me hizo pensar - ",
      highlight: "si pudiéramos ayudarte a contratar profesionales de LATAM 2x más rápido, esos 6 roles que están buscando los podrías cerrar en semanas en lugar de meses",
      suffix: "."
    },
    closing: "Tiene sentido explorar cómo podríamos acelerarte ese proceso?"
  }

  return (
    <section
      ref={horizontalSectionRef}
      className="relative bg-black"
      style={{ height: "350vh" }}
    >
      {/* Contenedor sticky */}
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        <div className="h-full flex items-center">
          
          {/* Track horizontal */}
          <div
            ref={horizontalTrackRef}
            className="flex transition-transform duration-100 ease-out"
            style={{ willChange: "transform" }}
          >
            
            {/* ========== SLIDE 1: Why Most Outbounds Fail? ========== */}
            <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-[1100px] w-full">
                {/* Título */}
                <div className="text-center mb-12">
                  <h1 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px]`}>
                    {t("email.title")}
                  </h1>
                </div>
                
                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
                  {/* Email fallido */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl bg-[#151515] p-6 shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/5 h-[480px]">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                          <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                          <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                        </div>
                        <span className="ml-4 text-sm text-white/40">{t("email.failedColdEmail")}</span>
                      </div>
                      
                      <div className="font-mono text-[14px] leading-tight text-white/90">
                        <pre className="whitespace-pre-wrap">
                          {displayedText.split('\n').map((line, index) => {
                            const isAllCaps = line.trim().length > 0 && line.trim() === line.trim().toUpperCase() && /^[A-Z\s:\-]+$/.test(line.trim());
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
                            {failedResults.map((result, index) => (
                              <span key={index}>
                                <span className="text-red-500 font-semibold">{result.value}</span>
                                <span className="text-white/70"> {result.label}</span>
                                {index < failedResults.length - 1 && <span className="text-white/40 ml-3">|</span>}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className={`inline-block ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Texto descriptivo */}
                  <div className="space-y-6">
                    <h2 className={`${interTight.className} text-2xl md:text-3xl leading-none font-extralight tracking-tight text-white`}>
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
                </div>
              </div>
            </div>

            {/* ========== SLIDE 2: Output Ejemplo Email (dos columnas como Slide 1) ========== */}
            <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-[1100px] w-full">
                {/* Título */}
                <div className="text-center mb-12">
                  <h1 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px]`}>
                    {t("email.highPerformingTitle")}
                  </h1>
                </div>
                
                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
                  {/* Output Email */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl bg-[#151515] p-6 shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/5 h-[480px]">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                          <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                          <div className="h-3 w-3 rounded-full bg-violet-400/60" />
                        </div>
                        <span className="ml-4 text-sm text-white/40">{t("email.highPerformingEmail")}</span>
                      </div>
                      
                      <div className="font-mono text-[14px] leading-tight text-white/90">
                        <pre className="whitespace-pre-wrap">
                          {renderOutputText(outputDisplayedText)}
                        </pre>
                        {showOutputResults && (
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                            {successResults.map((result, index) => (
                              <span key={index}>
                                <span className="text-[#22c55e] font-semibold">{result.value}</span>
                                <span className="text-white/70"> {result.label}</span>
                                {index < successResults.length - 1 && <span className="text-white/40 ml-3">|</span>}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className={`inline-block ${showOutputCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Texto descriptivo - Placeholders */}
                  <div className="space-y-6">
                    <h2 className={`${interTight.className} text-2xl md:text-3xl leading-none font-extralight tracking-tight text-white`}>
                      {t("email.personalizedVariables")}
                    </h2>
                    <div className="space-y-2">
                      <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                        — {t("email.placeholder.firstName")}
                      </p>
                      <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                        — {t("email.placeholder.leadSignal")}
                      </p>
                      <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                        — {t("email.placeholder.compliment")}
                      </p>
                      <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                        — {t("email.placeholder.companyThing")}
                      </p>
                      <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                        — {t("email.placeholder.valueProp")}
                      </p>
                      <p className={`${interTight.className} text-sm md:text-base text-white/65 leading-relaxed font-extralight`}>
                        — {t("email.placeholder.outcome")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
