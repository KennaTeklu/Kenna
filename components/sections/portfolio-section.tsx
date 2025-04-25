"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Eye } from "lucide-react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/ui/section-heading"
import { AnimatedBorderCard } from "@/components/ui/animated-border-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  links: {
    demo?: string
    github?: string
    case_study?: string
  }
  category: "business" | "technical" | "academic"
}

export function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const projects: Project[] = [
    {
      id: "fbla-finance",
      title: "FBLA Finance Championship",
      description:
        "Led Arizona Christian University to victory at the 2023 FBLA collegiate state conference, securing gold medals in Finance.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kNznS07crhzhnA0MElYwU2nw6JDIHy.png",
      tags: ["Finance", "Competition", "Leadership"],
      links: {
        case_study: "#",
      },
      category: "business",
    },
    {
      id: "portfolio-website",
      title: "Personal Portfolio Website",
      description: "Designed and developed a responsive portfolio website using Next.js, React, and Tailwind CSS.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "React", "Tailwind CSS"],
      links: {
        demo: "#",
        github: "https://github.com/KennaTeklu",
      },
      category: "technical",
    },
    {
      id: "business-analysis",
      title: "Market Analysis Project",
      description: "Conducted comprehensive market analysis for a local business, providing strategic recommendations.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Market Research", "Business Strategy", "Data Analysis"],
      links: {
        case_study: "#",
      },
      category: "academic",
    },
    {
      id: "python-data",
      title: "Python Data Analysis Tool",
      description: "Developed a Python application for analyzing financial data and generating insightful reports.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Python", "Data Analysis", "Finance"],
      links: {
        github: "https://github.com/KennaTeklu",
        demo: "#",
      },
      category: "technical",
    },
    {
      id: "hospitality-management",
      title: "Hospitality Management Case Study",
      description: "Award-winning case study on optimizing operations in the hospitality industry.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4nPa0p4Vf7mjBYdB1zRYsp21jXT87A.png",
      tags: ["Hospitality", "Management", "Operations"],
      links: {
        case_study: "#",
      },
      category: "business",
    },
    {
      id: "research-paper",
      title: "Business Ethics Research Paper",
      description: "Academic research on ethical considerations in modern business practices.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Ethics", "Research", "Business"],
      links: {
        case_study: "#",
      },
      category: "academic",
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Project Portfolio"
          subtitle="Showcasing my work across business, technical, and academic domains"
        />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedBorderCard className="h-full">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/80 text-gray-800 border-gray-300">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
                  {project.links.demo && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-1" /> Demo
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" /> Code
                      </a>
                    </Button>
                  )}
                  {project.links.case_study && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.links.case_study} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" /> Case Study
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </AnimatedBorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
