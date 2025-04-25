"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [hasAnimated, setHasAnimated] = useLocalStorage("theme-toggle-animated", false)

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true)
    }
  }, [hasAnimated, setHasAnimated])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-9 w-9 rounded-full"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <motion.div
              initial={hasAnimated ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-gray-400 hover:text-gray-100" />
              ) : (
                <Sun className="h-5 w-5 text-gray-400 hover:text-gray-900" />
              )}
            </motion.div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
