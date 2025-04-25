"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, GraduationCap, Briefcase, Award, Download, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedBorderCard, CardContent as AnimatedContent } from "@/components/ui/animated-border-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // This would come from a real API in a production app
  const candidateData = {
    name: "Kenna Teklu",
    email: "kennateklu@gmail.com",
    location: "Glendale, Arizona",
    education: {
      institution: "Arizona Christian University",
      degree: "Bachelor of Science in Business Administration",
      concentration: "Management",
      minor: "Computer Programming",
      gpa: 3.34,
      startDate: "August 2022",
      endDate: "May 2026 (Expected)",
    },
    skills: [
      { name: "Financial Analysis", level: 90 },
      { name: "Business Strategy", level: 85 },
      { name: "Marketing", level: 80 },
      { name: "Python Programming", level: 75 },
      { name: "Web Development", level: 70 },
      { name: "Data Analysis", level: 80 },
    ],
    achievements: [
      { name: "FBLA Finance Champion", date: "2023" },
      { name: "Hospitality Management Gold Medal", date: "2023" },
      { name: "Sports Management Silver Medal", date: "2023" },
      { name: "General Marketing Bronze Medal", date: "2023" },
    ],
    availability: {
      status: "Available for opportunities",
      preferredRoles: ["Business Analyst", "Financial Analyst", "Marketing Specialist"],
      relocation: "Open to relocation",
      startDate: "June 2026 (After graduation)",
    },
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <AnimatedBorderCard gradientColors={["#333", "#777", "#333"]} className="mb-8" interactive={false}>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">{candidateData.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" /> {candidateData.location}
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700">
                {candidateData.availability.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <GraduationCap className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Education</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{candidateData.education.degree}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Briefcase className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Experience</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Technical Team Member</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Award className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Achievements</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {candidateData.achievements.length} FBLA Awards
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center mb-4 md:mb-0">
              <Calendar className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Availability</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{candidateData.availability.startDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Relocation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{candidateData.availability.relocation}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <InteractiveButton className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download Full Profile
          </InteractiveButton>
        </CardFooter>
      </AnimatedBorderCard>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>
                <GradientText gradient="from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100">
                  Candidate Overview
                </GradientText>
              </CardTitle>
              <CardDescription>Key information about Kenna Teklu's qualifications and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">GPA</h4>
                      <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                        <AnimatedCounter end={3.34} duration={2} />
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Awards</h4>
                      <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                        <AnimatedCounter end={4} duration={2} />
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Years Experience</h4>
                      <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                        <AnimatedCounter end={2} duration={2} />
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Skills</h4>
                      <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                        <AnimatedCounter end={6} duration={2} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferred Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.availability.preferredRoles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
                  <div className="space-y-4">
                    {candidateData.achievements.map((achievement) => (
                      <div key={achievement.name} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                          <Award className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{achievement.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <AnimatedBorderCard gradientColors={["#333", "#777", "#333"]} interactive={false}>
            <CardHeader>
              <CardTitle>
                <GradientText gradient="from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100">
                  Skills Assessment
                </GradientText>
              </CardTitle>
              <CardDescription>Detailed breakdown of Kenna's technical and business skills</CardDescription>
            </CardHeader>
            <AnimatedContent>
              <div className="space-y-6">
                {candidateData.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gray-900 dark:bg-gray-300 h-full rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </AnimatedBorderCard>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>
                <GradientText gradient="from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100">
                  Educational Background
                </GradientText>
              </CardTitle>
              <CardDescription>Academic qualifications and coursework</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-6 w-6 text-gray-700 dark:text-gray-300 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {candidateData.education.institution}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Degree</h4>
                      <p className="text-gray-900 dark:text-white">{candidateData.education.degree}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</h4>
                      <p className="text-gray-900 dark:text-white">
                        {candidateData.education.startDate} - {candidateData.education.endDate}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Concentration</h4>
                      <p className="text-gray-900 dark:text-white">{candidateData.education.concentration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Minor</h4>
                      <p className="text-gray-900 dark:text-white">{candidateData.education.minor}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/30 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">GPA</h4>
                    <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      {candidateData.education.gpa}/4.0
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Relevant Coursework</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Business</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Principles of Finance</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Principles of Marketing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Principles of Accounting</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Business Ethics</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Computer Science</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Programming with Python</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Introduction to Cybersecurity</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Web Development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-gray-700 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Programming with Python and SQL</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
