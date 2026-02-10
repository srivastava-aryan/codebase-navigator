import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

export async function askCodebase(vectorStore, question) {
  const llm = new ChatOllama({
    model: "qwen2.5-coder:7b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
  });

  // Retrieve relevant documents
  const retriever = vectorStore.asRetriever({ k: 3 });
  const docs = await retriever.invoke(question);

  // Create context from retrieved documents
  const context = docs.map((doc) => doc.pageContent).join("\n\n");

  // Create prompt
  const prompt = PromptTemplate.fromTemplate(`
You are a senior software engineer reviewing a real codebase.

Rules:
- Answer ONLY using the provided code context.
- Reference files or functions when relevant.
- If the answer is not in the context, say "I don't know based on the codebase."
- Do not make assumptions.

Context:
{context}

Question: {question}

Answer:`);

  const formattedPrompt = await prompt.format({ context, question });
  const response = await llm.invoke(formattedPrompt);

  return {
    answer: response.content,
    sources: [...new Set(docs.map((doc) => doc.metadata.source))],
    confidence: docs.length >= 2 ? "high" : "medium",
  };
}
