const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface IngestResponse {
  message: string;
  totalFiles: number;
  totalChunks: number;
  sampleChunk: any;
  sampleFile: any;
}

export interface AskResponse {
  answer: string;
  sources?: any[];
}

export const ingestRepository = async (repoUrl: string): Promise<IngestResponse> => {
  const response = await fetch(`${API_BASE_URL}/ingest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repoUrl }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to ingest repository');
  }

  return response.json();
};

export const askQuestion = async (question: string): Promise<AskResponse> => {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get answer');
  }

  return response.json();
};