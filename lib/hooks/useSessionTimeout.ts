"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function useSessionTimeout(timeoutMinutes = 30) {
  const [lastActivity, setLastActivity] = useState<number>(Date.now())
  const [isWarningVisible, setIsWarningVisible] = useState<boolean>(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const TIMEOUT_MS = timeoutMinutes * 60 * 1000
  const WARNING_MS = 60 * 1000 // Show warning 1 minute before timeout

  // Reset the timer when user interacts with the page
  const resetTimer = () => {
    setLastActivity(Date.now())
    setIsWarningVisible(false)
  }

  // Log the user out
  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/login?timeout=true")
    router.refresh()
  }

  useEffect(() => {
    // Events that reset the timer
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })

    // Check for inactivity
    const intervalId = setInterval(() => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivity

      // Show warning before timeout
      if (timeSinceLastActivity > TIMEOUT_MS - WARNING_MS && !isWarningVisible) {
        setIsWarningVisible(true)
      }

      // Log out after timeout
      if (timeSinceLastActivity > TIMEOUT_MS) {
        logout()
      }
    }, 10000) // Check every 10 seconds

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
      clearInterval(intervalId)
    }
  }, [lastActivity, isWarningVisible])

  return { isWarningVisible, resetTimer }
}
