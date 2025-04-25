"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: string
  content: string
  author: {
    name: string
    title: string
    company: string
    image?: string
  }
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: "1",
      content:
        "Kenna's unique combination of business acumen and technical skills makes them a standout candidate. Their ability to bridge the gap between business strategy and technical implementation is exactly what modern organizations need.",
      author: {
        name: "Dr. Sarah Johnson",
        title: "Professor of Business Administration",
        company: "Arizona Christian University",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "2",
      content:
        "Working with Kenna on our technical team has been a pleasure. They bring a fresh perspective that combines business thinking with technical problem-solving, which has been invaluable for our organization.",
      author: {
        name: "Michael Chen",
        title: "Technical Director",
        company: "Crosswinds Presbyterian Church",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "3",
      content:
        "Kenna's performance in the FBLA competition demonstrated exceptional analytical skills and financial knowledge. Their ability to present complex financial concepts clearly and persuasively is remarkable.",
      author: {
        name: "Lisa Rodriguez",
        title: "FBLA State Advisor",
        company: "Arizona FBLA",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeading title="What People Say" subtitle="Testimonials from professors, colleagues, and mentors" />

        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="absolute top-0 left-0 -ml-8 -mt-8 text-gray-200 dark:text-gray-800">
            <Quote className="h-16 w-16 opacity-50" />
          </div>

          <motion.div
            key={testimonials[activeIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Card className="border-none shadow-lg bg-gray-50 dark:bg-gray-800/50">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-8">
                  "{testimonials[activeIndex].content}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    {testimonials[activeIndex].author.image ? (
                      <AvatarImage
                        src={testimonials[activeIndex].author.image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].author.name}
                      />
                    ) : (
                      <AvatarFallback>{testimonials[activeIndex].author.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].author.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[activeIndex].author.title}, {testimonials[activeIndex].author.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
