"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AnimatedBorderCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
  className?: string
  gradientColors?: string[]
  borderWidth?: number
  interactive?: boolean
}

export function AnimatedBorderCard({
  children,
  className,
  gradientColors = ["#333", "#777", "#333"],
  borderWidth = 1,
  interactive = true,
  ...props
}: AnimatedBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const rotateX = useTransform(y, [-100, 100], [2, -2])
  const rotateY = useTransform(x, [-100, 100], [-2, 2])

  const gradientX = useTransform(x, [-100, 100], [0, 1])
  const gradientY = useTransform(y, [-100, 100], [0, 1])

  useEffect(() => {
    if (!ref.current || !interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [interactive, mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      style={
        interactive
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      whileHover={{ scale: interactive ? 1.01 : 1 }}
      className={cn("relative perspective-1000", className)}
    >
      <motion.div
        className="absolute inset-0 rounded-lg z-0"
        style={{
          background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
          backgroundSize: "200% 200%",
          backgroundPosition: interactive ? `${gradientX.get() * 100}% ${gradientY.get() * 100}%` : "0% 0%",
          opacity: 0.3,
          filter: "blur(8px)",
        }}
        animate={{
          backgroundPosition: interactive ? undefined : ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={interactive ? {} : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <Card
        className={cn("bg-white/80 dark:bg-black/80 backdrop-blur-sm border-0 relative shadow-xl", className)}
        style={{ borderWidth }}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
}

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
