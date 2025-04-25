"use client"

import { useState } from "react"
import { Scale, Gavel, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import {
  LegalDisclaimer,
  ComplianceStatus,
  LegalDocumentViewer,
  LegalRiskAssessment,
  LegalHoldNotification,
  ContractClauseGenerator,
  LegalSpecialtyAdvisor,
  GDPRComplianceNotice,
  LegalJurisdictionIndicator,
} from "@/components/legal/legal-components"

export function LegalDashboard() {
  const [activeTab, setActiveTab] = useState("compliance")

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center">
            <Scale className="mr-2 h-5 w-5 text-cyan-500" />
            Legal Protection System
          </CardTitle>
          <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
            ACTIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <LegalDisclaimer type="general" />

        <div className="mt-6">
          <Tabs defaultValue="compliance" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-800/50 p-1 mb-6">
              <TabsTrigger
                value="compliance"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Compliance
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Legal Documents
              </TabsTrigger>
              <TabsTrigger value="risk" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
                Risk Assessment
              </TabsTrigger>
              <TabsTrigger
                value="advisors"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Legal Advisors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComplianceStatus domain="GDPR" status="compliant" />
                <ComplianceStatus domain="HIPAA" status="compliant" />
                <ComplianceStatus domain="SOX" status="pending" />
                <ComplianceStatus domain="PCI-DSS" status="compliant" />
                <ComplianceStatus domain="CCPA" status="compliant" />
                <ComplianceStatus domain="GLBA" status="compliant" />
              </div>

              <GDPRComplianceNotice />

              <div className="mt-4">
                <LegalJurisdictionIndicator ipAddress="192.168.1.1" />
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LegalDocumentViewer
                  documentType="Privacy Policy"
                  content="This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our site. When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device."
                  lastUpdated="2023-11-15"
                />

                <LegalDocumentViewer
                  documentType="Terms of Service"
                  content="By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
                  lastUpdated="2023-10-22"
                />

                <LegalDocumentViewer
                  documentType="Data Processing Agreement"
                  content="This Data Processing Agreement (DPA) reflects the parties' agreement with respect to the terms governing the processing of Personal Data under the Customer Agreement. This DPA is an amendment to the Customer Agreement and is effective upon its incorporation into the Customer Agreement."
                  lastUpdated="2023-09-30"
                />

                <LegalDocumentViewer
                  documentType="Intellectual Property Rights"
                  content="All content included on this website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of the Company or its content suppliers and protected by international copyright laws."
                  lastUpdated="2023-08-15"
                />
              </div>
            </TabsContent>

            <TabsContent value="risk" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LegalRiskAssessment action="delete user data" context="personal information" />

                <LegalRiskAssessment action="modify system settings" context="security configuration" />

                <LegalRiskAssessment action="share report" context="financial data" />

                <LegalRiskAssessment action="update privacy policy" context="user terms" />
              </div>

              <div className="mt-4">
                <LegalHoldNotification matter="System Audit Records" date="2023-11-01" />
              </div>
            </TabsContent>

            <TabsContent value="advisors" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LegalSpecialtyAdvisor />

                <ContractClauseGenerator />

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Gavel className="mr-2 h-5 w-5 text-cyan-500" />
                      Criminal Defense Advisor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 mb-3">
                      Ensure all evidence is properly documented and chain of custody is maintained. All communications
                      are protected by attorney-client privilege.
                    </p>
                    <div className="bg-slate-800/50 p-2 rounded-md border border-slate-700/50 text-xs text-slate-400">
                      Remember: Do not discuss case details over unsecured channels. All digital communications should
                      be encrypted.
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <BookOpen className="mr-2 h-5 w-5 text-cyan-500" />
                      Corporate Law Advisor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 mb-3">
                      Maintain proper corporate formalities and documentation of all board decisions. Ensure regulatory
                      filings are current and accurate.
                    </p>
                    <div className="bg-slate-800/50 p-2 rounded-md border border-slate-700/50 text-xs text-slate-400">
                      Warning: Failure to maintain corporate records may result in piercing of the corporate veil.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
