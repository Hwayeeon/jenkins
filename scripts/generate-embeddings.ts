#!/usr/bin/env npx tsx
/**
 * Script to generate embeddings for all website content
 * Run with: npx tsx scripts/generate-embeddings.ts
 */

// Load environment variables from .env.local
import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import {
  collectAllContent,
  saveEmbeddingsIndex,
  type EmbeddingsIndex,
} from "../lib/rag";
import { generateEmbedding } from "../lib/gemini";

async function main() {
  console.log("🔍 Collecting website content...");
  const chunks = collectAllContent();
  console.log(`   Found ${chunks.length} content chunks`);

  console.log("\n🧠 Generating embeddings...");
  let processed = 0;

  for (const chunk of chunks) {
    try {
      process.stdout.write(`   Processing: ${chunk.title}...`);
      chunk.embedding = await generateEmbedding(chunk.content);
      console.log(" ✓");
      processed++;

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log(" ✗");
      console.error(`   Error processing ${chunk.id}:`, error);
    }
  }

  console.log("\n💾 Saving embeddings index...");
  const index: EmbeddingsIndex = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    chunks,
  };
  saveEmbeddingsIndex(index);

  console.log(`\n✅ Done! Generated embeddings for ${processed}/${chunks.length} chunks`);
  console.log("   Saved to: data/embeddings.json");
}

main().catch(console.error);
