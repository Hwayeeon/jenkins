import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generateEmbedding, cosineSimilarity } from "./gemini";

export interface ContentChunk {
  id: string;
  type: "project" | "page" | "service";
  title: string;
  content: string;
  url: string;
  locale: string;
  embedding?: number[];
}

export interface EmbeddingsIndex {
  version: string;
  generatedAt: string;
  chunks: ContentChunk[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const EMBEDDINGS_FILE = path.join(DATA_DIR, "embeddings.json");

// Load embeddings index from file
export function loadEmbeddingsIndex(): EmbeddingsIndex | null {
  try {
    if (fs.existsSync(EMBEDDINGS_FILE)) {
      const data = fs.readFileSync(EMBEDDINGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load embeddings index:", error);
  }
  return null;
}

// Save embeddings index to file
export function saveEmbeddingsIndex(index: EmbeddingsIndex): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(index, null, 2));
}

// Extract content from MDX files
export function extractMdxContent(locale: string = "en"): ContentChunk[] {
  const contentDir = path.join(process.cwd(), "content", locale, "projects");
  const chunks: ContentChunk[] = [];

  if (!fs.existsSync(contentDir)) {
    return chunks;
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    const slug = file.replace(/\.mdx$/, "");

    chunks.push({
      id: `project-${locale}-${slug}`,
      type: "project",
      title: data.title || slug,
      content: `Project: ${data.title || slug}\n\nDescription: ${data.description || ""}\n\n${content.slice(0, 2000)}`,
      url: `/${locale}/projects/${slug}`,
      locale,
    });
  }

  return chunks;
}

// Extract page metadata for context
export function extractPageMetadata(locale: string = "en"): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  // Homepage
  chunks.push({
    id: `page-${locale}-home`,
    type: "page",
    title: "Homepage",
    content: `Davidson Rafael's Portfolio Website.
    
Davidson Rafael is an Informatics Engineering Student at UKRIDA and a Web Developer.
The website showcases his projects, skills, and services.

Main sections:
- Projects: Portfolio of development work
- About: Background, skills, and tech stack
- Services: Web development services offered
- Contact: Ways to get in touch
- Downloads: Downloadable resources`,
    url: `/${locale}`,
    locale,
  });

  // About page
  chunks.push({
    id: `page-${locale}-about`,
    type: "page",
    title: "About",
    content: `About Davidson Rafael

Davidson is an Informatics Engineering student at UKRIDA (Universitas Kristen Krida Wacana) in Jakarta, Indonesia.

Tech Stack:
Languages: JavaScript, TypeScript, Python, C++, PHP, Rust, Go
Frameworks: React, Next.js, Vue.js, Node.js, Express, Laravel
Tools: Git, Docker, Linux, PostgreSQL, MongoDB, Redis

He specializes in modern web development with a focus on React and Next.js applications.`,
    url: `/${locale}/about`,
    locale,
  });

  // Services page
  chunks.push({
    id: `page-${locale}-services`,
    type: "service",
    title: "Services",
    content: `Web Development Services offered by Davidson Rafael:

1. Web App Development for UMKM/Students
   - Perfect for small businesses and student projects
   - Modern, responsive websites
   - Affordable pricing starting from IDR 500,000

2. Web App Development for Companies
   - Enterprise-grade web applications
   - Custom features and integrations
   - Full-stack development

3. Managed Hosting
   - Free subdomain included
   - VPS hosting with maintenance
   - Monthly pricing options

4. Automation Scripts
   - Custom automation solutions
   - Bot development
   - Process automation

Contact Davidson for quotes and consultations.`,
    url: `/${locale}/services`,
    locale,
  });

  // Contact page
  chunks.push({
    id: `page-${locale}-contact`,
    type: "page",
    title: "Contact",
    content: `Contact Davidson Rafael

For inquiries about projects, services, or collaborations, you can reach Davidson through:
- Email: davidsonrafael20@gmail.com
- GitHub: Hwayeeon
- Social media links available on the website

Feel free to reach out for web development projects, consultations, or just to say hello!`,
    url: `/${locale}/contact`,
    locale,
  });

  return chunks;
}

// Collect all content chunks from the website
export function collectAllContent(): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  // Collect from both locales
  for (const locale of ["en", "id"]) {
    chunks.push(...extractMdxContent(locale));
    chunks.push(...extractPageMetadata(locale));
  }

  return chunks;
}

// Find relevant content chunks for a query
export async function findRelevantContent(
  query: string,
  topK: number = 3
): Promise<ContentChunk[]> {
  const index = loadEmbeddingsIndex();

  if (!index || index.chunks.length === 0) {
    console.warn("No embeddings index found. Please run the indexing script.");
    return [];
  }

  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);

  // Calculate similarity scores
  const scored = index.chunks
    .filter((chunk) => chunk.embedding && chunk.embedding.length > 0)
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding!),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map((s) => s.chunk);
}

// Build context string from relevant chunks
export function buildContext(chunks: ContentChunk[]): string {
  if (chunks.length === 0) {
    return "No specific context available.";
  }

  return chunks
    .map(
      (chunk, i) =>
        `[Context ${i + 1}: ${chunk.title}]\n${chunk.content}\n`
    )
    .join("\n---\n\n");
}
