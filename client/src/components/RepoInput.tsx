import { useState } from 'react';
import { Github, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { ingestRepository } from '../services/api';

interface RepoInputProps {
  onSubmit: (url: string) => void;
}

export default function RepoInput({ onSubmit }: RepoInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateGithubUrl = (url: string): boolean => {
    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGithubUrl(url)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)');
      return;
    }

    setLoading(true);
    try {
      await ingestRepository(url);
      onSubmit(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to ingest repository');
    } finally {
      setLoading(false);
    }
  };

  const exampleRepos = [
    'https://github.com/facebook/react',
    'https://github.com/vercel/next.js',
    'https://github.com/microsoft/vscode'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="text-center mb-12 animate-fade-in">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-full text-gray-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Step 1 of 2
          </div> */}
          <h2 className="text-5xl font-bold mb-4 text-white">
            Enter Repository URL
          </h2>
          <p className="text-xl text-gray-400">
            Paste the GitHub repository URL you want to analyze
          </p>
        </div>

        <form onSubmit={handleSubmit} className="animate-slide-up">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Github className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full px-14 py-5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 transition-all text-lg backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 animate-shake">
              {error}
            </div>
          )}
        </form>

        <div className="mt-12 animate-fade-in-delay">
          <p className="text-gray-500 text-sm mb-4 text-center">Try one of these examples:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {exampleRepos.map((repo, index) => (
              <button
                key={index}
                onClick={() => setUrl(repo)}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {repo.replace('https://github.com/', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl animate-fade-in-delay">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-white">What happens next?</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                  We&apos;ll securely clone the repository
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                  AI will analyze the code structure and content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                  You can start asking questions about the codebase
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
