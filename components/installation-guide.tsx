"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, CheckCircle } from "lucide-react"

interface Improvement {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  effort: "low" | "medium" | "high"
  category: "performance" | "conversion" | "engagement" | "accessibility"
}

const mockImprovements: Improvement[] = [
  {
    id: "1",
    title: "Add loading states to buttons",
    description:
      "Implement visual feedback when users click action buttons to improve perceived performance and reduce uncertainty.",
    impact: "medium",
    effort: "low",
    category: "engagement",
  },
  {
    id: "2",
    title: "Implement progressive disclosure",
    description: "Break complex forms into steps to reduce cognitive load and improve completion rates.",
    impact: "high",
    effort: "medium",
    category: "conversion",
  },
  {
    id: "3",
    title: "Add keyboard navigation support",
    description: "Ensure all interactive elements are accessible via keyboard for better accessibility compliance.",
    impact: "medium",
    effort: "medium",
    category: "accessibility",
  },
  {
    id: "4",
    title: "Optimize image loading",
    description: "Implement lazy loading and WebP format to improve page load times and Core Web Vitals scores.",
    impact: "high",
    effort: "low",
    category: "performance",
  },
  {
    id: "5",
    title: "Add micro-interactions",
    description: "Include subtle animations and hover effects to make the interface feel more responsive and engaging.",
    impact: "low",
    effort: "medium",
    category: "engagement",
  },
]

export function InstallationGuide() {
  const getImpactColor = (impact: Improvement["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-white text-black border-white/20"
      case "medium":
        return "bg-white/70 text-black border-white/20"
      case "low":
        return "bg-white/40 text-black border-white/20"
    }
  }

  const getEffortColor = (effort: Improvement["effort"]) => {
    switch (effort) {
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "medium":
        return "bg-white/20 text-white border-white/30"
      case "high":
        return "bg-white/10 text-white/60 border-white/20"
    }
  }

  const getCategoryIcon = (category: Improvement["category"]) => {
    switch (category) {
      case "performance":
        return <Zap className="h-4 w-4" />
      case "conversion":
        return <Target className="h-4 w-4" />
      case "engagement":
        return <TrendingUp className="h-4 w-4" />
      case "accessibility":
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {mockImprovements.map((improvement) => (
        <Card
          key={improvement.id}
          className="bg-black/60 backdrop-blur-subtle border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="text-blue-400 mt-1">{getCategoryIcon(improvement.category)}</div>
                <div>
                  <CardTitle className="text-lg text-white">{improvement.title}</CardTitle>
                  <CardDescription className="text-gray-300 mt-1">{improvement.description}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Impact:</span>
                  <Badge className={getImpactColor(improvement.impact)}>{improvement.impact.toUpperCase()}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Effort:</span>
                  <Badge className={getEffortColor(improvement.effort)}>{improvement.effort.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
