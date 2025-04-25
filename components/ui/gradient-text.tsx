"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
  animate?: boolean
  weight?: "normal" | "medium" | "semibold" | "bold"
  as?: React.ElementType
}

export function GradientText({
  children,
  className,
  gradient = "from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100",
  animate = true,
  weight = "bold",
  as: Component = "span",
}: GradientTextProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const fontWeight = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  const baseClasses = cn("bg-clip-text text-transparent bg-gradient-to-r", gradient, fontWeight[weight], className)

  if (!animate) {
    return <Component className={baseClasses}>{children}</Component>
  }

  return (
    <motion.div ref={ref} className="inline-block">
      <motion.span
        className={baseClasses}
        style={{
          backgroundSize: "200% 200%",
        }}
        initial={{ backgroundPosition: "0% 50%" }}
        animate={
          inView
            ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : { backgroundPosition: "0% 50%" }
        }
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}
