"use client"

import React from "react"
import { useLanguage } from "@/contexts/language-context"
import { interTight } from "@/lib/fonts"

export default function OutboundFails() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div className="container mx-auto px-4 relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-12">
            <h2 className={`${interTight.className} text-3xl md:text-4xl lg:text-5xl font-extralight mb-4 leading-tight max-w-3xl mx-auto`}>
              <span className="bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-transparent">Why most outbound</span> <span className="font-medium text-red-400">fails</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">{t('problems.anatomy-failed')}</p>
          </div>

          {/* Problem Indicators - Floating Cards */}
          <div className="relative max-w-6xl mx-auto mb-12">
            {/* Central Problem Visualization */}
            <div className="relative bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-500/20 p-8 md:p-10 lg:p-12 backdrop-blur-sm group">
              
              {/* Floating Problem Indicators - In Red Background Area */}
              <div className="absolute top-6 left-6 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-1000 ease-in-out group-hover:top-24 group-hover:left-20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t('problems.generic-template')}
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-1000 ease-in-out group-hover:top-24 group-hover:right-20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t('problems.vague-value')}
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-1000 ease-in-out group-hover:bottom-24 group-hover:left-20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t('problems.pushy-cta')}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-1000 ease-in-out group-hover:bottom-24 group-hover:right-20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t('problems.no-social-proof')}
                </div>
              </div>

              {/* Central Content - Stylized Email Representation */}
              <div className="text-center">
                <div className="relative inline-block bg-zinc-900/60 rounded-xl border border-zinc-700/50 p-6 md:p-8 max-w-2xl backdrop-blur-sm">
                  {/* Email Header Simulation */}
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-600/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium text-sm md:text-base">{t('problems.typical-cold-email')}</div>
                      <div className="text-gray-400 text-xs">{t('problems.gets-deleted')}</div>
                    </div>
                  </div>

                  {/* Email Content Blocks */}
                  <div className="space-y-3 text-left">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                      <div className="text-red-400 text-xs font-medium mb-1">{t('problems.generic-opening')}</div>
                      <div className="text-gray-300 text-xs md:text-sm">
                        {t('problems.generic-opening-text')}
                      </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                      <div className="text-red-400 text-xs font-medium mb-1">{t('problems.vague-value-prop')}</div>
                      <div className="text-gray-300 text-xs md:text-sm">
                        {t('problems.vague-value-text')}
                      </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                      <div className="text-red-400 text-xs font-medium mb-1">{t('problems.pushy-cta-title')}</div>
                      <div className="text-gray-300 text-xs md:text-sm">{t('problems.pushy-cta-text')}</div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                      <div className="text-red-400 text-xs font-medium mb-1">{t('problems.no-credibility')}</div>
                      <div className="text-gray-300 text-xs md:text-sm">{t('problems.no-credibility-text')}</div>
                    </div>
                  </div>

                  {/* Results Indicator */}
                  <div className="mt-6 pt-5 border-t border-zinc-600/30">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-red-400 mb-1">2%</div>
                        <div className="text-xs text-gray-500">{t('problems.response-rate')}</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-red-400 mb-1">0.1%</div>
                        <div className="text-xs text-gray-500">{t('problems.conversion')}</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-red-400 mb-1">95%</div>
                        <div className="text-xs text-gray-500">{t('problems.deleted')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Lines to Problems */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(239, 68, 68, 0.5)" />
                  <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
                </linearGradient>
              </defs>
              <path
                d="M 100 50 Q 200 100 300 150"
                stroke="url(#redGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <path
                d="M 500 50 Q 400 100 300 150"
                stroke="url(#redGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <path
                d="M 150 350 Q 200 300 300 250"
                stroke="url(#redGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <path
                d="M 450 350 Q 400 300 300 250"
                stroke="url(#redGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
