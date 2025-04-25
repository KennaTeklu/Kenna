"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Send, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { AnimatedBorderCard } from "@/components/ui/animated-border-card"
import { GradientText } from "@/components/ui/gradient-text"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Modify the message to include kenna.mba prefix and format as a phone message
      const formData = {
        name: values.name,
        email: values.email,
        phone: "phone-message", // This is the key change to make it work with the backend
        message: `kenna.mba ${values.message}`,
      }

      // Google Apps Script URL
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxSSfjUlwZ97Y0iQnagSRH7VxMz-oRSSvQ0bXU5Le1abfULTngJ_BFAQg7c4428DmaK/exec"

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I will get back to you soon.",
      })

      // Create email template
      const emailSubject = `Message from ${values.name} via Portfolio`
      const emailBody = `Hello ${values.name},\n\n${values.message}\n\nBest regards,\nKenna Teklu\nhire@kenna.mba | hire@kennateklu.com`

      // Open email client with pre-filled message
      const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink)

      form.reset()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="pt-20 pb-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>Get In Touch</GradientText>
            </h1>
            <p className="text-xl text-gray-300">
              I'd love to hear from you! Whether you're a recruiter, potential collaborator, or just want to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Feel free to reach out through any of the following channels. I'm always open to discussing new
                opportunities, projects, or answering any questions you might have.
              </p>

              <div className="space-y-6">
                <AnimatedBorderCard interactive={false}>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">hire@kenna.mba</p>
                      <p className="text-gray-600 dark:text-gray-400">hire@kennateklu.com</p>
                    </div>
                  </CardContent>
                </AnimatedBorderCard>

                <AnimatedBorderCard interactive={false}>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">GitHub</h3>
                      <a
                        href="https://github.com/KennaTeklu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        github.com/KennaTeklu
                      </a>
                    </div>
                  </CardContent>
                </AnimatedBorderCard>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Send Me a Message</h2>
              <AnimatedBorderCard>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message here..." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full interactive-button" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </AnimatedBorderCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
