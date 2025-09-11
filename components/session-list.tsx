"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MapPin, Clock, User } from "lucide-react"

interface Session {
  id: string
  userId: string
  duration: number
  pages: number
  location: string
  timestamp: Date
  issues: number
  status: "completed" | "active" | "bounced"
}

const mockSessions: Session[] = [
  {
    id: "1",
    userId: "user_123",
    duration: 324,
    pages: 5,
    location: "New York, US",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    issues: 2,
    status: "completed",
  },
  {
    id: "2",
    userId: "user_456",
    duration: 156,
    pages: 3,
    location: "London, UK",
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
    issues: 0,
    status: "active",
  },
  {
    id: "3",
    userId: "user_789",
    duration: 45,
    pages: 1,
    location: "Tokyo, JP",
    timestamp: new Date(Date.now() - 1000 * 60 * 67),
    issues: 1,
    status: "bounced",
  },
  {
    id: "4",
    userId: "user_101",
    duration: 512,
    pages: 8,
    location: "Berlin, DE",
    timestamp: new Date(Date.now() - 1000 * 60 * 89),
    issues: 3,
    status: "completed",
  },
  {
    id: "5",
    userId: "user_202",
    duration: 234,
    pages: 4,
    location: "Sydney, AU",
    timestamp: new Date(Date.now() - 1000 * 60 * 123),
    issues: 1,
    status: "completed",
  },
]

export function SessionList() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: Session["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "bounced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {mockSessions.map((session) => (
        <div
          key={session.id}
          className={`p-4 border rounded-lg transition-colors ${
            selectedSession === session.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-mono text-sm">{session.userId}</span>
              </div>
              <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
              {session.issues > 0 && (
                <Badge variant="destructive">
                  {session.issues} issue{session.issues > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <Button size="sm" onClick={() => setSelectedSession(session.id)} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Replay
            </Button>
          </div>

          <div className="mt-3 flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDuration(session.duration)}
            </div>
            <div className="flex items-center gap-1">
              <span>{session.pages} pages</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {session.location}
            </div>
            <div>
              {session.timestamp.toLocaleTimeString()} - {session.timestamp.toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}

      {selectedSession && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-2">Session Replay: {selectedSession}</h4>
          <div className="bg-white p-8 rounded border-2 border-dashed border-blue-300 text-center">
            <Play className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Session replay player would be embedded here</p>
            <p className="text-sm text-gray-500 mt-2">Integration with PostHog or OpenReplay session recording</p>
          </div>
        </div>
      )}
    </div>
  )
}
