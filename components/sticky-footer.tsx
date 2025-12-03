"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function StickyFooter() {
  const { t } = useLanguage()
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full h-80 flex justify-center items-center"
          style={{ backgroundColor: "var(--primary)" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12"
            style={{ color: "#121113" }}
          >
            <motion.div
              className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ul className="space-y-2">
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                  onClick={() => {
                    const element = document.getElementById("pricing")
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
                  {t("footer.contact")}
                </li>
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }}
                >
                  {t("footer.home")}
                </li>
              </ul>
              <ul className="space-y-2">
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                    YouTube
                  </a>
                </li>
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                    LinkedIn
                  </a>
                </li>
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                    Instagram
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.h2
              className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] font-bold select-none"
              style={{ color: "#121113" }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ZalesMachine
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
