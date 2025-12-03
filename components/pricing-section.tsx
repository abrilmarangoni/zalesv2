"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { inter, interTight } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function PricingSection() {
  const { t, language } = useLanguage()
  
  const pricingPlans = [
    {
      name: t("pricing.inhouse.name"),
      setupPrice: 9300,
      monthlyPrice: 3100,
      months: 3,
      description: t("pricing.inhouse.description"),
      features: [
        t("pricing.inhouse.feature1"),
        t("pricing.inhouse.feature2"),
        t("pricing.inhouse.feature3"),
        t("pricing.inhouse.feature4"),
        t("pricing.inhouse.feature5"),
        t("pricing.inhouse.feature6"),
        t("pricing.inhouse.feature7"),
        t("pricing.inhouse.feature8"),
      ],
      approach: t("pricing.inhouse.approach"),
      popular: false,
      cta: t("pricing.inhouse.cta"),
    },
    {
      name: t("pricing.agency.name"),
      monthlyPrice: 3000,
      description: t("pricing.agency.description"),
      features: [
        t("pricing.agency.feature1"),
        t("pricing.agency.feature2"),
        t("pricing.agency.feature3"),
        t("pricing.agency.feature4"),
        t("pricing.agency.feature5"),
        t("pricing.agency.feature6"),
        t("pricing.agency.feature7"),
        t("pricing.agency.feature8"),
      ],
      approach: t("pricing.agency.approach"),
      popular: true,
      cta: t("pricing.agency.cta"),
    },
    {
      name: t("pricing.custom.name"),
      price: t("pricing.custom.name"),
      description: t("pricing.custom.description"),
      features: [
        t("pricing.custom.feature1"),
        t("pricing.custom.feature2"),
        t("pricing.custom.feature3"),
        t("pricing.custom.feature4"),
        t("pricing.custom.feature5"),
        t("pricing.custom.feature6"),
        t("pricing.custom.feature7"),
        t("pricing.custom.feature8"),
        t("pricing.custom.feature9"),
      ],
      approach: t("pricing.custom.approach"),
      popular: false,
      cta: t("pricing.custom.cta"),
    },
  ]

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={cn(
              "mt-4 bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px]",
              interTight.className,
            )}
          >
            {t("pricing.title")}
          </h2>

          <p className={`${interTight.className} mt-6 text-lg font-extralight text-white/60 max-w-2xl mx-auto`}>
            {t("pricing.description")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-end">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: plan.popular ? -20 : 20 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className={`relative ${plan.popular ? 'z-10' : 'z-0'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30">
                  <div className={`${interTight.className} bg-[#b57edc]/20 text-white text-xs font-extralight px-3 py-1 rounded-full border border-[#b57edc]/40`}>
                    {t("pricing.popular")}
                  </div>
                </div>
              )}
              <div className="mx-auto">
                <div className={`relative overflow-hidden rounded-xl p-8 pt-12 border transition-all duration-300 ${
                  plan.popular 
                    ? "bg-[#b57edc]/10 border-[#b57edc]/30 hover:bg-[#b57edc]/15 hover:border-[#b57edc]/50 hover:scale-[1.02]" 
                    : "bg-[#4ca1f5]/10 border-[#4ca1f5]/30 hover:bg-[#4ca1f5]/15 hover:border-[#4ca1f5]/50 hover:scale-[1.02]"
                }`}>


                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <h3 className={`${interTight.className} text-2xl font-extralight text-white mb-3`}>
                        {plan.name}
                      </h3>
                      <div className="flex flex-col items-center justify-center gap-2 mb-3">
                        {plan.price ? (
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                        ) : plan.setupPrice ? (
                          <>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-3xl font-bold text-white">${plan.setupPrice.toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                              <span className="text-white/70 text-sm">{t("pricing.setup")}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl font-bold text-white">${plan.monthlyPrice?.toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                                <span className="text-white/70 text-sm">{t("pricing.month")}</span>
                              </div>
                              <span className="text-white/60 text-xs">{t("pricing.forMonths").replace('{months}', plan.months.toString())}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="text-4xl font-bold text-white">${plan.monthlyPrice?.toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                            <span className="text-white/70 text-lg">{t("pricing.month")}</span>
                          </>
                        )}
                      </div>
                      <p className={`${interTight.className} text-white/70 text-sm font-extralight`}>
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-start gap-3"
                        >
                          <div className={`mt-0.5 w-1 h-1 rounded-full flex-shrink-0 ${
                            plan.popular ? "bg-[#b57edc]" : "bg-[#4ca1f5]"
                          }`} />
                          <span className={`${interTight.className} text-white/80 text-sm font-extralight`}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.approach && (
                      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className={`${interTight.className} text-white/70 text-sm font-extralight leading-relaxed`}>
                          <span className="text-white/90 mr-1.5">{t("pricing.approach")}:</span>
                              {plan.approach}
                            </p>
                          </div>
                    )}

                    <button
                      className={`${interTight.className} group w-full rounded-lg px-6 py-3 font-extralight text-white transition-all ${
                        plan.popular
                          ? "bg-[#b57edc]/20 hover:bg-[#b57edc]/30 border border-[#b57edc]/40"
                          : "bg-[#4ca1f5]/20 hover:bg-[#4ca1f5]/30 border border-[#4ca1f5]/40"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{plan.cta}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
