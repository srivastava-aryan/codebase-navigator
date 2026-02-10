import express from "express";
import { cloneRepo } from "../ingestion/cloneRepo.js";
import { readRepoFiles } from "../ingestion/readFiles.js";
import { chunkFiles } from "../chunking/chunkCode.js";
import { storeEmbeddings } from "../vectorstore/chroma.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) {
      return res.status(400).json({ error: "Repo URL is required" });
    }

    const repoPath = await cloneRepo(repoUrl);
    console.log("Repository cloned to:", repoPath);
    const files = await readRepoFiles(repoPath);
    console.log("Files read from repository:", files.length);
    const documents = await chunkFiles(files);
    console.log("Files chunked into documents:", documents.length);
    console.log(`🧠 Creating embeddings for ${documents.length} chunks`);
    const vectorStore = await storeEmbeddings(documents);
    console.log("✅ Embeddings stored in memory");
    req.app.locals.vectorStore = vectorStore;
    console.log("✅ Vector store ready for Q&A");
    

    res.json({
      message: "Repository ingested successfully",
      totalFiles: files.length,
      totalChunks: documents.length,
      sampleChunk: documents[0],
      //   nextChunk: documents[1],
      sampleFile: files[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to ingest repository" });
  }
});

export default router;
