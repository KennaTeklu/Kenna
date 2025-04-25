"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, LineChart, Briefcase, Users } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SkillCategory {
  id: string
  name: string
  icon: React.ElementType
  description: string
  skills: {
    name: string
    level: number
    description: string
  }[]
}

export function SkillsShowcase() {
  const [activeTab, setActiveTab] = useState("business")

  const skillCategories: SkillCategory[] = [
    {
      id: "business",
      name: "Business Skills",
      icon: Briefcase,
      description: "Core business administration and management capabilities",
      skills: [
        {
          name: "Financial Analysis",
          level: 90,
          description: "Proficient in analyzing financial statements, forecasting, and financial modeling",
        },
        {
          name: "Strategic Planning",
          level: 85,
          description: "Experienced in developing business strategies and implementation plans",
        },
        {
          name: "Marketing",
          level: 80,
          description: "Skilled in market research, campaign planning, and brand development",
        },
        {
          name: "Project Management",
          level: 75,
          description: "Capable of managing projects from inception to completion with attention to detail",
        },
        {
          name: "Business Communication",
          level: 85,
          description: "Excellent written and verbal communication skills for business contexts",
        },
      ],
    },
    {
      id: "technical",
      name: "Technical Skills",
      icon: Code,
      description: "Programming and technical capabilities",
      skills: [
        {
          name: "Python",
          level: 80,
          description: "Proficient in Python programming for data analysis and automation",
        },
        {
          name: "Web Development",
          level: 75,
          description: "Experience with HTML, CSS, JavaScript, and modern frameworks",
        },
        {
          name: "SQL",
          level: 70,
          description: "Capable of writing complex queries and database management",
        },
        {
          name: "Data Visualization",
          level: 75,
          description: "Skilled in creating insightful visualizations using various tools",
        },
        {
          name: "Version Control",
          level: 65,
          description: "Familiar with Git and collaborative development workflows",
        },
      ],
    },
    {
      id: "analytical",
      name: "Analytical Skills",
      icon: LineChart,
      description: "Data analysis and problem-solving capabilities",
      skills: [
        {
          name: "Data Analysis",
          level: 85,
          description: "Strong ability to analyze complex datasets and extract insights",
        },
        {
          name: "Critical Thinking",
          level: 90,
          description: "Excellent problem-solving and logical reasoning abilities",
        },
        {
          name: "Statistical Analysis",
          level: 75,
          description: "Experience with statistical methods and their application",
        },
        {
          name: "Research",
          level: 80,
          description: "Skilled in conducting thorough research and synthesizing findings",
        },
        {
          name: "Decision Making",
          level: 85,
          description: "Capable of making data-driven decisions in complex situations",
        },
      ],
    },
    {
      id: "soft",
      name: "Soft Skills",
      icon: Users,
      description: "Interpersonal and professional capabilities",
      skills: [
        {
          name: "Leadership",
          level: 85,
          description: "Demonstrated ability to lead teams and initiatives effectively",
        },
        {
          name: "Teamwork",
          level: 90,
          description: "Strong collaborative skills and ability to work in diverse teams",
        },
        {
          name: "Adaptability",
          level: 85,
          description: "Quick to adapt to new situations and learn new skills",
        },
        {
          name: "Time Management",
          level: 80,
          description: "Excellent at prioritizing tasks and meeting deadlines",
        },
        {
          name: "Presentation",
          level: 85,
          description: "Skilled in creating and delivering engaging presentations",
        },
      ],
    },
  ]

  const activeCategory = skillCategories.find((category) => category.id === activeTab) || skillCategories[0]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Professional Skills"
          subtitle="A comprehensive overview of my capabilities across multiple domains"
        />

        <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4">
              {skillCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                  <category.icon className="h-4 w-4 mr-2 hidden sm:inline" />
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                        <category.icon className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                      </div>
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      These skills have been developed through a combination of academic coursework, practical
                      experience, and self-directed learning. Each skill represents a capability that I can apply to
                      solve real-world problems and add value to organizations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Skill Breakdown</CardTitle>
                    <CardDescription>Detailed assessment of individual skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2 mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-400">{skill.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
