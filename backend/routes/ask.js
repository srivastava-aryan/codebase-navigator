import express from "express";
import { askCodebase } from "../qa/askCodebase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const vectorStore = req.app.locals.vectorStore;

  if (!vectorStore) {
    return res.status(400).json({
      error: "Codebase not indexed yet. Call /ingest first."
    });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const response = await askCodebase(vectorStore, question);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to answer question" });
  }
});

export default router;
