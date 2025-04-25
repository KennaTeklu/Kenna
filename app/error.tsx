"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md border-red-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-center text-red-700">Something went wrong</CardTitle>
          <CardDescription className="text-center">
            We encountered an error while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            This could be due to a temporary issue or a problem with your session. Please try again or contact support
            if the issue persists.
          </p>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-100 dark:border-red-900/30">
            <p className="text-xs text-red-700 dark:text-red-400 font-mono">Error reference: {error.digest}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={reset} className="w-full bg-red-600 hover:bg-red-700">
            Try again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
            Return to homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
