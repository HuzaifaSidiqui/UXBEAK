"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  AlertTriangle,
  Users,
  Clock,
  ChevronDown,
  ChevronRight,
  Eye,
  MousePointer,
  TrendingDown,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
} from "lucide-react"

interface UXIssue {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  category: "navigation" | "conversion" | "engagement" | "performance"
  impact: {
    affectedUsers: number
    timeWasted: number
    conversionImpact: number
  }
  evidence: {
    type: "heatmap" | "session" | "analytics"
    description: string
    data?: any
  }[]
  recommendation: string
  codefix?: string
  status: "new" | "in-progress" | "resolved" | "ignored"
  confidence: number
  detectedAt: Date
}

const mockIssues: UXIssue[] = [
  {
    id: "1",
    title: "Sign-in link has poor visibility in header",
    description:
      "The 'Sign in here' link in the top-right corner uses small text and orange color that doesn't stand out enough against the dark background. Users may struggle to find the login option.",
    severity: "high",
    category: "navigation",
    impact: {
      affectedUsers: 2847,
      timeWasted: 8.3,
      conversionImpact: -12,
    },
    evidence: [
      {
        type: "heatmap",
        description: "Low click density on sign-in area despite high user intent to login",
      },
      {
        type: "session",
        description: "Users spend average 12 seconds scanning header before finding sign-in",
      },
    ],
    recommendation:
      "Make the sign-in link more prominent with a button style, increase font size, or add an icon. Consider moving it to a more expected location.",
    codefix: `.sign-in-link {\n  background: #ff6b35;\n  color: white;\n  padding: 8px 16px;\n  border-radius: 4px;\n  font-weight: 500;\n  text-decoration: none;\n}`,
    status: "new",
    confidence: 89,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
  },
  {
    id: "2",
    title: "Dual CTA buttons create decision paralysis",
    description:
      "Having both 'Learn more' and 'Get started' buttons side-by-side can confuse users about which action to take. The primary action isn't clear enough.",
    severity: "critical",
    category: "conversion",
    impact: {
      affectedUsers: 3241,
      timeWasted: 5.7,
      conversionImpact: -28,
    },
    evidence: [
      {
        type: "analytics",
        description: "47% of users hover over both buttons before making a decision",
      },
      {
        type: "session",
        description: "Average 6.2 second delay between button hover and click",
      },
    ],
    recommendation:
      "Make 'Get started' the primary CTA with stronger visual hierarchy. Consider making 'Learn more' a text link or secondary button style.",
    codefix: `.primary-cta {\n  background: #ff6b35;\n  padding: 14px 28px;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.secondary-cta {\n  background: transparent;\n  border: 1px solid rgba(255,255,255,0.3);\n  padding: 14px 28px;\n}`,
    status: "new",
    confidence: 92,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "3",
    title: "Value proposition lacks clarity",
    description:
      "While the headline mentions covering deposits, it's not immediately clear what SnapRent does, who it's for, or how the service works. Users need more context.",
    severity: "high",
    category: "engagement",
    impact: {
      affectedUsers: 4156,
      timeWasted: 12.4,
      conversionImpact: -18,
    },
    evidence: [
      {
        type: "session",
        description: "68% of users scroll down immediately after reading headline, suggesting confusion",
      },
      {
        type: "analytics",
        description: "High bounce rate (34%) from homepage within first 10 seconds",
      },
    ],
    recommendation:
      "Add a brief explanation under the headline clarifying the target audience and core benefit. Consider: 'For renters: Skip the large security deposit and move in today.'",
    status: "new",
    confidence: 85,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "4",
    title: "Mobile chart visualization may not be responsive",
    description:
      "The comparison chart showing $9,000 vs $4,575 with phone mockup appears designed for desktop. On mobile devices, this could be hard to read or interact with.",
    severity: "medium",
    category: "performance",
    impact: {
      affectedUsers: 1923,
      timeWasted: 4.1,
      conversionImpact: -8,
    },
    evidence: [
      {
        type: "analytics",
        description: "Mobile users spend 40% more time on hero section compared to desktop",
      },
      {
        type: "session",
        description: "Mobile users frequently zoom in on the chart area",
      },
    ],
    recommendation:
      "Create a mobile-optimized version of the comparison chart with larger text and simplified layout. Test on various screen sizes.",
    codefix: `@media (max-width: 768px) {\n  .comparison-chart {\n    flex-direction: column;\n    gap: 20px;\n  }\n  \n  .price-comparison {\n    font-size: 24px;\n    margin-bottom: 10px;\n  }\n}`,
    status: "new",
    confidence: 78,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "5",
    title: "Trust indicators could be more prominent",
    description:
      "Bank logos are shown at the bottom but they're quite small and may not be noticed by users. These are valuable trust signals that should be more visible.",
    severity: "medium",
    category: "engagement",
    impact: {
      affectedUsers: 2634,
      timeWasted: 2.8,
      conversionImpact: -6,
    },
    evidence: [
      {
        type: "heatmap",
        description: "Only 23% of users scroll down far enough to see bank logos",
      },
      {
        type: "session",
        description: "Users who see bank logos have 31% higher conversion rate",
      },
    ],
    recommendation:
      "Move trust indicators higher up on the page, possibly in the hero section. Make logos larger and add text like 'Trusted by major banks'.",
    status: "new",
    confidence: 81,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "6",
    title: "Navigation menu lacks visual hierarchy",
    description:
      "All navigation items (Security deposits, Broker fees, FAQs, About) have the same visual weight, making it hard for users to understand their relative importance.",
    severity: "low",
    category: "navigation",
    impact: {
      affectedUsers: 1456,
      timeWasted: 3.2,
      conversionImpact: -3,
    },
    evidence: [
      {
        type: "analytics",
        description: "Even distribution of clicks across nav items suggests no clear priority",
      },
      {
        type: "session",
        description: "Users often hover over multiple nav items before selecting",
      },
    ],
    recommendation:
      "Prioritize key pages with stronger visual treatment. Consider grouping related items or using different font weights.",
    status: "resolved",
    confidence: 72,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
]

const getCategoryIcon = (category: UXIssue["category"]) => {
  switch (category) {
    case "navigation":
      return <MousePointer className="h-4 w-4 text-yellow-400" />
    case "conversion":
      return <Target className="h-4 w-4 text-yellow-400" />
    case "engagement":
      return <TrendingUp className="h-4 w-4 text-yellow-400" />
    case "performance":
      return <Zap className="h-4 w-4 text-yellow-400" />
    default:
      return <AlertTriangle className="h-4 w-4 text-yellow-400" />
  }
}

export function IssuesList() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)

  const filteredIssues = mockIssues.filter((issue) => selectedSeverity === "all" || issue.severity === selectedSeverity)

  const getSeverityColor = (severity: UXIssue["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-white text-black border-white/20"
      case "high":
        return "bg-white/80 text-black border-white/20"
      case "medium":
        return "bg-white/60 text-black border-white/20"
      case "low":
        return "bg-white/40 text-black border-white/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Tabs value={selectedSeverity} onValueChange={setSelectedSeverity}>
          <TabsList className="bg-black/60 backdrop-blur-subtle border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-white/10 text-white/80">
              All Issues
            </TabsTrigger>
            <TabsTrigger value="critical" className="data-[state=active]:bg-white/10 text-white/80">
              Critical
            </TabsTrigger>
            <TabsTrigger value="high" className="data-[state=active]:bg-white/10 text-white/80">
              High
            </TabsTrigger>
            <TabsTrigger value="medium" className="data-[state=active]:bg-white/10 text-white/80">
              Medium
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <Card
            key={issue.id}
            className={`border-l-4 bg-black/60 backdrop-blur-subtle border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ${
              issue.severity === "critical"
                ? "border-l-white"
                : issue.severity === "high"
                  ? "border-l-white/80"
                  : issue.severity === "medium"
                    ? "border-l-white/60"
                    : "border-l-white/40"
            }`}
          >
            <Collapsible
              open={expandedIssue === issue.id}
              onOpenChange={(open) => setExpandedIssue(open ? issue.id : null)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-750">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-400 mt-1">{getCategoryIcon(issue.category)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg text-white">{issue.title}</CardTitle>
                        {expandedIssue === issue.id ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <CardDescription className="text-sm text-gray-300">{issue.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 backdrop-blur-subtle border border-white/10 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Affected Users</span>
                      </div>
                      <div className="text-2xl font-bold text-red-400">
                        {issue.impact.affectedUsers.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingDown className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Conversion Impact</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-400">{issue.impact.conversionImpact}%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Time Wasted</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-400">{issue.impact.timeWasted}s</div>
                    </div>
                  </div>

                  {/* Evidence */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                      <Eye className="h-4 w-4" />
                      Supporting Evidence
                    </h4>
                    <div className="space-y-2">
                      {issue.evidence.map((evidence, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-white/5 backdrop-blur-subtle border border-white/10 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {evidence.type === "heatmap" && <MousePointer className="h-4 w-4 text-blue-400" />}
                              {evidence.type === "session" && <Eye className="h-4 w-4 text-blue-400" />}
                              {evidence.type === "analytics" && <TrendingDown className="h-4 w-4 text-blue-400" />}
                              <span className="text-sm font-medium capitalize text-gray-300">{evidence.type} Data</span>
                            </div>
                            <p className="text-sm text-gray-400">{evidence.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">No Issues Found</h3>
          <p className="text-gray-400">Great! No issues match your current filters.</p>
        </div>
      )}
    </div>
  )
}
