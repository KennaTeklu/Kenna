"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/lib/supabase/client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Eye, EyeOff, Github, Mail, Shield, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Enhanced password validation
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: passwordSchema.optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
})

interface AuthFormProps {
  inModal?: boolean
}

export function AuthForm({ inModal = false }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "magic">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimer, setBlockTimer] = useState(0)
  const router = useRouter()
  const supabase = supabaseClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      acceptTerms: false,
    },
  })

  // Password strength calculator
  useEffect(() => {
    const password = form.watch("password") || ""
    let strength = 0

    if (password.length >= 8) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/[a-z]/.test(password)) strength += 20
    if (/[0-9]/.test(password)) strength += 20
    if (/[^A-Za-z0-9]/.test(password)) strength += 20

    setPasswordStrength(strength)
  }, [form.watch("password")])

  // Block timer countdown
  useEffect(() => {
    if (blockTimer > 0) {
      const interval = setInterval(() => {
        setBlockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsBlocked(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [blockTimer])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isBlocked) return

    setIsLoading(true)

    try {
      // Rate limiting for login attempts
      if (authMode === "signin") {
        setLoginAttempts((prev) => prev + 1)

        if (loginAttempts >= 4) {
          setIsBlocked(true)
          setBlockTimer(30) // Block for 30 seconds
          toast({
            title: "Too many attempts",
            description: "Please try again after 30 seconds",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }
      }

      if (authMode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({
          email: values.email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        toast({
          title: "Check your email",
          description: "We sent you a login link. Be sure to check your spam folder.",
        })
      } else if (authMode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password || "",
        })

        if (error) throw error

        router.push("/dashboard")
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password || "",
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              signup_date: new Date().toISOString(),
              last_login: new Date().toISOString(),
            },
          },
        })

        if (error) throw error

        toast({
          title: "Check your email",
          description: "We sent you a confirmation link. Be sure to check your spam folder.",
        })
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 20) return "bg-red-500"
    if (passwordStrength <= 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className={inModal ? "" : "relative min-h-screen flex items-center justify-center p-4"}>
      {!inModal && <AnimatedBackground className="opacity-20" />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${inModal ? "" : "max-w-md z-10"}`}
      >
        <Card className={`border-purple-200 shadow-xl ${inModal ? "" : "bg-white/90 backdrop-blur-sm"}`}>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-purple-900">
              {authMode === "signin" ? "Welcome Back" : authMode === "signup" ? "Create Account" : "Magic Link Access"}
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to view Kenna Teklu's exclusive content for recruiters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => setAuthMode(value as any)}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="magic">Magic Link</TabsTrigger>
              </TabsList>

              {isBlocked && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Too many login attempts. Please try again in {blockTimer} seconds.
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="you@example.com" {...field} className="pl-10" />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {authMode !== "magic" && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                                className="pl-10 pr-10"
                              />
                              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </FormControl>
                          {authMode === "signup" && field.value && (
                            <>
                              <Progress value={passwordStrength} className={getPasswordStrengthColor()} />
                              <p className="text-xs text-gray-500 mt-1">
                                {passwordStrength <= 20
                                  ? "Very weak password"
                                  : passwordStrength <= 40
                                    ? "Weak password"
                                    : passwordStrength <= 60
                                      ? "Moderate password"
                                      : passwordStrength <= 80
                                        ? "Strong password"
                                        : "Very strong password"}
                              </p>
                            </>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {authMode === "signup" && (
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I accept the{" "}
                              <a href="/terms" className="text-purple-600 hover:underline">
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a href="/privacy" className="text-purple-600 hover:underline">
                                Privacy Policy
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-800"
                    disabled={isLoading || isBlocked}
                  >
                    {isLoading
                      ? "Processing..."
                      : authMode === "signin"
                        ? "Sign In"
                        : authMode === "signup"
                          ? "Sign Up"
                          : "Send Magic Link"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-slate-900 px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      setIsLoading(true)
                      try {
                        const { error } = await supabase.auth.signInWithOAuth({
                          provider: "github",
                          options: {
                            redirectTo: `${window.location.origin}/auth/callback`,
                          },
                        })
                        if (error) throw error
                      } catch (error) {
                        toast({
                          title: "Authentication error",
                          description: (error as Error).message,
                          variant: "destructive",
                        })
                      } finally {
                        setIsLoading(false)
                      }
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                </form>
              </Form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-slate-500">Protected area for recruiters and authorized personnel</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
