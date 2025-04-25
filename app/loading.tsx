"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loading() {
  const [text, setText] = useState("")
  const fullName = "Kenna Teklu"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setText(fullName.substring(0, index + 1))
      index++

      if (index >= fullName.length) {
        clearInterval(interval)

        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white loading-text">{text}</h1>
        <div className="mt-8">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-16 h-1 bg-gray-800 dark:bg-gray-200 mx-auto rounded-full"
          />
        </div>
      </motion.div>
    </div>
  )
}
