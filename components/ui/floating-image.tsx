"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

interface FloatingImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function FloatingImage({ src, alt, width, height, className = "" }: FloatingImageProps) {
  const controls = useAnimation()
  const [randomOffset, setRandomOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const generateRandomMovement = () => {
      const newX = Math.random() * 10 - 5
      const newY = Math.random() * 10 - 5
      setRandomOffset({ x: newX, y: newY })

      controls.start({
        x: newX,
        y: newY,
        transition: { duration: 3, ease: "easeInOut" },
      })
    }

    generateRandomMovement()
    const interval = setInterval(generateRandomMovement, 3000)

    return () => clearInterval(interval)
  }, [controls])

  return (
    <motion.div animate={controls} className={className} whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
      <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className="rounded-lg shadow-lg" />
    </motion.div>
  )
}
