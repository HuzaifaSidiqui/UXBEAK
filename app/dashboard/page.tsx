"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IssuesList } from "@/components/issues-list"
import { InstallationGuide } from "@/components/installation-guide"
import { SettingsPanel } from "@/components/settings-panel"
import { Settings, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl animate-pulse"></div>
            <div className="relative bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
              <h1 className="text-3xl font-bold text-white font-unbounded uppercase mb-2">UXBREAK</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg">Analyzing user experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Header */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-6">
        <header className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-white tracking-tight font-unbounded uppercase">UXBREAK</h1>
              <Badge
                variant="outline"
                className="border-white/20 text-white/70 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1"
              >
                AI-Powered Analysis
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab(activeTab === "settings" ? "dashboard" : "settings")}
                className="border-white/20 text-white/80 hover:bg-white/10 bg-transparent backdrop-blur-sm rounded-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                {activeTab === "settings" ? "Dashboard" : "Settings"}
              </Button>
              {activeTab === "dashboard" && (
                <Button
                  size="sm"
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 rounded-full"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`} />
                  {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                </Button>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Content with top padding to account for floating header */}
      <div className="pt-32">
        <div className="container mx-auto px-6 py-12">
          {activeTab === "settings" ? (
            <SettingsPanel />
          ) : (
            /* Main Dashboard Content */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Potential Fixes */}
              <Card className="bg-black/40 backdrop-blur-subtle border-white/10 shadow-2xl shadow-black/50 hover:shadow-blue-500/10 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                    <CardTitle className="text-2xl text-white font-semibold font-unbounded uppercase">
                      Potential Fixes
                    </CardTitle>
                  </div>
                  <CardDescription className="text-white/60 text-base">
                    AI-identified issues that can be resolved to improve user experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IssuesList />
                </CardContent>
              </Card>

              {/* Potential Improvements */}
              <Card className="bg-black/40 backdrop-blur-subtle border-white/10 shadow-2xl shadow-black/50 hover:shadow-blue-500/10 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-white/80 to-white/60 rounded-full"></div>
                    <CardTitle className="text-2xl text-white font-semibold font-unbounded uppercase">
                      Potential Improvements
                    </CardTitle>
                  </div>
                  <CardDescription className="text-white/60 text-base">
                    Enhancement opportunities to optimize your website's performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InstallationGuide />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
