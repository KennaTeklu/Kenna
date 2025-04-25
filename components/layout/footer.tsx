"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const router = useRouter()

  // Reset click count after 3 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastClickTime > 3000) {
        setClickCount(0)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [lastClickTime])

  const handleCopyrightClick = () => {
    const now = Date.now()
    setLastClickTime(now)
    setClickCount((prev) => prev + 1)

    // If clicked 7 times, navigate to secret page
    if (clickCount === 6) {
      router.push("/secret-chat")
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <GradientText gradient="from-gray-100 via-gray-400 to-gray-100">Kenna Teklu</GradientText>
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Business Administration & Computer Programming
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="mailto:hire@kenna.mba"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/kenna-teklu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/KennaTeklu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>

          <div>
            <motion.h3
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-400 hover:text-white transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-gray-400 hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-gray-400 hover:text-white transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h3
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Interested in working together? Feel free to contact me for any project or collaboration.
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-flex items-center text-gray-300 hover:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              Contact me <ExternalLink className="ml-1 h-4 w-4" />
            </motion.a>
          </div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p>
            <span onClick={handleCopyrightClick} className="cursor-default" style={{ userSelect: "none" }}>
              &copy;
            </span>{" "}
            {currentYear} Kenna Teklu. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
