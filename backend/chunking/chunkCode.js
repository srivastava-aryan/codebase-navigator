import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkFiles(files) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 120,
  });

  const documents = [];

  for (const file of files) {
    const chunks = await splitter.createDocuments(
      [file.content],
      [{
        source: file.filePath,
        type: "code"
      }]
    );

    documents.push(...chunks);
  }

  return documents;
}
