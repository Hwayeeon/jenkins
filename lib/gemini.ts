import { GoogleGenAI } from "@google/genai";

// Lazy-initialized Gemini client
let _genai: GoogleGenAI | null = null;

// Get or create Gemini client (lazy initialization)
export function getGenAI(): GoogleGenAI | null {
  if (_genai) return _genai;
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY is not set. AI Assistant will not work.");
    return null;
  }
  
  _genai = new GoogleGenAI({ apiKey });
  return _genai;
}

// Model configuration
// Use gemini-2.5-flash for free tier (better limits)
// Change to "gemini-2.5-pro" if you have billing enabled for better reasoning
export const CHAT_MODEL = "gemini-2.5-flash";
export const EMBEDDING_MODEL = "gemini-embedding-001";

// System prompt for the assistant
export const SYSTEM_PROMPT = `You are an AI assistant for Davidson Rafael's portfolio website. Your role is to help visitors understand his work, projects, and services.

About Davidson Rafael:
- Informatics Engineering Student at UKRIDA
- Web Developer specializing in modern technologies
- Offers web development services for businesses and students

Your guidelines:
1. Be helpful, friendly, and professional
2. Answer questions based on the provided context about the website
3. If you don't know something, say so honestly
4. Keep responses concise but informative
5. You can respond in both English and Indonesian based on the user's language

When answering:
- Reference specific projects or services when relevant
- Provide accurate pricing and service information if asked
- Encourage visitors to explore the portfolio or contact Davidson for inquiries`;

// Generate embeddings for text content
export async function generateEmbedding(text: string): Promise<number[]> {
  const genai = getGenAI();
  if (!genai) {
    throw new Error("Gemini API key not configured");
  }

  const result = await genai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
  });

  return result.embeddings?.[0]?.values || [];
}

// Calculate cosine similarity between two vectors
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}
