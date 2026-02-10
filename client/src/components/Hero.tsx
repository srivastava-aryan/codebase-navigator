import { ArrowRight, Code2, GitBranch, MessageCircle } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-full text-gray-300 text-sm mb-8">
            {/* <span className="relative flex h-2 w-2"> */}
              {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span> */}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
            {/* </span> */}
            New Feature: AI-Powered Code Analysis - Try it Now!
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up text-white">
          Understand Any
          <span className="block text-gray-300 animate-gradient-gray">
            GitHub Repository
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto animate-slide-up-delay">
          Clone, analyze, and chat with any GitHub repository. Get instant answers about code structure, functionality, and implementation details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-2">
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg font-semibold text-lg transition-all duration-300 text-gray-100">
            View Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 animate-fade-in-delay">
          <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Clone Repository</h3>
            <p className="text-gray-400 text-sm">Securely clone any public GitHub repository in seconds</p>
          </div>

          <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Analyze Code</h3>
            <p className="text-gray-400 text-sm">AI-powered analysis of code structure and dependencies</p>
          </div>

          <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Ask Questions</h3>
            <p className="text-gray-400 text-sm">Chat with AI to understand any part of the codebase</p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
    </div>
  );
}
