import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { sessionData, pageData } = await request.json()

    // Prepare data for AI analysis
    const analysisPrompt = `
    Analyze the following UX data and provide specific, actionable insights:
    
    Session Data:
    - Total sessions: ${sessionData?.totalSessions || 0}
    - Average session duration: ${sessionData?.avgDuration || 0} seconds
    - Bounce rate: ${sessionData?.bounceRate || 0}%
    - Pages per session: ${sessionData?.pagesPerSession || 0}
    
    Page Data:
    - Click patterns: ${JSON.stringify(pageData?.clicks || [])}
    - Scroll depth: ${pageData?.scrollDepth || 0}%
    - Form interactions: ${JSON.stringify(pageData?.forms || [])}
    
    Please provide:
    1. Top 3 UX issues identified
    2. Specific recommendations for each issue
    3. Potential impact of fixing each issue
    4. CSS/HTML code suggestions where applicable
    
    Format as JSON with this structure:
    {
      "insights": [
        {
          "title": "Issue title",
          "description": "Detailed description",
          "severity": "critical|high|medium|low",
          "category": "navigation|conversion|engagement|performance",
          "recommendation": "Specific recommendation",
          "codefix": "CSS/HTML code suggestion (optional)",
          "impact": "Expected impact",
          "confidence": 85
        }
      ]
    }
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: analysisPrompt,
      system:
        "You are a UX expert analyzing user behavior data. Provide specific, actionable insights based on the data provided.",
    })

    // Parse the AI response
    let insights
    try {
      insights = JSON.parse(text)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      insights = {
        insights: [
          {
            title: "AI Analysis Generated",
            description: text.substring(0, 200) + "...",
            severity: "medium",
            category: "engagement",
            recommendation: "Review the full AI analysis for detailed recommendations",
            impact: "Varies based on implementation",
            confidence: 75,
          },
        ],
      }
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error("AI Analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze UX data",
        insights: [],
      },
      { status: 500 },
    )
  }
}
