"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Mail } from "lucide-react"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { Badge } from "@/components/ui/badge"
import { AnimatedText } from "@/components/ui/animated-text"
import { GradientText } from "@/components/ui/gradient-text"

const skills = [
  { name: "Leadership", color: "border-gray-300" },
  { name: "Problem Solving", color: "border-gray-300" },
  { name: "Finance", color: "border-gray-300" },
  { name: "Marketing", color: "border-gray-300" },
  { name: "Web Development", color: "border-gray-300" },
  { name: "Python", color: "border-gray-300" },
]

export function HeroSection() {
  const [typingText, setTypingText] = useState("Business Administration")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    const texts = [
      "Business Administration",
      "Finance Champion",
      "Computer Programming",
      "Problem Solver",
      "Future Leader",
    ]

    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length
      setTypingText(texts[currentIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 dark:bg-gray-800/50 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 dark:bg-gray-800/50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="flex flex-col items-center text-center" style={{ opacity, y }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl relative">
              <Image src="/profile-picture.jpg" alt="Kenna Teklu" fill className="object-cover" priority />
            </div>
            <motion.div
              className="absolute -inset-1 rounded-full opacity-20 blur-sm"
              animate={{
                background: [
                  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  "linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            <GradientText gradient="from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100">
              Kenna Teklu
            </GradientText>
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl font-light mb-6 text-gray-700 dark:text-gray-300 h-8"
          >
            <AnimatedText text={typingText} className="inline-block" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {skills.map((skill) => (
              <Badge
                key={skill.name}
                className="bg-white/80 text-gray-800 hover:bg-white border-gray-300 dark:bg-gray-800/80 dark:text-gray-200 dark:border-gray-700"
                variant="outline"
              >
                {skill.name}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <InteractiveButton asChild size="lg">
              <Link href="/about">Explore My Profile</Link>
            </InteractiveButton>
            <InteractiveButton
              asChild
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Link>
            </InteractiveButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }}
        >
          <ArrowDown className="h-8 w-8 text-gray-700 dark:text-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  )
}
