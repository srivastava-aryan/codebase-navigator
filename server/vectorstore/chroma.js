import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";

export async function storeEmbeddings(documents) {
  console.log(`🔄 Starting embedding generation for ${documents.length} documents...`);
  
  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434"
  });

  console.log("🔄 Testing Ollama connection...");
  try {
    // Test with a single document first
    await embeddings.embedQuery("test");
    console.log("✅ Ollama connection successful");
  } catch (error) {
    console.error("❌ Ollama connection failed:", error.message);
    throw error;
  }

  console.log("🔄 Generating embeddings (this may take a few minutes)...");
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  console.log("✅ Vector store created successfully!");
  return vectorStore;
}

