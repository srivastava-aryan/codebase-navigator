# 🧭 Codebase Navigator

An AI-powered codebase analysis tool that allows you to ask questions about any GitHub repository using natural language. Built with LangChain, Ollama, and RAG (Retrieval Augmented Generation) architecture.

## 🌟 Features

- **Repository Ingestion**: Clone and index any GitHub repository
- **Semantic Code Search**: Ask questions about the codebase in natural language
- **Context-Aware Answers**: Get accurate responses based on actual code content
- **Source Attribution**: See which files were used to generate each answer
- **Local LLM**: Runs entirely on your machine using Ollama (no API keys needed)
- **TypeScript Support**: Full support for JavaScript and TypeScript codebases

## 🏗️ Architecture

This project uses a **RAG (Retrieval Augmented Generation)** pipeline:

1. **Ingestion**: Repository is cloned and code files are read
2. **Chunking**: Files are split into semantic chunks with overlap
3. **Embedding**: Chunks are converted to vector embeddings using `nomic-embed-text`
4. **Storage**: Embeddings are stored in an in-memory vector store
5. **Retrieval**: User questions retrieve the most relevant code chunks
6. **Generation**: LLM generates answers based on retrieved context

## 🛠️ Tech Stack

### Backend
- **Express.js**: REST API server
- **LangChain**: Orchestration framework for LLM workflows
- **Ollama**: Local LLM inference (using `qwen2.5-coder:7b`)
- **nomic-embed-text**: Embedding model for semantic search
- **simple-git**: Git repository cloning
- **MemoryVectorStore**: In-memory vector database

### Models Used
- **LLM**: `qwen2.5-coder:7b` - Code-specialized language model
- **Embeddings**: `nomic-embed-text` - Efficient text embeddings

## 📋 Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v16 or higher)
2. **Ollama** installed and running locally

### Installing Ollama

```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama service
ollama serve
```

### Pull Required Models

```bash
# Pull the code generation model
ollama pull qwen2.5-coder:7b

# Pull the embedding model
ollama pull nomic-embed-text
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/srivastava-aryan/codebase-navigator.git
cd codebase-navigator
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
```

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:5000`


## 🔍 How It Works

### 1. **Repository Ingestion**
- Clones the GitHub repository to `repos/` directory
- Filters files by extension (`.js`, `.ts`, `.jsx`, `.tsx`, `.json`)
- Ignores common directories (`node_modules`, `.git`, `dist`, etc.)

### 2. **Chunking Strategy**
- Uses recursive character splitting
- Chunk size: 600 characters
- Overlap: 120 characters (maintains context between chunks)
- Preserves file metadata (path, type)

### 3. **Embedding Generation**
- Uses Ollama's `nomic-embed-text` model
- Converts code chunks into dense vector representations
- Stores in memory vector database

### 4. **Question Answering**
- Retrieves top 3 most relevant chunks
- Constructs prompt with code context
- Uses `qwen2.5-coder:7b` for code-aware responses
- Returns answer with source attribution

## 🚧 Limitations

- **In-Memory Storage**: Vector store is cleared on server restart
- **File Type Restrictions**: Only processes JS/TS files by default
- **Single Repository**: Can only index one repository at a time
- **No Persistence**: Requires re-ingestion after restart

## 🔮 Future Enhancements

- [ ] Persistent vector storage (ChromaDB, Pinecone)
- [ ] Support for more file types (Python, Go, etc.)
- [ ] Multi-repository indexing
- [ ] Conversation history and context
- [ ] Code summarization features
- [ ] Export Q&A sessions
- [ ] Docker containerization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [LangChain](https://langchain.com) - LLM orchestration framework
- [Ollama](https://ollama.ai) - Local LLM inference
- [Qwen2.5-Coder](https://github.com/QwenLM/Qwen2.5-Coder) - Code-specialized language model
- [nomic-embed-text](https://ollama.ai/library/nomic-embed-text) - Embedding model

## 📧 Contact

Aryan Srivastava - [@srivastava-aryan](https://github.com/srivastava-aryan)

Project Link: [↗️](https://codebase-nav.onrender.com)

---

**Built with ❤️ using LangChain and Ollama**
