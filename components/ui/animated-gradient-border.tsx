"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  borderWidth?: number
  borderRadius?: number
  duration?: number
  colors?: string[]
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  borderWidth = 2,
  borderRadius = 8,
  duration = 8,
  colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899"],
}: AnimatedGradientBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let startTime: number

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawGradientBorder = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradientAngle = (((elapsed / 1000) % duration) / duration) * 2 * Math.PI
      const x1 = canvas.width / 2 + Math.cos(gradientAngle) * canvas.width
      const y1 = canvas.height / 2 + Math.sin(gradientAngle) * canvas.height
      const x2 = canvas.width / 2 + Math.cos(gradientAngle + Math.PI) * canvas.width
      const y2 = canvas.height / 2 + Math.sin(gradientAngle + Math.PI) * canvas.height

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color)
      })

      // Draw rounded rectangle
      ctx.strokeStyle = gradient
      ctx.lineWidth = borderWidth

      const x = borderWidth / 2
      const y = borderWidth / 2
      const width = canvas.width - borderWidth
      const height = canvas.height - borderWidth
      const radius = borderRadius

      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.stroke()

      animationFrameId = requestAnimationFrame(drawGradientBorder)
    }

    animationFrameId = requestAnimationFrame(drawGradientBorder)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [borderWidth, borderRadius, duration, colors])

  return (
    <div className={cn("relative", containerClassName)}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ borderRadius }} />
      <div className={cn("relative z-10", className)} style={{ padding: borderWidth }}>
        {children}
      </div>
    </div>
  )
}
