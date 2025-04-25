"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedBorderCard, CardContent } from "@/components/ui/animated-border-card"

export default function ExperiencePage() {
  const experiences = [
    {
      title: "Technical Team Member",
      company: "Crosswinds Presbyterian Church",
      location: "Glendale, Arizona",
      period: "September 2022 - Present",
      description: [
        "Assist with setup and recording of church services and events",
        "Manage audio-visual equipment and troubleshoot technical issues",
        "Collaborate with team members to ensure smooth execution of services",
        "Apply technical skills in a real-world environment",
      ],
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
              <GradientText>Professional Experience</GradientText>
            </h1>
            <p className="text-xl text-gray-300">
              My journey in applying technical and business skills in real-world environments
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AnimatedBorderCard>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                          <p className="text-xl text-gray-700 dark:text-gray-300">{exp.company}</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <div className="flex items-center mb-4 text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{exp.location}</span>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Responsibilities:</h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                          {exp.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </AnimatedBorderCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Looking for New Opportunities</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                I am actively seeking opportunities in the business field where I can apply my unique combination of
                business administration knowledge and technical skills to drive organizational success.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  className="interactive-button bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  <a href="/contact">
                    <Briefcase className="mr-2 h-4 w-4" /> Discuss Opportunities
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
