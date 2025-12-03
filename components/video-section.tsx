"use client"

import { motion } from "framer-motion"
import { inter, interTight } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function VideoSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Text Above Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`${interTight.className} bg-gradient-to-r from-[#e0c5f0] to-[#b3d5ff] bg-clip-text text-center text-4xl font-extralight tracking-tight text-transparent md:text-[54px] md:leading-[60px] mb-4`}>
            {t("video.title")}
          </h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            {t("video.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-full mx-auto" style={{ maxWidth: '65%' }}>
            {/* Video Container */}
          <div
              className="relative rounded-t-lg overflow-hidden"
            style={{
              boxShadow: "0 25px 80px -10px rgba(181, 126, 220, 0.5), 0 0 40px -5px rgba(181, 126, 220, 0.4), 0 10px 20px -5px rgba(181, 126, 220, 0.3)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/lnvnm-xrBPs?si=fBG1Ve1gXMEVDTtB"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
                className="w-full aspect-video"
              />
            </div>
            
            {/* Text Container Below Video */}
            <div className="bg-zinc-900 rounded-b-lg px-8 py-6 border-t border-zinc-800 text-center">
              <h3 className="text-2xl font-extralight text-white mb-3">
                {t("video.solutionsAction")}
              </h3>
              <p className="text-zinc-400 text-base mb-4 leading-relaxed">
                {t("video.seeHow")}
              </p>
              <a
                href="https://www.youtube.com/watch?v=lnvnm-xrBPs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-violet-400 transition-colors font-medium"
              >
                {t("video.watchYouTube")}
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

