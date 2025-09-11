import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { email, weeklyData } = await request.json()

    // Generate weekly report using AI
    const reportPrompt = `
    Generate a weekly UX report summary based on this data:
    
    Weekly Stats:
    - Total sessions: ${weeklyData?.sessions || 0}
    - New issues found: ${weeklyData?.newIssues || 0}
    - Issues resolved: ${weeklyData?.resolvedIssues || 0}
    - Average session duration: ${weeklyData?.avgDuration || 0} minutes
    - Top pages visited: ${JSON.stringify(weeklyData?.topPages || [])}
    
    Create a concise, plain-text email report that includes:
    1. Executive summary
    2. Key metrics comparison to previous week
    3. Top 3 issues that need attention
    4. Recommendations for the upcoming week
    5. Positive improvements noted
    
    Keep it professional but conversational, under 300 words.
    `

    const { text: reportContent } = await generateText({
      model: openai("gpt-4o"),
      prompt: reportPrompt,
      system: "You are a UX analyst creating weekly reports for product teams. Be concise and actionable.",
    })

    // In a real implementation, you would send this via email service
    // For now, we'll just return the generated report
    const emailReport = {
      to: email,
      subject: `Weekly UX Report - ${new Date().toLocaleDateString()}`,
      content: reportContent,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      report: emailReport,
      message: "Weekly report generated successfully",
    })
  } catch (error) {
    console.error("Weekly report generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate weekly report",
      },
      { status: 500 },
    )
  }
}
