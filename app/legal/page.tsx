"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Shield, Scale, Gavel, AlertTriangle } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LegalPage() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const domains = [
    "haleyo.vercel.app",
    "kencer.vercel.app",
    "kerabo.vercel.app",
    "sifene.vercel.app",
    "simito.vercel.app",
    "demisse.vercel.app",
    "demissu.vercel.app",
    "drkenna.vercel.app",
    "erkossa.vercel.app",
    "fultime.vercel.app",
    "mosissa.vercel.app",
    "mrkenna.vercel.app",
    "sidejob.vercel.app",
    "abouthim.vercel.app",
    "finfinne.vercel.app",
    "kefyalew.vercel.app",
    "gututeklu.vercel.app",
    "hiremenow.vercel.app",
    "teklugutu.vercel.app",
    "kennateklu.vercel.app",
    "sifeneteku.vercel.app",
    "teklukenna.vercel.app",
    "gutuerkossa.vercel.app",
    "handsomeguy.vercel.app",
    "teklusifene.vercel.app",
    "kennaerkossa.vercel.app",
    "tekluerkossa.vercel.app",
    "abebebesobela.vercel.app",
    "askalemosissa.vercel.app",
    "businessmajor.vercel.app",
    "mosissaaskale.vercel.app",
    "sifeneerkossa.vercel.app",
    "arizonamanager.vercel.app",
    "businesscoding.vercel.app",
    "arizonabusiness.vercel.app",
    "businessstudent.vercel.app",
    "arizonachristian.vercel.app",
    "kennatekluerkossa.vercel.app",
    "arizonachristianuniversity.vercel.app",
  ]

  const handleSectionToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section)
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
              <GradientText>Legal Information</GradientText>
            </h1>
            <p className="text-xl text-gray-300">
              Important legal documents and information regarding this website and its services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="terms">
                <AccordionTrigger className="text-xl font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> Terms of Service
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  <p>
                    Welcome to Kenna Teklu's personal portfolio website. By accessing or using this website, you agree
                    to be bound by these Terms of Service.
                  </p>
                  <h3 className="text-lg font-medium mt-4">1. Use of the Website</h3>
                  <p>
                    This website is provided for informational and professional purposes only. You may not use this
                    website for any illegal or unauthorized purpose.
                  </p>
                  <h3 className="text-lg font-medium mt-4">2. Intellectual Property</h3>
                  <p>
                    All content on this website, including but not limited to text, graphics, logos, images, and
                    software, is the property of Kenna Teklu and is protected by copyright and other intellectual
                    property laws.
                  </p>
                  <h3 className="text-lg font-medium mt-4">3. Limitation of Liability</h3>
                  <p>
                    The information on this website is provided "as is" without any warranties, expressed or implied.
                    Kenna Teklu will not be liable for any damages arising from the use of this website.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger className="text-xl font-semibold flex items-center">
                  <Shield className="mr-2 h-5 w-5" /> Privacy Policy
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  <p>
                    This Privacy Policy describes how your personal information is collected, used, and shared when you
                    visit Kenna Teklu's personal portfolio website.
                  </p>
                  <h3 className="text-lg font-medium mt-4">1. Information We Collect</h3>
                  <p>
                    When you visit the website, we automatically collect certain information about your device,
                    including information about your web browser, IP address, time zone, and some of the cookies that
                    are installed on your device.
                  </p>
                  <h3 className="text-lg font-medium mt-4">2. How We Use Your Information</h3>
                  <p>
                    We use the information we collect to improve and optimize our website and to understand how visitors
                    use our website.
                  </p>
                  <h3 className="text-lg font-medium mt-4">3. Sharing Your Information</h3>
                  <p>
                    We do not share your Personal Information with third parties except to comply with applicable laws
                    and regulations.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="copyright">
                <AccordionTrigger className="text-xl font-semibold flex items-center">
                  <Scale className="mr-2 h-5 w-5" /> Copyright Notice
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>
                    All content on this website is the property of Kenna Teklu and is protected by United States and
                    international copyright laws. Unauthorized use of any materials on this website may violate
                    copyright, trademark, and other laws.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="domains">
                <AccordionTrigger className="text-xl font-semibold flex items-center">
                  <Gavel className="mr-2 h-5 w-5" /> Domain Ownership
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>
                    The following is a list of domains that I own which point to this website. These domains are not
                    meant to infringe on any copyright and are owned solely for personal and professional purposes.
                  </p>
                  <p>
                    If you were directed to this page from any of the following links and believe there is a copyright
                    infringement, please contact me directly through the email addresses available on this website. If
                    you are interested in acquiring any of these domains, a fee of $3,900 will be donated to my favorite
                    charity.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {domains.map((domain, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        {domain}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="disclaimer">
                <AccordionTrigger className="text-xl font-semibold flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" /> Disclaimer
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>
                    The information provided on this website is for general informational purposes only. All information
                    on the site is provided in good faith, however, we make no representation or warranty of any kind,
                    express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or
                    completeness of any information on the website.
                  </p>
                  <p>
                    Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred
                    as a result of the use of the website or reliance on any information provided on the website.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
