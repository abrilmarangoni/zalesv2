"use client"

import React, { useRef } from "react"
import { ProblemCard } from "./ProblemCard"
import { useProblemsData } from "./problemsData"

export default function Problems() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const problems = useProblemsData()

  return (
    <section
      id="problems"
      ref={sectionRef}
      className="relative w-full py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Título arriba */}
        <div className="w-full flex flex-col gap-4 items-center text-center mb-12">
          {/* TÍTULO PRINCIPAL */}
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6">
            Common challenges we solve.
          </h2>
          {/* TEXTO UNIFORME */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <p className="text-base text-zinc-300 leading-relaxed">
              B2B Tech Companies we work with share the same critical need, Increase pipeline and revenue
            </p>
            <p className="text-base text-zinc-300 leading-relaxed">
              We can help you if any of these challenges sound familiar:
            </p>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              countries={[]}
              accentColor="#dc2626"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
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
            Get Started
            <span className="ml-2 text-xs">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

