"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, BookOpen, Briefcase, Code, Heart, Star } from "lucide-react"

import { ParallaxSection } from "@/components/ui/parallax-section"
import { AnimatedText } from "@/components/ui/animated-text"

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 pb-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-purple-100">
              <AnimatedText
                text="Business professional with a passion for technology and problem-solving"
                speed={0.03}
              />
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-full z-0"></div>
                <div className="relative z-10">
                  <Image
                    src="/profile-picture.jpg"
                    alt="Kenna Teklu"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-slate-900">Kenna Teklu</h2>
              <p className="text-slate-600 leading-relaxed">
                I am a dedicated Business Administration student with a concentration in Management and a minor in
                Computer Programming at Arizona Christian University. My unique combination of business acumen and
                technical skills allows me to bridge the gap between technology and business strategy.
              </p>
              <p className="text-slate-600 leading-relaxed">
                As a champion in Finance at the 2023 FBLA collegiate state conference, I've demonstrated my ability to
                excel in competitive environments and apply theoretical knowledge to practical scenarios. My analytical
                thinking, problem-solving skills, and attention to detail make me well-suited for roles that require
                both business and technical expertise.
              </p>
              <p className="text-slate-600 leading-relaxed">
                I'm passionate about leveraging technology to solve business challenges and create innovative solutions.
                My goal is to continue growing both my business and technical skills to become a versatile professional
                who can thrive in today's rapidly evolving business landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ParallaxSection className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">What Drives Me</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The core values and passions that shape my personal and professional journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Excellence</h3>
              <p className="text-slate-600">
                I strive for excellence in everything I do, pushing myself to achieve the highest standards and
                continuously improve my skills and knowledge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Innovation</h3>
              <p className="text-slate-600">
                I'm passionate about finding innovative solutions to complex problems, combining creativity with
                analytical thinking to develop new approaches.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Impact</h3>
              <p className="text-slate-600">
                I aim to make a positive impact through my work, whether it's helping organizations achieve their goals
                or contributing to meaningful projects that benefit others.
              </p>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">My Journey</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The key milestones that have shaped my educational and professional path
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-purple-200"></div>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center mb-4">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-purple-700 z-10 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 md:text-right pr-8">
                    <h3 className="text-xl font-bold text-slate-900">Started at Arizona Christian University</h3>
                    <p className="text-purple-700">August 2022</p>
                  </div>
                  <div className="md:col-span-3 pl-8">
                    <p className="text-slate-600">
                      Began my academic journey pursuing a Bachelor of Science in Business Administration with a
                      concentration in Management and a minor in Computer Programming.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center mb-4">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-700 z-10 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 md:text-right pr-8">
                    <h3 className="text-xl font-bold text-slate-900">Technical Team Member</h3>
                    <p className="text-blue-700">September 2022 - Present</p>
                  </div>
                  <div className="md:col-span-3 pl-8">
                    <p className="text-slate-600">
                      Joined Crosswinds Presbyterian Church as a Technical Team Member, where I assist with setup and
                      recording of church services and events, applying my technical skills in a real-world environment.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center mb-4">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-green-700 z-10 flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 md:text-right pr-8">
                    <h3 className="text-xl font-bold text-slate-900">FBLA Championship</h3>
                    <p className="text-green-700">2023</p>
                  </div>
                  <div className="md:col-span-3 pl-8">
                    <p className="text-slate-600">
                      Led Arizona Christian University to victory at the 2023 FBLA collegiate state conference, winning
                      gold medals in Finance and Hospitality Management, along with silver and bronze medals in other
                      categories.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center mb-4">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-amber-700 z-10 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 md:text-right pr-8">
                    <h3 className="text-xl font-bold text-slate-900">Expected Graduation</h3>
                    <p className="text-amber-700">May 2026</p>
                  </div>
                  <div className="md:col-span-3 pl-8">
                    <p className="text-slate-600">
                      Anticipated completion of my Bachelor of Science degree, equipped with a strong foundation in both
                      business administration and computer programming to pursue a career that leverages both skill
                      sets.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
