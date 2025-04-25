"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, BookOpen, Award } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedBorderCard, CardContent } from "@/components/ui/animated-border-card"

export default function EducationPage() {
  const education = {
    institution: "Arizona Christian University",
    degree: "Bachelor of Science in Business Administration",
    concentration: "Management",
    minor: "Computer Programming",
    gpa: 3.34,
    startDate: "August 2022",
    endDate: "May 2026 (Expected)",
    courses: {
      business: [
        "Principles of Finance",
        "Principles of Marketing",
        "Principles of Accounting",
        "Business Ethics",
        "Management Principles",
        "Business Law",
      ],
      computerScience: [
        "Programming with Python",
        "Introduction to Cybersecurity",
        "Web Development",
        "Programming with Python and SQL",
        "Data Structures and Algorithms",
        "Database Management",
      ],
    },
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
              <GradientText>Education</GradientText>
            </h1>
            <p className="text-xl text-gray-300">My academic journey and qualifications</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatedBorderCard>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="h-8 w-8 text-gray-700 dark:text-gray-300 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{education.institution}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Degree</h3>
                      <p className="text-gray-900 dark:text-white font-medium">{education.degree}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</h3>
                      <p className="text-gray-900 dark:text-white font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {education.startDate} - {education.endDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Concentration</h3>
                      <p className="text-gray-900 dark:text-white font-medium">{education.concentration}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Minor</h3>
                      <p className="text-gray-900 dark:text-white font-medium">{education.minor}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">GPA</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {education.gpa.toFixed(2)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/4.0</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Academic Progress</h3>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Completion</span>
                        <span className="text-gray-700 dark:text-gray-300">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gray-900 dark:bg-gray-300 h-full rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AnimatedBorderCard>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <AnimatedBorderCard>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <BookOpen className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-2" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Business Coursework</h3>
                    </div>
                    <ul className="space-y-3">
                      {education.courses.business.map((course, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <svg
                              className="h-3 w-3 text-gray-700 dark:text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </AnimatedBorderCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <AnimatedBorderCard>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Award className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-2" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Computer Science Coursework</h3>
                    </div>
                    <ul className="space-y-3">
                      {education.courses.computerScience.map((course, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <svg
                              className="h-3 w-3 text-gray-700 dark:text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </AnimatedBorderCard>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                My unique combination of business administration and computer programming education positions me to
                excel in roles that bridge the gap between business strategy and technical implementation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
