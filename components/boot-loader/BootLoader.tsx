"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BOOT_LINES } from "./bootConfig"

type BootLoaderProps = {
  onFinish: () => void
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onFinish }) => {
  const [index, setIndex] = useState(0)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (index >= BOOT_LINES.length) {
      // Lanzar flash corto y terminar
      setFlash(true)
      const timeout = setTimeout(() => {
        setFlash(false)
        onFinish()
      }, 250) // 0.25s flash
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1)
    }, BOOT_LINES[index].delay)

    return () => clearTimeout(timeout)
  }, [index, onFinish])

  // Permitir skip con ESC
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onFinish()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onFinish])

  const handleSkip = () => {
    // Permitir skip inmediato
    onFinish()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onClick={handleSkip}
    >
      {/* Terminal box */}
      <div
        className="w-full max-w-xl rounded-lg border border-neutral-700 bg-black/80 p-6 font-mono text-sm shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          color: "rgb(181, 126, 220)",
          boxShadow: "0 0 30px rgba(181, 126, 220, 0.15), 0 0 60px rgba(181, 126, 220, 0.08)",
        }}
      >
        <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
          <span>ZalesMachine v1.0.0</span>
          <button
            onClick={handleSkip}
            className="rounded border border-neutral-600 px-2 py-1 text-[10px] uppercase tracking-wide text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            Skip boot
          </button>
        </div>

        <div className="space-y-1">
          {BOOT_LINES.slice(0, index).map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-2 text-neutral-500">$</span>
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
          {/* Cursor */}
          {index < BOOT_LINES.length && (
            <div className="flex">
              <span className="mr-2 text-neutral-500">$</span>
              <span className="animate-pulse">▌</span>
            </div>
          )}
        </div>
      </div>

      {/* Flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="pointer-events-none fixed inset-0 bg-white z-[999999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

