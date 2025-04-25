"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Clock, User, Mail, RefreshCw, ExternalLink, MessageSquare, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  timestamp: string
  isOwn?: boolean
  status?: "new" | "read" | "replied"
}

export default function SecretChatPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [name, setName] = useState("Anonymous")
  const [email, setEmail] = useState("anonymous@example.com")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [hasClicked, setHasClicked] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sheetContainerRef = useRef<HTMLDivElement>(null)

  // Load messages from Google Sheets
  useEffect(() => {
    // This would normally fetch data from the Google Sheets API
    // For now, we'll use placeholder data
    const placeholderMessages = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        message: "Hello Kenna! I'm impressed with your portfolio.",
        timestamp: "2023-05-10T14:30:00Z",
        status: "read" as const,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        message: "I'd like to discuss a potential job opportunity.",
        timestamp: "2023-05-11T09:15:00Z",
        status: "replied" as const,
      },
      {
        id: 3,
        name: "Kenna",
        email: "hire@kenna.mba",
        message: "Thank you for reaching out! I'd be happy to discuss.",
        timestamp: "2023-05-11T10:30:00Z",
        isOwn: true,
      },
      {
        id: 4,
        name: "Tech Recruiter",
        email: "recruiter@techcompany.com",
        message: "Your skills in both business and programming are exactly what we're looking for.",
        timestamp: "2023-05-12T11:45:00Z",
        status: "new" as const,
      },
      {
        id: 5,
        name: "Marketing Director",
        email: "director@marketingfirm.com",
        message: "We're looking for someone with your unique combination of business and technical skills.",
        timestamp: "2023-05-13T15:20:00Z",
        status: "new" as const,
      },
      {
        id: 6,
        name: "Startup Founder",
        email: "founder@techstartup.io",
        message: "Would you be interested in joining our team as a business analyst with programming skills?",
        timestamp: "2023-05-14T10:05:00Z",
        status: "new" as const,
      },
    ]
    setMessages(placeholderMessages)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Timer countdown
  useEffect(() => {
    if (!hasClicked && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !hasClicked) {
      window.location.href = "/"
    }
  }, [timeLeft, hasClicked])

  const handleContinueClick = () => {
    setHasClicked(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsLoading(true)

    // Simulate sending to Google Sheets
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: messages.length + 1,
        name,
        email,
        message: newMessage,
        timestamp: new Date().toISOString(),
        isOwn: true,
      }

      setMessages([...messages, newMsg])
      setNewMessage("")
      setIsLoading(false)

      // Simulate real-time update to the sheet
      if (sheetContainerRef.current) {
        const sheetPreview = document.createElement("div")
        sheetPreview.className = "bg-green-50 dark:bg-green-900/20 p-2 mb-2 rounded animate-pulse"
        sheetPreview.innerHTML = `
          <div class="text-xs font-mono">
            <span class="text-green-600 dark:text-green-400">New row added:</span> 
            ${new Date().toLocaleString()} | ${name} | ${email} | ${newMessage.substring(0, 30)}${
              newMessage.length > 30 ? "..." : ""
            }
          </div>
        `
        sheetContainerRef.current.prepend(sheetPreview)

        // Remove animation after a while
        setTimeout(() => {
          sheetPreview.classList.remove("animate-pulse")
        }, 2000)
      }

      toast({
        title: "Message sent!",
        description: "Your message has been added to the contact database.",
      })
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const refreshData = () => {
    setIsLoading(true)
    // Simulate refreshing data
    setTimeout(() => {
      toast({
        title: "Data refreshed",
        description: "Latest contact submissions loaded.",
      })
      setIsLoading(false)
    }, 1000)
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">New</Badge>
      case "read":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">Read</Badge>
      case "replied":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Replied</Badge>
      default:
        return null
    }
  }

  if (!hasClicked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <Clock className="h-16 w-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Secret Page Timer</h1>
          <p className="mb-6">
            To continue using this secret page, please click the button below. Otherwise, you will be redirected in:
          </p>
          <div className="text-4xl font-mono font-bold mb-6 text-purple-600">{formatTime(timeLeft)}</div>
          <Button onClick={handleContinueClick} size="lg" className="w-full">
            Continue to Secret Chat
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-purple-600 text-white flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" /> Secret Message Board
          </h1>
          <div className="text-sm opacity-75">Found the Easter Egg! 🎉</div>
        </div>

        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="p-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h2 className="font-medium mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Your Name
                  </h2>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h2 className="font-medium mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2" /> Your Email
                  </h2>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full"
                  />
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h2 className="font-medium mb-2 flex items-center justify-between">
                    <span>Google Sheet Data</span>
                    <Button variant="ghost" size="sm" onClick={refreshData} disabled={isLoading}>
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </h2>
                  <div
                    ref={sheetContainerRef}
                    className="h-64 overflow-y-auto bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 p-2 text-xs font-mono"
                  >
                    <div className="text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-bold">Timestamp</span> | <span className="font-bold">Name</span> |{" "}
                      <span className="font-bold">Email</span> | <span className="font-bold">Message</span>
                    </div>
                    {messages.map((msg, idx) => (
                      <div key={idx} className="mb-1 pb-1 border-b border-gray-100 dark:border-gray-700">
                        {new Date(msg.timestamp).toLocaleString()} | {msg.name} | {msg.email} |{" "}
                        {msg.message.substring(0, 30)}
                        {msg.message.length > 30 ? "..." : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.isOwn
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-gray-200 dark:bg-gray-600 rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{msg.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{msg.name}</span>
                          {getStatusBadge(msg.status)}
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 text-right mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> Send
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages
                .filter((msg) => !msg.isOwn)
                .map((submission) => (
                  <Card key={submission.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 dark:bg-gray-700/50 p-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-4 w-4 mr-2" /> {submission.name}
                        </CardTitle>
                        {getStatusBadge(submission.status)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <Mail className="h-3 w-3 mr-1" /> {submission.email}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-700 dark:text-gray-300">{submission.message}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(submission.timestamp).toLocaleString()}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3 w-3 mr-1" /> Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3 mr-1" /> Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{messages.filter((m) => !m.isOwn).length}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    From {new Set(messages.map((m) => m.email)).size} unique contacts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">67%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Average response time: 8 hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Messages leading to interviews</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Message Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Interactive chart would appear here</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" /> View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
