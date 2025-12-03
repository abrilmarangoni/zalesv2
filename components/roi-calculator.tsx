"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { interTight } from "@/lib/fonts"

export function ROICalculator() {
  const { t } = useLanguage()
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [conversionRate, setConversionRate] = useState(2)
  const [averageDealSize, setAverageDealSize] = useState(10000)
  const [costPerLead, setCostPerLead] = useState(50)

  // Calculations
  const leadsNeeded = Math.ceil(monthlyRevenue / averageDealSize)
  const qualifiedLeadsNeeded = Math.ceil(leadsNeeded / (conversionRate / 100))
  const monthlyCost = qualifiedLeadsNeeded * costPerLead
  const annualCost = monthlyCost * 12
  const annualRevenue = monthlyRevenue * 12
  const roi = annualCost > 0 ? ((annualRevenue - annualCost) / annualCost) * 100 : 0
  const roiMultiplier = annualCost > 0 ? (annualRevenue / annualCost).toFixed(2) : 0

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px] mb-4`}>
            {t("roi.title")}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("roi.description")}
          </p>
        </motion.div>

        {/* Single Quadrant Container */}
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
          >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Inputs */}
            <div className="space-y-6 h-full flex flex-col">
              <h3 className={`${interTight.className} text-xl font-extralight text-white mb-6`}>{t("roi.metrics")}</h3>

              <div className="space-y-5 flex-1">
              <div>
                  <label className={`${interTight.className} block text-sm font-extralight text-white/70 mb-2`}>
                  {t("roi.monthlyRevenue")}
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">$</span>
                  <input
                    type="number"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      className={`${interTight.className} w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all`}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div>
                  <label className={`${interTight.className} block text-sm font-extralight text-white/70 mb-2`}>
                  {t("roi.conversionRate")}
                </label>
                  <div className="relative">
                <input
                  type="number"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  step="0.1"
                      className={`${interTight.className} w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all`}
                  placeholder="2"
                />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">%</span>
                  </div>
              </div>

              <div>
                  <label className={`${interTight.className} block text-sm font-extralight text-white/70 mb-2`}>
                  {t("roi.dealSize")}
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">$</span>
                  <input
                    type="number"
                    value={averageDealSize}
                    onChange={(e) => setAverageDealSize(Number(e.target.value))}
                      className={`${interTight.className} w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all`}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                  <label className={`${interTight.className} block text-sm font-extralight text-white/70 mb-2`}>
                  {t("roi.costPerLead")}
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">$</span>
                  <input
                    type="number"
                    value={costPerLead}
                    onChange={(e) => setCostPerLead(Number(e.target.value))}
                      className={`${interTight.className} w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all`}
                    placeholder="50"
                  />
                </div>
              </div>
            </div>
            </div>

            {/* Right Side - Results */}
            <div className="space-y-6 h-full flex flex-col">
              <h3 className={`${interTight.className} text-xl font-extralight text-white mb-6`}>{t("roi.results")}</h3>

              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className={`${interTight.className} text-white/70 text-sm font-extralight`}>{t("roi.leadsNeeded")}</span>
                  <span className={`${interTight.className} text-lg font-extralight text-white`}>{leadsNeeded.toLocaleString()}</span>
              </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className={`${interTight.className} text-white/70 text-sm font-extralight`}>{t("roi.qualifiedLeads")}</span>
                  <span className={`${interTight.className} text-lg font-extralight text-white`}>{qualifiedLeadsNeeded.toLocaleString()}</span>
              </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className={`${interTight.className} text-white/70 text-sm font-extralight`}>{t("roi.monthlyCost")}</span>
                  <span className={`${interTight.className} text-lg font-extralight text-white`}>${monthlyCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className={`${interTight.className} text-white/70 text-sm font-extralight`}>{t("roi.annualCost")}</span>
                  <span className={`${interTight.className} text-lg font-extralight text-white`}>${annualCost.toLocaleString()}</span>
                </div>

                <div className="pt-4 mt-auto space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`${interTight.className} text-white/70 text-sm font-extralight`}>{t("roi.annualRevenue")}</span>
                    <span className={`${interTight.className} text-xl font-extralight text-white`}>${annualRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${interTight.className} text-white/70 text-sm font-extralight`}>{t("roi.roi")}</span>
                    <span className={`${interTight.className} text-xl font-extralight text-white`}>{roi.toFixed(0)}%</span>
                </div>
                <div className="pt-3 border-t border-white/10 text-center">
                    <span className={`${interTight.className} text-white/60 text-xs font-extralight`}>{t("roi.investmentReturn")} </span>
                    <span className={`${interTight.className} text-base font-extralight text-white`}>${roiMultiplier}</span>
                  </div>
                </div>
                </div>
              </div>
            </div>

          {/* CTA Button - Bottom Center */}
          <div className="flex items-center justify-center mt-10">
            <a
              href="#pricing"
              className={`${interTight.className} group bg-white text-black font-extralight py-3 px-8 rounded-lg transition-colors hover:bg-gray-50 flex items-center gap-2`}
            >
              <span>{t("hero.schedule")}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
              </div>
            </motion.div>
      </div>
    </section>
  )
}
