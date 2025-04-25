"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps extends React.ComponentProps<typeof Card> {
  animate?: boolean
  hoverEffect?: boolean
  children: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
}

export function DashboardCard({
  animate = true,
  hoverEffect = true,
  children,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  ...props
}: DashboardCardProps) {
  if (!animate) {
    return (
      <Card className={cn("border-gray-200 dark:border-gray-800", className)} {...props}>
        {children}
      </Card>
    )
  }

  // Find specific children to apply custom classes
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child

    if (child.type === CardHeader) {
      return React.cloneElement(child, {
        className: cn(child.props.className, headerClassName),
      })
    }
    if (child.type === CardContent) {
      return React.cloneElement(child, {
        className: cn(child.props.className, contentClassName),
      })
    }
    if (child.type === CardFooter) {
      return React.cloneElement(child, {
        className: cn(child.props.className, footerClassName),
      })
    }
    return child
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      <Card className={cn("border-gray-200 dark:border-gray-800 shadow-sm", className)} {...props}>
        {childrenWithProps}
      </Card>
    </motion.div>
  )
}

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
