"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MousePointer, Eye, Scroll } from "lucide-react"

const mockPages = [
  { id: "home", name: "Homepage", url: "/", clicks: 1247 },
  { id: "dashboard", name: "Dashboard", url: "/dashboard", clicks: 892 },
  { id: "settings", name: "Settings", url: "/settings", clicks: 456 },
  { id: "profile", name: "Profile", url: "/profile", clicks: 234 },
]

export function HeatmapViewer() {
  const [selectedPage, setSelectedPage] = useState("home")
  const [heatmapType, setHeatmapType] = useState<"clicks" | "scroll" | "attention">("clicks")

  const selectedPageData = mockPages.find((p) => p.id === selectedPage)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Select Page</label>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockPages.map((page) => (
                <SelectItem key={page.id} value={page.id}>
                  {page.name} ({page.url})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Heatmap Type</label>
          <Select value={heatmapType} onValueChange={(value: any) => setHeatmapType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clicks">Click Heatmap</SelectItem>
              <SelectItem value="scroll">Scroll Depth</SelectItem>
              <SelectItem value="attention">Attention Map</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Heatmap Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedPageData?.clicks.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Scroll className="h-4 w-4" />
              Avg Scroll Depth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Attention Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4/10</div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {heatmapType === "clicks" && <MousePointer className="h-5 w-5" />}
            {heatmapType === "scroll" && <Scroll className="h-5 w-5" />}
            {heatmapType === "attention" && <Eye className="h-5 w-5" />}
            {heatmapType === "clicks" && "Click Heatmap"}
            {heatmapType === "scroll" && "Scroll Depth Map"}
            {heatmapType === "attention" && "Attention Heatmap"}
          </CardTitle>
          <CardDescription>
            {selectedPageData?.name} - {selectedPageData?.url}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-lg border-2 border-dashed border-gray-300 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-full mx-auto mb-4 opacity-60"></div>
              <h3 className="text-lg font-semibold mb-2">Interactive Heatmap</h3>
              <p className="text-gray-600 mb-4">
                {heatmapType === "clicks" && "Red areas show high click density, blue areas show low activity"}
                {heatmapType === "scroll" && "Shows how far users scroll down the page"}
                {heatmapType === "attention" && "Highlights areas that capture user attention"}
              </p>
              <p className="text-sm text-gray-500">
                Heatmap visualization would be rendered here using canvas or SVG overlay
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Low engagement in sidebar</p>
                <p className="text-sm text-gray-600">Only 23% of users interact with the navigation sidebar</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">CTA button missed</p>
                <p className="text-sm text-gray-600">Primary action button receives 40% fewer clicks than expected</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Header performs well</p>
                <p className="text-sm text-gray-600">Navigation links in header show strong engagement</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
