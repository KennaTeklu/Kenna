"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Briefcase, Award, User, Mail, Download, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/lib/hooks/useMediaQuery"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const dashboardLinks = [
  {
    name: "Profile",
    href: "/dashboard",
    icon: User,
    description: "View and manage your profile information",
  },
  {
    name: "Resume",
    href: "/dashboard/resume",
    icon: FileText,
    description: "Access your complete resume and CV",
  },
  {
    name: "Experience",
    href: "/dashboard/experience",
    icon: Briefcase,
    description: "Detailed work and project experience",
  },
  {
    name: "Achievements",
    href: "/dashboard/achievements",
    icon: Award,
    description: "Certificates, awards, and recognitions",
  },
  {
    name: "Contact",
    href: "/dashboard/contact",
    icon: Mail,
    description: "Private contact information for recruiters",
  },
  {
    name: "Downloads",
    href: "/dashboard/downloads",
    icon: Download,
    description: "Download resume and other documents",
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className={`lg:w-80 flex-shrink-0 ${isDesktop || isSidebarOpen ? "block" : "hidden"}`}
            initial={{ x: isDesktop ? 0 : -320, opacity: isDesktop ? 1 : 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 sticky top-24">
              <div className="flex flex-col space-y-1 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome, Visitor</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Recruiter Dashboard</p>
              </div>

              <nav className="space-y-1 mb-6">
                {dashboardLinks.map((link) => {
                  const isActive = pathname === link.href

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                      }`}
                      onClick={() => !isDesktop && setIsSidebarOpen(false)}
                    >
                      <link.icon className="h-5 w-5 mr-3" />
                      <span>{link.name}</span>
                      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </Link>
                  )
                })}
              </nav>

              <Separator className="my-6" />
            </Card>
          </motion.div>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
