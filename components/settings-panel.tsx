"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, BarChart3, Eye, CheckCircle, AlertCircle, ExternalLink, Zap } from "lucide-react"

interface ConnectionStatus {
  connected: boolean
  lastSync?: Date
  status: "active" | "error" | "pending"
}

export function SettingsPanel() {
  const [clarityId, setClarityId] = useState("")
  const [gaId, setGaId] = useState("")
  const [clarityStatus, setClarityStatus] = useState<ConnectionStatus>({
    connected: false,
    status: "pending",
  })
  const [gaStatus, setGaStatus] = useState<ConnectionStatus>({
    connected: false,
    status: "pending",
  })
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleClarityConnect = async () => {
    if (!clarityId.trim()) return

    setIsConnecting("clarity")
    // Simulate connection process
    setTimeout(() => {
      setClarityStatus({
        connected: true,
        lastSync: new Date(),
        status: "active",
      })
      setIsConnecting(null)
    }, 2000)
  }

  const handleGAConnect = async () => {
    if (!gaId.trim()) return

    setIsConnecting("ga")
    // Simulate connection process
    setTimeout(() => {
      setGaStatus({
        connected: true,
        lastSync: new Date(),
        status: "active",
      })
      setIsConnecting(null)
    }, 2000)
  }

  const getStatusIcon = (status: ConnectionStatus) => {
    if (status.connected && status.status === "active") {
      return <CheckCircle className="h-4 w-4 text-green-400" />
    }
    if (status.status === "error") {
      return <AlertCircle className="h-4 w-4 text-red-400" />
    }
    return <AlertCircle className="h-4 w-4 text-gray-400" />
  }

  const getStatusBadge = (status: ConnectionStatus) => {
    if (status.connected && status.status === "active") {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
    }
    if (status.status === "error") {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>
    }
    return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Not Connected</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-md"></div>
          <Settings className="relative h-8 w-8 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white font-unbounded uppercase">Settings</h2>
          <p className="text-white/60">Connect your analytics tools to enable AI-powered UX analysis</p>
        </div>
      </div>

      {/* Microsoft Clarity Connection */}
      <Card className="bg-black/60 backdrop-blur-subtle border-white/10 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-400" />
              <div>
                <CardTitle className="text-white">Microsoft Clarity</CardTitle>
                <CardDescription className="text-gray-300">
                  Connect your Clarity project to analyze user behavior and heatmaps
                </CardDescription>
              </div>
            </div>
            {getStatusIcon(clarityStatus)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusBadge(clarityStatus)}
              {clarityStatus.lastSync && (
                <span className="text-xs text-gray-400">Last sync: {clarityStatus.lastSync.toLocaleString()}</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
              onClick={() => window.open("https://clarity.microsoft.com", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Clarity
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="clarity-id" className="text-white text-sm font-medium">
                Clarity Project ID
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="clarity-id"
                  placeholder="e.g., abc123def4"
                  value={clarityId}
                  onChange={(e) => setClarityId(e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={handleClarityConnect}
                  disabled={!clarityId.trim() || isConnecting === "clarity"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isConnecting === "clarity" ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-400 bg-white/5 p-3 rounded-lg">
              <p className="font-medium mb-1">How to find your Clarity Project ID:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to your Clarity dashboard</li>
                <li>Select your project</li>
                <li>Copy the Project ID from the URL or settings</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics Connection */}
      <Card className="bg-black/60 backdrop-blur-subtle border-white/10 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-400" />
              <div>
                <CardTitle className="text-white">Google Analytics</CardTitle>
                <CardDescription className="text-gray-300">
                  Connect your GA4 property to analyze traffic patterns and conversions
                </CardDescription>
              </div>
            </div>
            {getStatusIcon(gaStatus)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusBadge(gaStatus)}
              {gaStatus.lastSync && (
                <span className="text-xs text-gray-400">Last sync: {gaStatus.lastSync.toLocaleString()}</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
              onClick={() => window.open("https://analytics.google.com", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Analytics
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="ga-id" className="text-white text-sm font-medium">
                GA4 Measurement ID
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="ga-id"
                  placeholder="e.g., G-XXXXXXXXXX"
                  value={gaId}
                  onChange={(e) => setGaId(e.target.value)}
                  className="bg-black/40 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={handleGAConnect}
                  disabled={!gaId.trim() || isConnecting === "ga"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isConnecting === "ga" ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-400 bg-white/5 p-3 rounded-lg">
              <p className="font-medium mb-1">How to find your GA4 Measurement ID:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to Google Analytics</li>
                <li>Select Admin → Data Streams</li>
                <li>Click on your web stream</li>
                <li>Copy the Measurement ID (starts with G-)</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Settings */}
      <Card className="bg-black/60 backdrop-blur-subtle border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Analysis Settings</CardTitle>
          <CardDescription className="text-gray-300">Configure how UX Copilot analyzes your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white text-sm font-medium">Real-time Analysis</Label>
              <p className="text-xs text-gray-400">Continuously analyze user behavior as it happens</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white text-sm font-medium">Weekly Reports</Label>
              <p className="text-xs text-gray-400">Receive automated UX insights via email</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white text-sm font-medium">Advanced AI Analysis</Label>
              <p className="text-xs text-gray-400">Use GPT-4 for deeper insights and recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Connection Status Summary */}
      {(clarityStatus.connected || gaStatus.connected) && (
        <Card className="bg-blue-500/10 backdrop-blur-subtle border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-white">Connections Active</h3>
            </div>
            <p className="text-sm text-white/80 mb-4">
              UX Copilot is now analyzing your data and will provide AI-powered insights based on user behavior
              patterns.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                View Analysis
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
              >
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
