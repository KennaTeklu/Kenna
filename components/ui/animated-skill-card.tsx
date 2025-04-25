"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  name: string
  icon: React.ReactNode
  description: string
}

interface AnimatedSkillCardProps {
  skills: Skill[]
  interval?: number
}

export function AnimatedSkillCard({ skills, interval = 5000 }: AnimatedSkillCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length)
    }, interval)

    return () => clearInterval(timer)
  }, [skills.length, interval])

  return (
    <Card className="overflow-hidden h-[200px] relative">
      <CardContent className="p-6 h-full flex flex-col justify-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 p-6 flex flex-col justify-center"
        >
          <div className="flex items-center mb-4">
            <div className="mr-3 text-purple-600">{skills[currentIndex].icon}</div>
            <h3 className="text-xl font-bold">{skills[currentIndex].name}</h3>
          </div>
          <p className="text-slate-600">{skills[currentIndex].description}</p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
