import { type NextRequest, NextResponse } from "next/server"

// Mock session data storage (in production, use a real database)
const sessions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json()

    // Store session data
    const session = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...sessionData,
    }

    sessions.push(session)

    return NextResponse.json({ success: true, sessionId: session.id })
  } catch (error) {
    return NextResponse.json({ error: "Failed to store session data" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ sessions })
}
