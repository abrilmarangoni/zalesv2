"use client"

import React, { useEffect, useRef, useState } from "react"
import { FeatureCard } from "./FeatureCard"
import { useFeaturesData } from "./featuresData"

const countries = [
  "Argentina",
  "México",
  "USA",
  "Colombia",
  "Chile",
  "España",
  "Brasil",
  "Perú",
  "Ecuador",
  "Venezuela",
  "Uruguay",
  "Paraguay",
  "Bolivia",
  "Costa Rica",
  "Panamá",
  "Guatemala",
  "Honduras",
  "Francia",
  "Alemania",
  "Italia",
  "Reino Unido",
  "Portugal",
  "Países Bajos",
  "Bélgica",
  "Suiza",
  "Austria",
  "Suecia",
  "Noruega",
  "Dinamarca",
  "Polonia",
]

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const features = useFeaturesData()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const cardsCount = features.length
      const viewportHeight = window.innerHeight
      const sectionHeight = cardsCount * viewportHeight

      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + sectionHeight
      const scrollY = window.scrollY

      if (scrollY <= sectionTop) {
        setActiveIndex(0)
        return
      }

      if (scrollY >= sectionBottom - viewportHeight) {
        setActiveIndex(cardsCount - 1)
        return
      }

      const usableScroll = sectionHeight - viewportHeight
      const internalScroll = scrollY - sectionTop
      const progress = internalScroll / usableScroll

      let index = Math.floor(progress * cardsCount)
      if (index < 0) index = 0
      if (index > cardsCount - 1) index = cardsCount - 1

      setActiveIndex(index)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${features.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-start pt-24">
        <div className="w-1/2 px-16 flex flex-col gap-5">
          {/* EYEBROW / LABEL */}
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
            Futures
          </p>
          {/* TÍTULO PRINCIPAL */}
          <h2 className="text-4xl md:text-5xl font-extralight text-zinc-50">
            Design the next version of your revenue engine.
          </h2>
          {/* DESCRIPCIÓN CORTA DE LA SECCIÓN FUTURES */}
          <p className="text-zinc-400 max-w-xl text-sm md:text-base leading-relaxed">
            Futures is where we stop talking about "AI ideas" and actually build what
            your team will be using six months from now: custom agents, pipelines and
            experiments that plug into your stack and compound over time.
          </p>
          {/* CTA → SCROLLEAR / NAVEGAR A LA SECCIÓN DE BOOK A CALL */}
          <div className="mt-4">
            <a
              href="#book-a-call"
              className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-violet-600 transition-colors"
              style={{ backgroundColor: "rgb(181, 126, 220)", borderColor: "rgba(181, 126, 220, 0.3)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(156, 108, 200)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(181, 126, 220)"
              }}
            >
              I'm interested
              <span className="ml-2 text-xs">→</span>
            </a>
          </div>
        </div>

        <div className="w-1/2 px-16 flex items-center justify-center">
          <div className="w-full max-w-2xl transition-all duration-400 ease-out">
            <FeatureCard
              feature={features[activeIndex]}
              countries={countries}
              accentColor={activeIndex % 2 === 0 ? "#4ca1f5" : "#b57edc"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
