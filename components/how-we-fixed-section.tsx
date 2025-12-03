'use client'

import { useEffect, useRef } from 'react'
import { interTight } from '@/lib/fonts'
import { useLanguage } from '@/contexts/language-context'

export default function HowWeFixedSection() {
  const { t, language } = useLanguage()
  const horizontalSectionRef = useRef<HTMLElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!horizontalSectionRef.current || !horizontalTrackRef.current) return

      const section = horizontalSectionRef.current
      const track = horizontalTrackRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      // Delay antes de que empiece el scroll horizontal
      const scrollDelay = windowHeight * 0.2
      const startScroll = sectionTop + scrollDelay
      const endScroll = sectionTop + sectionHeight - windowHeight

      if (scrollY >= startScroll && scrollY <= endScroll) {
        // Progreso del scroll (0 a 1)
        const progress = (scrollY - startScroll) / (endScroll - startScroll)
        const clampedProgress = Math.max(0, Math.min(1, progress))

        // Calcular translateX para mover los slides
        const viewportWidth = window.innerWidth
        const totalSlides = 2 // Cantidad de slides
        const maxTranslate = (totalSlides - 1) * viewportWidth

        const translateX = -clampedProgress * maxTranslate

        // Aplicar transform con requestAnimationFrame para performance
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${translateX}px)`
        })
      } else if (scrollY < startScroll) {
        // Antes de la sección: primer slide
        requestAnimationFrame(() => {
          track.style.transform = `translateX(0px)`
        })
      } else {
        // Después de la sección: último slide
        const viewportWidth = window.innerWidth
        const totalSlides = 2
        const maxTranslate = (totalSlides - 1) * viewportWidth
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${-maxTranslate}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check inicial

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Template email content
  const templateEmail = {
    greeting: "Hola {FirstName} - vi que {Lead-level signal or activity within the CompanyName} - {1-3 word compliment}!!",
    attention: "Me llamó la atención algo: {Specific thing of their company}.",
    thinking: "Esto me hizo pensar - si pudiéramos {How our value proposition directly maps to that situation}, podrías {Outcome}.",
    closing: "Tiene sentido explorar cómo podríamos acelerarte ese proceso?"
  }

  // Output email content with highlights
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

  const results = [
    { label: language === 'es' ? 'Tasa de respuesta' : 'Response Rate', value: '34%' },
    { label: language === 'es' ? 'Conversión' : 'Conversion', value: '12%' },
    { label: language === 'es' ? 'Reuniones agendadas' : 'Meetings Booked', value: '8x' }
  ]

  return (
    <section
      ref={horizontalSectionRef}
      className="relative bg-black"
      style={{ height: "300vh" }}
    >
      {/* Contenedor sticky que se queda fijo mientras scrolleas */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex items-center">
          
          {/* Track que se mueve horizontalmente */}
          <div
            ref={horizontalTrackRef}
            className="flex transition-transform duration-100 ease-out"
            style={{ willChange: "transform" }}
          >
            
            {/* Slide 1 - Título y Template */}
            <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-6xl w-full">
                {/* Título principal */}
                <h1 className={`${interTight.className} bg-gradient-to-r from-[#7dd3fc] to-[#a5b4fc] bg-clip-text text-4xl md:text-[54px] md:leading-[60px] font-extralight tracking-tight text-transparent mb-16`}>
                  {language === 'es' ? 'Hiper Personalización a Escala' : 'Hyper Personalization at Scale'}
                </h1>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Template Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 border-2 border-[#b57edc]/50 shadow-[0_0_30px_rgba(181,126,220,0.2)]">
                    {/* Header */}
                    <div className="mb-6 pb-4 border-b border-white/10">
                      <div className="bg-[#b57edc]/80 text-white text-center py-3 px-6 rounded-full inline-block">
                        <span className={`${interTight.className} text-lg font-medium`}>Template - Email</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-6 text-white/90 text-base leading-relaxed">
                      <p>{templateEmail.greeting}</p>
                      <p>{templateEmail.attention}</p>
                      <p>{templateEmail.thinking}</p>
                      <p>{templateEmail.closing}</p>
                    </div>
                  </div>

                  {/* Output Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 border-2 border-[#b57edc]/50 shadow-[0_0_30px_rgba(181,126,220,0.2)]">
                    {/* Header */}
                    <div className="mb-6 pb-4 border-b border-white/10">
                      <div className="bg-[#b57edc]/80 text-white text-center py-3 px-6 rounded-full inline-block">
                        <span className={`${interTight.className} text-lg font-medium`}>Output Ejemplo - Email</span>
                      </div>
                    </div>
                    
                    {/* Content con highlights */}
                    <div className="space-y-6 text-white/90 text-base leading-relaxed">
                      <p>
                        {outputEmail.greeting.prefix}
                        <span className="bg-[#d4e157] text-black px-1">{outputEmail.greeting.highlight1}</span>
                        {outputEmail.greeting.middle}
                        <span className="bg-[#d4e157] text-black px-1">{outputEmail.greeting.highlight2}</span>
                      </p>
                      <p>
                        {outputEmail.attention.prefix}
                        <span className="bg-[#d4e157] text-black px-1">{outputEmail.attention.highlight}</span>
                        {outputEmail.attention.suffix}
                      </p>
                      <p>
                        {outputEmail.thinking.prefix}
                        <span className="bg-[#d4e157] text-black px-1">{outputEmail.thinking.highlight}</span>
                        {outputEmail.thinking.suffix}
                      </p>
                      <p>{outputEmail.closing}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 - Resultados */}
            <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-4xl w-full text-center">
                <h2 className={`${interTight.className} text-3xl md:text-5xl font-extralight text-white mb-8`}>
                  {language === 'es' ? 'Resultados que Importan' : 'Results That Matter'}
                </h2>
                <p className={`${interTight.className} text-lg text-white/60 mb-16 max-w-2xl mx-auto font-extralight`}>
                  {language === 'es' 
                    ? 'Cuando personalizas a escala, los números hablan por sí solos.' 
                    : 'When you personalize at scale, the numbers speak for themselves.'}
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8">
                  {results.map((result, index) => (
                    <div key={index} className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 border border-[#22c55e]/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                      <div className={`${interTight.className} text-5xl md:text-6xl font-light text-[#22c55e] mb-4`}>
                        {result.value}
                      </div>
                      <div className={`${interTight.className} text-white/70 text-sm uppercase tracking-wider`}>
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-16">
                  <a
                    href="#full-stack-ai-solutions"
                    className={`${interTight.className} inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors`}
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
                    {language === 'es' ? 'Ver cómo lo hacemos' : 'See how we do it'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

