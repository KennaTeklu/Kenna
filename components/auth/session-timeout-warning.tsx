"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSessionTimeout } from "@/lib/hooks/useSessionTimeout"

export function SessionTimeoutWarning() {
  const { isWarningVisible, resetTimer } = useSessionTimeout(30) // 30 minutes timeout
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isWarningVisible) {
      setCountdown(60)
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isWarningVisible])

  if (!isWarningVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-900/20">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Session Timeout Warning</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">Your session will expire in {countdown} seconds due to inactivity.</p>
          <Button onClick={resetTimer} variant="outline" className="w-full">
            Stay Logged In
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
