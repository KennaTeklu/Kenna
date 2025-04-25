"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award, BookOpen, Briefcase, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { FloatingImage } from "@/components/ui/floating-image"
import { HeroSection } from "@/components/sections/hero-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { SectionHeading } from "@/components/ui/section-heading"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { SkillsShowcase } from "@/components/sections/skills-showcase"

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Professional Profile"
            subtitle="A glimpse into my achievements, skills, and experiences"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">FBLA Champion</h3>
                  <p className="text-slate-600 mb-4">
                    Ranked first in Finance at the 2023 FBLA collegiate state conference, putting Arizona Christian
                    University on the map.
                  </p>
                  <div className="mt-auto pt-4">
                    <Button asChild variant="link" className="text-purple-700">
                      <Link href="/achievements">
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Dual Expertise</h3>
                  <p className="text-slate-600 mb-4">
                    Combining Business Administration with Computer Programming for a unique skill set that bridges
                    technology and business.
                  </p>
                  <div className="mt-auto pt-4">
                    <Button asChild variant="link" className="text-blue-700">
                      <Link href="/skills">
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Practical Experience</h3>
                  <p className="text-slate-600 mb-4">
                    Real-world experience at Crosswinds Presbyterian Church, applying technical skills in a professional
                    environment.
                  </p>
                  <div className="mt-auto pt-4">
                    <Button asChild variant="link" className="text-green-700">
                      <Link href="/experience">
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <SkillsShowcase />

      <AchievementsSection />

      <PortfolioSection />

      <TestimonialsSection />

      <ParallaxSection className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={3.4} suffix="" />
              </h3>
              <p className="text-purple-200">GPA</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={1} suffix="st" />
              </h3>
              <p className="text-purple-200">Place in Finance</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={2} suffix="+" />
              </h3>
              <p className="text-purple-200">Years Experience</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold mb-2">
                <AnimatedCounter end={5} suffix="+" />
              </h3>
              <p className="text-purple-200">Programming Languages</p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Featured Achievements</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Showcasing my proudest moments and accomplishments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-2">FBLA Championship</Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                First Place in Finance at FBLA State Conference
              </h3>
              <p className="text-slate-600">
                Led Arizona Christian University to victory at the 2023 FBLA collegiate state conference, securing gold
                medals in Finance and bronze medals in General Marketing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Gold Medal in Finance</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Bronze Medal in General Marketing</span>
                </li>
              </ul>
              <Button asChild className="bg-purple-700 hover:bg-purple-800 mt-4">
                <Link href="/achievements">View All Achievements</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <FloatingImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kNznS07crhzhnA0MElYwU2nw6JDIHy.png"
                  alt="FBLA Team with Medals"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
                <FloatingImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4nPa0p4Vf7mjBYdB1zRYsp21jXT87A.png"
                  alt="FBLA Team"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg mt-8"
                />
                <FloatingImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bOMW36PoGNU7YRYVC0JJJpad6nvt1u.png"
                  alt="FBLA Team with Medals"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg mt-4"
                />
                <FloatingImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aJxPjlLHcUrWVcz1fbxoA6xxXgBtgN.png"
                  alt="Competition Medals"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Ready to Connect?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you're a recruiter looking for talent or someone interested in collaboration, I'd love to hear
              from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" /> Get In Touch
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
