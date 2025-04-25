"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("max-w-3xl mb-12", alignmentClasses[alignment], className)}
    >
      <h2 className={cn("text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white", titleClassName)}>
        {title}
      </h2>
      {subtitle && <p className={cn("text-lg text-slate-600 dark:text-slate-400", subtitleClassName)}>{subtitle}</p>}
    </motion.div>
  )
}
