import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ArrowLeft, Sparkles, GitBranch } from 'lucide-react';
import { askQuestion } from '../services/api';

interface ChatInterfaceProps {
  repoUrl: string;
  onBack: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: any[];
  timestamp: Date;
}

export default function ChatInterface({ repoUrl, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I've successfully analyzed the repository. I can help you understand the codebase, explain functionality, find specific implementations, or answer any questions about the code structure. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const repoName = repoUrl.replace('https://github.com/', '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      sources: [],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await askQuestion(currentInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources || [],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What is the main purpose of this repository?',
    'Explain the overview of the code',
    'What dependencies does this project use?',
    'How does the authentication work?'
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <header className="relative z-10 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h1 className="font-semibold text-white">{repoName}</h1>
                <p className="text-xs text-gray-500">Ready to answer questions</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-full">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 font-medium">Active</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 animate-shake">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-slide-up ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-gray-300" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                    <div className="mt-3 border-t border-gray-700 pt-2">
                      <p className="text-xs text-gray-400 mb-1">Sources:</p>
                      <ul className="space-y-1">
                        {message.sources.map((source, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-blue-400 hover:underline break-all"
                          >
                            {source}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <span className="text-xs opacity-50 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                {message.role === 'user' && (
                  <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 animate-slide-up">
                <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-gray-300" />
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl px-6 py-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-1"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-2"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-3"></div>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="mt-8 animate-fade-in-delay">
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Suggested questions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="text-left p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the codebase..."
              className="w-full px-6 py-4 pr-14 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg transition-all duration-300 hover:scale-105 disabled:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
