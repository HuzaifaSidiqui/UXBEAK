"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, AlertTriangle, CheckCircle, TrendingUp, Code, RefreshCw } from "lucide-react"

interface AIInsight {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  category: "navigation" | "conversion" | "engagement" | "performance"
  recommendation: string
  codefix?: string
  impact: string
  confidence: number
}

const mockInsights: AIInsight[] = [
  {
    id: "1",
    title: "Users struggling with navigation menu",
    description:
      "Analysis shows 67% of users hover over navigation items multiple times before clicking, indicating confusion.",
    severity: "high",
    category: "navigation",
    recommendation:
      "Add clearer labels and consider reorganizing menu structure. Users spend 3.2s longer than average on navigation.",
    codefix: `.nav-item { font-weight: 500; padding: 12px 16px; }\n.nav-item:hover { background: #f3f4f6; }`,
    impact: "Could improve task completion by 23%",
    confidence: 89,
  },
  {
    id: "2",
    title: "Sign-up button placement suboptimal",
    description:
      "Primary CTA receives 40% fewer clicks than industry benchmark. Heat map shows users look for it in top-right corner.",
    severity: "critical",
    category: "conversion",
    recommendation:
      "Move sign-up button to top-right corner and increase contrast. Current placement in sidebar is being missed.",
    codefix: `.cta-button { position: fixed; top: 20px; right: 20px; z-index: 100; }`,
    impact: "Potential 15-20% increase in conversions",
    confidence: 94,
  },
  {
    id: "3",
    title: "Long form abandonment detected",
    description: "Users abandon the contact form at 78% completion rate, with most dropoffs at the phone number field.",
    severity: "medium",
    category: "conversion",
    recommendation: "Make phone number field optional or move it to the end. Consider progressive disclosure.",
    impact: "Could reduce form abandonment by 35%",
    confidence: 76,
  },
  {
    id: "4",
    title: "Scroll depth indicates content issues",
    description:
      "Only 34% of users scroll below the fold on the homepage, suggesting above-fold content needs optimization.",
    severity: "medium",
    category: "engagement",
    recommendation:
      "Add compelling preview content or visual cues to encourage scrolling. Consider hero section redesign.",
    impact: "Improved content engagement expected",
    confidence: 82,
  },
]

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    setInsights(mockInsights)
  }, [])

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      // In real implementation, this would call the AI API
    }, 3000)
  }

  const getSeverityColor = (severity: AIInsight["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: AIInsight["category"]) => {
    switch (category) {
      case "navigation":
        return "🧭"
      case "conversion":
        return "🎯"
      case "engagement":
        return "💡"
      case "performance":
        return "⚡"
      default:
        return "📊"
    }
  }

  const filteredInsights =
    selectedCategory === "all" ? insights : insights.filter((insight) => insight.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">AI Analysis Results</h3>
          <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</p>
        </div>
        <Button onClick={runAnalysis} disabled={isAnalyzing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`} />
          {isAnalyzing ? "Analyzing..." : "Run New Analysis"}
        </Button>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All Issues ({insights.length})</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          {filteredInsights.map((insight) => (
            <Card key={insight.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(insight.category)}</span>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription className="mt-1">{insight.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getSeverityColor(insight.severity)}>{insight.severity.toUpperCase()}</Badge>
                    <div className="text-xs text-gray-500 text-right">{insight.confidence}% confidence</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Recommendation
                  </h4>
                  <p className="text-blue-800">{insight.recommendation}</p>
                </div>

                {insight.codefix && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Suggested Code Fix
                    </h4>
                    <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                      <code>{insight.codefix}</code>
                    </pre>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>{insight.impact}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark as Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Critical Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {insights.filter((i) => i.severity === "critical").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Resolved This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Avg Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
