"use client"
import { AlertTriangle, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Legal disclaimer component
export function LegalDisclaimer({ type }: { type: string }) {
  const disclaimers = {
    criminal:
      "This system contains information that may be subject to attorney-client privilege. Unauthorized access is prohibited by law.",
    family:
      "Family law matters displayed here are confidential and protected under applicable domestic relations laws.",
    patent: "Patent information may contain trade secrets and is protected by intellectual property laws.",
    tax: "Tax information is subject to IRS regulations and confidentiality provisions.",
    employment: "Employment data is subject to labor laws and privacy regulations.",
    medical: "Medical information is protected under HIPAA and other healthcare privacy laws.",
    corporate: "Corporate data may contain material non-public information subject to securities regulations.",
    environmental: "Environmental data may be subject to regulatory reporting requirements.",
    bankruptcy: "Bankruptcy information is subject to court confidentiality rules.",
    general: "Information is provided for authorized users only. Misuse may result in legal liability.",
  }

  const disclaimer = disclaimers[type as keyof typeof disclaimers] || disclaimers.general

  return (
    <Alert variant="destructive" className="bg-slate-800 border border-slate-700 text-slate-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-500">Legal Notice</AlertTitle>
      <AlertDescription className="text-slate-300 text-sm">{disclaimer}</AlertDescription>
    </Alert>
  )
}

// Compliance status component
export function ComplianceStatus({
  domain,
  status,
}: {
  domain: "GDPR" | "HIPAA" | "SOX" | "PCI-DSS" | "CCPA" | "GLBA"
  status: "compliant" | "non-compliant" | "pending"
}) {
  const getStatusColor = () => {
    switch (status) {
      case "compliant":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "non-compliant":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-center">
        <Shield className="h-4 w-4 text-slate-400 mr-2" />
        <span className="text-sm text-slate-300">{domain} Compliance</span>
      </div>
      <Badge variant="outline" className={getStatusColor()}>
        {status === "compliant" ? "Compliant" : status === "non-compliant" ? "Non-Compliant" : "Pending Review"}
      </Badge>
    </div>
  )
}
