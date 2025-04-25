"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Award } from "lucide-react"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"
import { FloatingImage } from "@/components/ui/floating-image"

const achievements = [
  {
    id: "fbla-finance",
    title: "FBLA Finance Champion",
    description:
      "Secured first place in Finance at the 2023 FBLA collegiate state conference, demonstrating exceptional financial analysis skills and business acumen.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kNznS07crhzhnA0MElYwU2nw6JDIHy.png",
    badge: "Gold Medal",
  },
  {
    id: "fbla-marketing",
    title: "Marketing Recognition",
    description:
      "Received bronze medal in General Marketing, showing proficiency in developing and implementing effective marketing strategies.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aJxPjlLHcUrWVcz1fbxoA6xxXgBtgN.png",
    badge: "Bronze Medal",
  },
]

export function AchievementsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextAchievement = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length)
  }

  const prevAchievement = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length)
  }

  const achievement = achievements[currentIndex]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            <GradientText>Award-Winning Achievements</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Recognitions that showcase my dedication to excellence in business and finance
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Badge className="bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 mb-2">
              {achievement.badge}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
            <div className="flex space-x-4 pt-4">
              <InteractiveButton
                variant="outline"
                size="icon"
                onClick={prevAchievement}
                aria-label="Previous achievement"
              >
                <ChevronLeft className="h-5 w-5" />
              </InteractiveButton>
              <InteractiveButton variant="outline" size="icon" onClick={nextAchievement} aria-label="Next achievement">
                <ChevronRight className="h-5 w-5" />
              </InteractiveButton>
            </div>
            <div className="pt-4">
              <InteractiveButton asChild>
                <Link href="/achievements">
                  <Award className="mr-2 h-4 w-4" /> View All Achievements
                </Link>
              </InteractiveButton>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <FloatingImage
                src={achievement.image}
                alt={achievement.title}
                width={500}
                height={400}
                className="rounded-lg shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
