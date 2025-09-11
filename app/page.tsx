import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Eye, Mail, BarChart3, MousePointer, Clock } from "lucide-react"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">UX Copilot</h1>
          </div>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered UX Analysis
        </Badge>
        <h2 className="text-5xl font-bold text-gray-900 mb-6 dark:text-gray-100">
          Diagnose UX Problems
          <br />
          <span className="text-blue-600 dark:text-blue-500">Before They Kill Conversions</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-400">
          A lightweight tool that monitors your web apps and continuously diagnoses UX issues using behavioral data +
          AI. Built specifically for SaaS and dashboard-heavy applications.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Start Analyzing
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 bg-transparent dark:text-gray-100 dark:border-gray-500"
          >
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">Core Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <MousePointer className="h-8 w-8 text-blue-600 mb-2 dark:text-blue-500" />
              <CardTitle className="dark:text-gray-100">Session Recording</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Track clicks, scrolls, and user journeys with a simple JavaScript snippet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
                <li>• Real-time session capture</li>
                <li>• Click and scroll tracking</li>
                <li>• Page navigation monitoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <Eye className="h-8 w-8 text-green-600 mb-2 dark:text-green-500" />
              <CardTitle className="dark:text-gray-100">Smart Heatmaps</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Visualize user behavior patterns and identify problem areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
                <li>• Click density visualization</li>
                <li>• Scroll depth analysis</li>
                <li>• Attention mapping</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <Brain className="h-8 w-8 text-purple-600 mb-2 dark:text-purple-500" />
              <CardTitle className="dark:text-gray-100">AI UX Analysis</CardTitle>
              <CardDescription className="dark:text-gray-400">
                GPT-powered insights that identify specific UX problems and solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
                <li>• Automated issue detection</li>
                <li>• Actionable recommendations</li>
                <li>• CSS/HTML fix suggestions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-orange-600 mb-2 dark:text-orange-500" />
              <CardTitle className="dark:text-gray-100">Single App Dashboard</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Centralized view of all UX metrics and session replays
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
                <li>• Session replay viewer</li>
                <li>• Performance metrics</li>
                <li>• Issue prioritization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <Mail className="h-8 w-8 text-red-600 mb-2 dark:text-red-500" />
              <CardTitle className="dark:text-gray-100">Weekly Reports</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Automated email summaries of top UX issues and improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
                <li>• Plain-text summaries</li>
                <li>• Priority issue ranking</li>
                <li>• Progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <Clock className="h-8 w-8 text-blue-600 mb-2 dark:text-blue-500" />
              <CardTitle className="dark:text-gray-100">Real-time Monitoring</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Continuous monitoring of user behavior patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
                <li>• Live session tracking</li>
                <li>• Instant problem alerts</li>
                <li>• Behavioral trend analysis</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Target Users */}
      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">Perfect For</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-blue-900">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-gray-100">SaaS Applications</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Dashboard-heavy web apps that need continuous UX optimization
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900">
                <Brain className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-gray-100">Product Teams</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Product managers and growth teams seeking data-driven insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-purple-900">
                <Eye className="h-8 w-8 text-purple-600 dark:text-purple-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-gray-100">UX Designers</h4>
              <p className="text-gray-600 dark:text-gray-400">Designers seeking post-launch feedback and validation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Improve Your UX?</h3>
          <p className="text-xl mb-8 opacity-90">Start tracking user behavior and get AI-powered insights in minutes</p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6" />
            <span className="text-lg font-semibold">UX Copilot</span>
          </div>
          <p className="text-gray-400">AI-powered UX analysis for modern web applications</p>
        </div>
      </footer>
    </div>
  )
}
