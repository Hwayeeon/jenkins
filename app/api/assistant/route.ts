import { NextRequest, NextResponse } from "next/server";
import { getGenAI, CHAT_MODEL, SYSTEM_PROMPT } from "@/lib/gemini";
import { findRelevantContent, buildContext } from "@/lib/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const genai = getGenAI();
    if (!genai) {
      return NextResponse.json(
        { error: "AI Assistant not configured. Please add GEMINI_API_KEY." },
        { status: 503 }
      );
    }

    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Find relevant content using RAG
    let context = "";
    try {
      const relevantChunks = await findRelevantContent(message, 3);
      context = buildContext(relevantChunks);
    } catch (error) {
      console.warn("RAG retrieval failed, continuing without context:", error);
      context = "No additional context available.";
    }

    // Build the conversation with context
    const enhancedSystemPrompt = `${SYSTEM_PROMPT}

---
RELEVANT WEBSITE CONTENT:
${context}
---

Use the above context to provide accurate, helpful answers about the website.`;

    // Format history for Gemini
    const formattedHistory = history.map((msg: ChatMessage) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Create a chat session
    const chat = genai.chats.create({
      model: CHAT_MODEL,
      history: formattedHistory,
      config: {
        systemInstruction: enhancedSystemPrompt,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage({ message });
    const responseText = result.text || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({
      response: responseText,
      success: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
