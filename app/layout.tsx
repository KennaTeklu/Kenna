import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kenna Teklu | Business Administration & Computer Programming",
  description: "Professional portfolio of Kenna Teklu, showcasing achievements in business, finance, and programming.",
  keywords: "Kenna Teklu, Business Administration, Computer Programming, FBLA, Finance, Portfolio, Resume",
  authors: [{ name: "Kenna Teklu" }],
  creator: "Kenna Teklu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kennateklu.com",
    title: "Kenna Teklu | Business Administration & Computer Programming",
    description:
      "Professional portfolio of Kenna Teklu, showcasing achievements in business, finance, and programming.",
    siteName: "Kenna Teklu Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kenna Teklu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenna Teklu | Business Administration & Computer Programming",
    description:
      "Professional portfolio of Kenna Teklu, showcasing achievements in business, finance, and programming.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
