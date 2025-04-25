"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GradientText } from "@/components/ui/gradient-text"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Database, LineChart, Lightbulb, Briefcase, Sparkles, RotateCw, Shuffle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Easter egg states
type EasterEggState = {
  invertColors: boolean
  shuffleLayout: boolean
  glitchText: boolean
  hiddenGame: boolean
}

export default function SkillsPage() {
  const router = useRouter()
  const [clickCount, setClickCount] = useState<Record<string, number>>({})
  const [easterEggs, setEasterEggs] = useState<EasterEggState>({
    invertColors: false,
    shuffleLayout: false,
    glitchText: false,
    hiddenGame: false,
  })
  const [gameScore, setGameScore] = useState(0)
  const [gameTarget, setGameTarget] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Generate random position for game target
  useEffect(() => {
    if (easterEggs.hiddenGame) {
      setGameTarget({
        x: Math.floor(Math.random() * (window.innerWidth - 50)),
        y: Math.floor(Math.random() * (window.innerHeight - 50)) + 100,
      })
    }
  }, [easterEggs.hiddenGame, gameScore])

  // Handle skill card clicks for easter eggs
  const handleSkillClick = (skillId: string) => {
    const newClickCount = { ...clickCount }
    newClickCount[skillId] = (newClickCount[skillId] || 0) + 1
    setClickCount(newClickCount)

    // Easter egg triggers
    if (skillId === "programming" && newClickCount[skillId] === 5) {
      setEasterEggs((prev) => ({ ...prev, invertColors: !prev.invertColors }))
      toast({
        title: "Easter Egg Found!",
        description: "You've inverted the website colors!",
      })
    } else if (skillId === "data-analysis" && newClickCount[skillId] === 3) {
      setEasterEggs((prev) => ({ ...prev, shuffleLayout: !prev.shuffleLayout }))
      toast({
        title: "Easter Egg Found!",
        description: "You've shuffled the layout!",
      })
    } else if (skillId === "business" && newClickCount[skillId] === 7) {
      setEasterEggs((prev) => ({ ...prev, glitchText: !prev.glitchText }))
      toast({
        title: "Easter Egg Found!",
        description: "You've activated glitch text!",
      })
    } else if (skillId === "problem-solving" && newClickCount[skillId] === 4) {
      setEasterEggs((prev) => ({ ...prev, hiddenGame: !prev.hiddenGame }))
      toast({
        title: "Easter Egg Found!",
        description: "You've discovered a hidden game! Click the targets to score points.",
      })
    }

    // Secret redirect easter egg
    if (Object.values(newClickCount).reduce((a, b) => a + b, 0) > 20) {
      const randomChance = Math.random()
      if (randomChance < 0.1) {
        router.push("/contact")
        toast({
          title: "Secret Redirect!",
          description: "You've been mysteriously redirected to the contact page!",
        })
      }
    }
  }

  // Handle game target click
  const handleTargetClick = () => {
    setGameScore((prev) => prev + 1)
    toast({
      title: "Target Hit!",
      description: `Score: ${gameScore + 1}`,
    })
  }

  // Reset easter eggs
  const resetEasterEggs = () => {
    setEasterEggs({
      invertColors: false,
      shuffleLayout: false,
      glitchText: false,
      hiddenGame: false,
    })
    setClickCount({})
    setGameScore(0)
    toast({
      title: "Reset Complete",
      description: "All easter eggs have been reset.",
    })
  }

  // Apply glitch effect to text
  const glitchText = (text: string) => {
    if (!easterEggs.glitchText) return text

    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/"
    return text
      .split("")
      .map((char, i) => {
        const shouldGlitch = Math.random() < 0.3
        return shouldGlitch ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      })
      .join("")
  }

  // Shuffle array for layout randomization
  const shuffleArray = <T,>(array: T[]): T[] => {
    if (!easterEggs.shuffleLayout) return array

    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Skill categories
  const skillCategories = [
    {
      id: "programming",
      title: "Programming",
      icon: Code,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      skills: [
        { name: "Python", level: 75 },
        { name: "JavaScript", level: 70 },
        { name: "HTML/CSS", level: 80 },
        { name: "React", level: 65 },
        { name: "SQL", level: 70 },
      ],
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      icon: LineChart,
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      skills: [
        { name: "Excel", level: 90 },
        { name: "Data Visualization", level: 75 },
        { name: "Statistical Analysis", level: 70 },
        { name: "Business Intelligence", level: 80 },
      ],
    },
    {
      id: "business",
      title: "Business",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      skills: [
        { name: "Financial Analysis", level: 85 },
        { name: "Strategic Planning", level: 80 },
        { name: "Marketing", level: 75 },
        { name: "Project Management", level: 70 },
      ],
    },
    {
      id: "database",
      title: "Database",
      icon: Database,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      skills: [
        { name: "SQL Server", level: 70 },
        { name: "PostgreSQL", level: 65 },
        { name: "Database Design", level: 75 },
        { name: "Data Modeling", level: 70 },
      ],
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      icon: Lightbulb,
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      skills: [
        { name: "Critical Thinking", level: 85 },
        { name: "Analytical Skills", level: 80 },
        { name: "Creative Solutions", level: 75 },
        { name: "Decision Making", level: 80 },
      ],
    },
  ]

  // Interactive mini-game component
  const SkillGame = () => {
    const [gameItems, setGameItems] = useState<string[]>(["Python", "JavaScript", "React", "SQL", "Excel", "Finance"])
    const [currentItem, setCurrentItem] = useState<string>("")
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
      if (isPlaying && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        return () => clearTimeout(timer)
      } else if (timeLeft === 0 && isPlaying) {
        setIsPlaying(false)
        toast({
          title: "Game Over!",
          description: `Final Score: ${score}`,
        })
      }
    }, [timeLeft, isPlaying, score])

    const startGame = () => {
      setScore(0)
      setTimeLeft(30)
      setIsPlaying(true)
      setCurrentItem(gameItems[Math.floor(Math.random() * gameItems.length)])
    }

    const handleItemClick = (item: string) => {
      if (item === currentItem) {
        setScore(score + 1)
        setCurrentItem(gameItems[Math.floor(Math.random() * gameItems.length)])
      } else {
        setScore(Math.max(0, score - 1))
      }
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">Skill Matching Game</h3>

        {!isPlaying ? (
          <div className="text-center">
            <p className="mb-4">Match the skill when it appears! Test your reaction time.</p>
            <Button onClick={startGame}>Start Game</Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <div className="text-lg font-bold">Score: {score}</div>
              <div className="text-lg font-bold">Time: {timeLeft}s</div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-4 text-center">
              <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400">{currentItem}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Click this skill below!</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {shuffleArray(gameItems).map((item, index) => (
                <Button
                  key={index}
                  variant={item === currentItem ? "default" : "outline"}
                  onClick={() => handleItemClick(item)}
                  className="h-12"
                >
                  {item}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${easterEggs.invertColors ? "invert" : ""}`} style={{ transition: "all 0.5s ease" }}>
      <section className="pt-20 pb-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>{glitchText("My Skills & Expertise")}</GradientText>
            </h1>
            <p className="text-xl text-gray-300">
              {glitchText("A comprehensive overview of my technical and business capabilities")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {glitchText("Technical & Business Proficiency")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {glitchText(
                  "My unique combination of business administration knowledge and computer programming skills allows me to bridge the gap between technical and business domains, creating solutions that are both technically sound and aligned with business objectives.",
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30">
                  Business Administration
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/30">
                  Computer Programming
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30">
                  Data Analysis
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30">
                  Financial Analysis
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SkillGame />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shuffleArray(skillCategories).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleSkillClick(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
              >
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mr-4`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{glitchText(category.title)}</h3>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {glitchText(skill.name)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                category.id === "programming"
                                  ? "bg-blue-600"
                                  : category.id === "data-analysis"
                                    ? "bg-green-600"
                                    : category.id === "business"
                                      ? "bg-purple-600"
                                      : category.id === "database"
                                        ? "bg-amber-600"
                                        : "bg-red-600"
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Easter egg reset button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="sm" onClick={resetEasterEggs} className="opacity-50 hover:opacity-100">
              <RotateCw className="h-4 w-4 mr-2" /> Reset Interactions
            </Button>
          </div>
        </div>
      </section>

      {/* Hidden game target */}
      {easterEggs.hiddenGame && (
        <motion.div
          className="fixed w-12 h-12 rounded-full bg-red-500 flex items-center justify-center cursor-pointer z-50"
          style={{
            top: gameTarget.y,
            left: gameTarget.x,
            boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
          onClick={handleTargetClick}
        >
          <Sparkles className="text-white h-6 w-6" />
        </motion.div>
      )}

      {/* Shuffle button easter egg */}
      {easterEggs.shuffleLayout && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-12 w-12 bg-purple-600 text-white border-none"
            onClick={() => setEasterEggs((prev) => ({ ...prev, shuffleLayout: true }))}
          >
            <Shuffle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
