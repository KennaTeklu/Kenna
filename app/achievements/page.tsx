"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Medal, Trophy } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedBorderCard, CardContent } from "@/components/ui/animated-border-card"

export default function AchievementsPage() {
  const achievements = [
    {
      title: "FBLA Finance Champion",
      description:
        "Secured first place in Finance at the 2023 FBLA collegiate state conference, demonstrating exceptional financial analysis skills and business acumen.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kNznS07crhzhnA0MElYwU2nw6JDIHy.png",
      badge: "Gold Medal",
      icon: Trophy,
    },
    {
      title: "Hospitality Management Winner",
      description:
        "Won the gold medal in Hospitality Management, showcasing versatile business skills across different sectors and management capabilities.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4nPa0p4Vf7mjBYdB1zRYsp21jXT87A.png",
      badge: "Gold Medal",
      icon: Trophy,
    },
    {
      title: "Sports Management Excellence",
      description:
        "Earned silver medal in Sports Management/Marketing, demonstrating strong understanding of sports business operations and marketing strategies.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bOMW36PoGNU7YRYVC0JJJpad6nvt1u.png",
      badge: "Silver Medal",
      icon: Medal,
    },
    {
      title: "Marketing Recognition",
      description:
        "Received bronze medal in General Marketing, showing proficiency in developing and implementing effective marketing strategies.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aJxPjlLHcUrWVcz1fbxoA6xxXgBtgN.png",
      badge: "Bronze Medal",
      icon: Award,
    },
  ]

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
              <GradientText>Achievements</GradientText>
            </h1>
            <p className="text-xl text-gray-300">
              Recognitions that showcase my dedication to excellence in business and finance
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AnimatedBorderCard>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <div className="relative h-48 md:h-full w-full rounded-lg overflow-hidden">
                            <Image
                              src={achievement.image || "/placeholder.svg"}
                              alt={achievement.title}
                              fill
                              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                              <achievement.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div>
                              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 mb-2">
                                {achievement.badge}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>
                          <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                              Skills Demonstrated:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {achievement.title.includes("Finance") && (
                                <>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Financial Analysis
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Business Acumen
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Critical Thinking
                                  </span>
                                </>
                              )}
                              {achievement.title.includes("Hospitality") && (
                                <>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Management
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Customer Service
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Operations
                                  </span>
                                </>
                              )}
                              {achievement.title.includes("Sports") && (
                                <>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Sports Business
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Marketing Strategy
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Market Analysis
                                  </span>
                                </>
                              )}
                              {achievement.title.includes("Marketing") && (
                                <>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Marketing
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Brand Strategy
                                  </span>
                                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                    Market Research
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </AnimatedBorderCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Business Excellence</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                These achievements demonstrate my ability to excel in competitive business environments and apply
                theoretical knowledge to practical scenarios. My analytical thinking, problem-solving skills, and
                attention to detail make me well-suited for roles in the business field that require both strategic
                thinking and execution excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
