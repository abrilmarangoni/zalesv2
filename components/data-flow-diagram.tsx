"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Database, Cloud, Zap, BarChart3, Settings } from "lucide-react"

export function DataFlowDiagram() {
  const [mounted, setMounted] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const animationRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !dotRef.current || !svgRef.current) return

    // Cargar GSAP dinámicamente solo en el cliente
    const initAnimation = async () => {
      try {
        const gsap = (await import("gsap")).gsap
        const MotionPathPlugin = (await import("gsap/MotionPathPlugin")).MotionPathPlugin
        
        gsap.registerPlugin(MotionPathPlugin)

        // Paths para las 3 combinaciones diferentes
        const paths = [
          "#path-full-1", // línea 1 izq -> línea 3 derecha
          "#path-full-2", // línea 2 izq -> línea 1 derecha
          "#path-full-3", // línea 3 izq -> línea 2 derecha
        ]

        let currentPathIndex = 0

        const animatePath = (pathId: string) => {
          // Crear timeline para animar nodo y trail juntos
          const tl = gsap.timeline({
            onComplete: () => {
              // Cuando termina, cambiar al siguiente path
              currentPathIndex = (currentPathIndex + 1) % paths.length
              const nextPath = paths[currentPathIndex]
              
              // Resetear posición al inicio del nuevo path
              const pathElement = svgRef.current?.querySelector(nextPath) as SVGPathElement
              if (pathElement && dotRef.current) {
                const startPoint = pathElement.getPointAtLength(0)
                gsap.set(dotRef.current, {
                  attr: { cx: startPoint.x, cy: startPoint.y }
                })
                
                // Iniciar nueva animación
                animationRef.current = animatePath(nextPath)
              }
            },
          })

          // Animar el nodo principal (círculo violeta) - asegurar alineación perfecta
          tl.to(dotRef.current, {
            duration: 6,
            ease: "none",
            motionPath: {
              path: pathId,
              align: pathId,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
          }, 0)

          return tl
        }

        // Iniciar con el primer path
        const firstPathElement = svgRef.current?.querySelector(paths[0]) as SVGPathElement
        if (firstPathElement && dotRef.current) {
          const startPoint = firstPathElement.getPointAtLength(0)
          gsap.set(dotRef.current, {
            attr: { cx: startPoint.x, cy: startPoint.y }
          })
          
          animationRef.current = animatePath(paths[0])
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    initAnimation()

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  // Posiciones de los iconos (en porcentaje del viewBox para que sean responsive)
  const centerX = 800
  const centerY = 240
  
  // Líneas izquierdas (3) - Más separadas verticalmente
  const leftIcons = [
    { x: 100, y: 100, icon: MessageSquare, label: "Chat" },
    { x: 100, y: 240, icon: Database, label: "Data" },
    { x: 100, y: 380, icon: Cloud, label: "Cloud" },
  ]

  // Líneas derechas (3) - Más separadas verticalmente y más ancho
  const rightIcons = [
    { x: 1500, y: 100, icon: Zap, label: "AI" },
    { x: 1500, y: 240, icon: BarChart3, label: "Analytics" },
    { x: 1500, y: 380, icon: Settings, label: "Config" },
  ]

  // Generar paths curvos desde los iconos al centro
  const createPath = (startX: number, startY: number, endX: number, endY: number) => {
    const midX = (startX + endX) / 2
    return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`
  }

  // Crear path completo de izquierda a derecha pasando por el centro
  // Usa exactamente los mismos puntos que los paths visuales para alineación perfecta
  const createFullPath = (startX: number, startY: number, centerX: number, centerY: number, endX: number, endY: number) => {
    // Punto de conexión izquierdo (borde del cuadrado)
    const leftConnX = centerX - 80
    const leftConnY = centerY
    // Punto de conexión derecho (borde del cuadrado)
    const rightConnX = centerX + 80
    const rightConnY = centerY
    
    // Puntos de control para la curva izquierda
    const leftMidX = (startX + leftConnX) / 2
    // Puntos de control para la curva derecha
    const rightMidX = (rightConnX + endX) / 2
    
    // Crear path continuo: curva izquierda + línea recta invisible en el centro + curva derecha
    return `M ${startX} ${startY} C ${leftMidX} ${startY}, ${leftMidX} ${leftConnY}, ${leftConnX} ${leftConnY} L ${rightConnX} ${rightConnY} C ${rightMidX} ${rightConnY}, ${rightMidX} ${endY}, ${endX} ${endY}`
  }

  // Calcular posición porcentual para los iconos
  const getIconPosition = (x: number, y: number) => {
    const viewBoxWidth = 1600
    const viewBoxHeight = 480
    return {
      left: `${(x / viewBoxWidth) * 100}%`,
      top: `${(y / viewBoxHeight) * 100}%`,
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 relative">
      <div className="revenanas-graph relative">
        <svg
          ref={svgRef}
          width="100%"
          viewBox="0 0 1600 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* DEFINICIONES DE GRADIENTES Y FILTROS */}
          <defs>
            {/* Filtro para el efecto de luz violeta del nodo */}
            <filter id="glow-violet" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" values="0.71 0.49 0.86 0 0  0.71 0.49 0.86 0 0  0.71 0.49 0.86 0 0  0 0 0 1.5 0"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Filtro para el trail/rastro del nodo */}
            <filter id="trail-blue" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feColorMatrix in="blur" type="matrix" values="0 0.4 1 0 0  0 0.4 1 0 0  0 0.4 1 0 0  0 0 0.4 0 0"/>
            </filter>

            {/* Filtro para el glow del cuadrado central */}
            <filter id="glow-center" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" values="0.71 0.49 0.86 0 0  0.71 0.49 0.86 0 0  0.71 0.49 0.86 0 0  0 0 0 0.8 0"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Gradiente para líneas izquierdas (opaco -> transparente hacia el centro) */}
            {leftIcons.map((icon, index) => {
              const gradientId = `gradient-left-${index}`
              const startX = icon.x + 20
              const startY = icon.y
              const endX = centerX - 80
              const endY = centerY
              return (
                <linearGradient 
                  key={gradientId} 
                  id={gradientId} 
                  x1={startX} 
                  y1={startY} 
                  x2={endX} 
                  y2={endY}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#8E8E8E" stopOpacity="1" />
                  <stop offset="70%" stopColor="#8E8E8E" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8E8E8E" stopOpacity="0.3" />
                </linearGradient>
              )
            })}
            
            {/* Gradiente para líneas derechas (transparente desde el centro -> opaco) */}
            {rightIcons.map((icon, index) => {
              const gradientId = `gradient-right-${index}`
              const startX = centerX + 80
              const startY = centerY
              const endX = icon.x - 20
              const endY = icon.y
              return (
                <linearGradient 
                  key={gradientId} 
                  id={gradientId} 
                  x1={startX} 
                  y1={startY} 
                  x2={endX} 
                  y2={endY}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#8E8E8E" stopOpacity="0.3" />
                  <stop offset="30%" stopColor="#8E8E8E" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8E8E8E" stopOpacity="1" />
                </linearGradient>
              )
            })}
          </defs>

          {/* PATHS DESDE IZQUIERDA AL CENTRO */}
          {leftIcons.map((icon, index) => {
            const pathId = `path-left-${index === 0 ? 'top' : index === 1 ? 'middle' : 'bottom'}`
            const gradientId = `gradient-left-${index}`
            return (
              <path
                key={pathId}
                id={pathId}
                d={createPath(icon.x + 20, icon.y, centerX - 80, centerY)}
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                strokeDasharray="6 10"
                strokeLinecap="round"
              />
            )
          })}

          {/* PATHS DESDE CENTRO A DERECHA */}
          {rightIcons.map((icon, index) => {
            const pathId = `path-right-${index === 0 ? 'top' : index === 1 ? 'middle' : 'bottom'}`
            const gradientId = `gradient-right-${index}`
            return (
              <path
                key={pathId}
                id={pathId}
                d={createPath(centerX + 80, centerY, icon.x - 20, icon.y)}
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                strokeDasharray="6 10"
                strokeLinecap="round"
              />
            )
          })}

          {/* PATHS COMPLETOS PARA LA ANIMACIÓN */}
          {/* Path 1: línea 1 izq -> línea 3 derecha */}
          <path
            id="path-full-1"
            d={createFullPath(
              leftIcons[0].x + 20,
              leftIcons[0].y,
              centerX,
              centerY,
              rightIcons[2].x - 20,
              rightIcons[2].y
            )}
            fill="none"
            stroke="none"
          />
          
          {/* Path 2: línea 2 izq -> línea 1 derecha */}
          <path
            id="path-full-2"
            d={createFullPath(
              leftIcons[1].x + 20,
              leftIcons[1].y,
              centerX,
              centerY,
              rightIcons[0].x - 20,
              rightIcons[0].y
            )}
            fill="none"
            stroke="none"
          />
          
          {/* Path 3: línea 3 izq -> línea 2 derecha */}
          <path
            id="path-full-3"
            d={createFullPath(
              leftIcons[2].x + 20,
              leftIcons[2].y,
              centerX,
              centerY,
              rightIcons[1].x - 20,
              rightIcons[1].y
            )}
            fill="none"
            stroke="none"
          />

          {/* DOT ANIMADO QUE RECORRE EL PATH */}
          <circle 
            id="dot" 
            ref={dotRef} 
            r="8" 
            fill="rgb(181, 126, 220)"
            cx={leftIcons[0].x + 20}
            cy={leftIcons[0].y}
            filter="url(#glow-violet)"
          />

          {/* NODO CENTRAL */}
          {/* Capa de glow violeta */}
          <rect
            x={centerX - 80}
            y={centerY - 80}
            width="160"
            height="160"
            rx="16"
            fill="rgb(181, 126, 220)"
            opacity="0.3"
            filter="url(#glow-center)"
          />
          
          {/* Cuadrado principal */}
          <rect
            x={centerX - 80}
            y={centerY - 80}
            width="160"
            height="160"
            rx="16"
            fill="rgb(181, 126, 220)"
            stroke="rgb(181, 126, 220)"
            strokeWidth="2"
            opacity="0.3"
          />
          
          <image
            href="/image13.png"
            x={centerX - 50}
            y={centerY - 50}
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid meet"
          />

        </svg>

        {/* ICONOS IZQUIERDOS - Posicionados absolutamente sobre el SVG */}
        {leftIcons.map((iconData, index) => {
          const Icon = iconData.icon
          const position = getIconPosition(iconData.x, iconData.y)
          return (
            <div
              key={`left-icon-${index}`}
              className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{
                left: position.left,
                top: position.top,
              }}
              >
              <Icon className="w-10 h-10 text-white" />
            </div>
          )
        })}

        {/* ICONOS DERECHOS - Posicionados absolutamente sobre el SVG */}
        {rightIcons.map((iconData, index) => {
          const Icon = iconData.icon
          const position = getIconPosition(iconData.x, iconData.y)
          return (
            <div
              key={`right-icon-${index}`}
              className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{
                left: position.left,
                top: position.top,
                    }}
            >
              <Icon className="w-10 h-10 text-white" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
