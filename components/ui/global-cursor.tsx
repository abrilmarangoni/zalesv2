"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function GlobalCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const hideCursor = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseleave", hideCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseleave", hideCursor)
    }
  }, [])

  return (
    <motion.div
      className="fixed z-[99999] pointer-events-none"
      style={{
        left: cursorPosition.x,
        top: cursorPosition.y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.05,
        ease: "linear",
      }}
    >
      <div className="flex items-center pointer-events-none">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          className="h-6 w-6 -rotate-[70deg] transform drop-shadow-lg pointer-events-none"
          style={{ stroke: "rgb(181, 126, 220)", fill: "rgb(181, 126, 220)" }}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
        </svg>
        <motion.div
          style={{
            backgroundColor: "rgb(181, 126, 220)",
          }}
          className="ml-2 min-w-max rounded-full px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg border border-white/20 pointer-events-none"
        >
          ZalesMachine
        </motion.div>
      </div>
    </motion.div>
  )
}

