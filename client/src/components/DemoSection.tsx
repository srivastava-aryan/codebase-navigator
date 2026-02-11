import { X, Play } from 'lucide-react';
import { useState } from 'react';

interface DemoSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoSteps = [
  {
    title: 'Step 1: Enter Repository URL',
    description: 'Paste any public GitHub repository URL to get started',
    image: '/demo/step1-repo-input.png', // Add your screenshots
  },
  {
    title: 'Step 2: Repository Analysis',
    description: 'Our AI analyzes the repository structure and dependencies',
    image: '/demo/step2-analysis.png',
  },
  {
    title: 'Step 3: Clone Repository',
    description: 'Repository is securely cloned to our servers',
    image: '/demo/step3-cloning.png',
  },
  {
    title: 'Step 4: Ask Questions',
    description: 'Start chatting with AI to understand the codebase',
    image: '/demo/step4-query.png',
  },
];

export default function DemoSection({ isOpen, onClose }: DemoSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="relative max-w-7xl mx-auto bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-gray-700">
            <h2 className="text-4xl font-bold text-white mb-2">Product Demo</h2>
            <p className="text-gray-400">See how easy it is to analyze any GitHub repository</p>
          </div>

          {/* Demo Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex gap-4 px-8 pt-6">
              <button
                onClick={() => setShowVideo(false)}
                className={`pb-4 px-4 font-semibold transition-colors border-b-2 ${
                  !showVideo
                    ? 'text-white border-white'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                Step-by-Step Guide
              </button>
              <button
                onClick={() => setShowVideo(true)}
                className={`pb-4 px-4 font-semibold transition-colors border-b-2 ${
                  showVideo
                    ? 'text-white border-white'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                Video Demo
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {!showVideo ? (
              <div className="space-y-8">
                {/* Step Progress */}
                <div className="flex justify-center gap-2 mb-8">
                  {demoSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeStep
                          ? 'w-12 bg-white'
                          : 'w-2 bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Active Step */}
                <div className="animate-fade-in">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {demoSteps[activeStep].title}
                    </h3>
                    <p className="text-gray-400">{demoSteps[activeStep].description}</p>
                  </div>

                  {/* Screenshot */}
                  <div className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                    <img
                      src={demoSteps[activeStep].image}
                      alt={demoSteps[activeStep].title}
                      className="w-full h-auto"
                      onError={(e) => {
                        // Fallback placeholder
                        e.currentTarget.src = `https://placehold.co/1200x700/1f2937/6b7280?text=${encodeURIComponent(demoSteps[activeStep].title)}`;
                      }}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-400">
                      {activeStep + 1} of {demoSteps.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveStep(Math.min(demoSteps.length - 1, activeStep + 1))
                      }
                      disabled={activeStep === demoSteps.length - 1}
                      className="px-6 py-3 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Full Product Demo</h3>
                  <p className="text-gray-400">Watch our complete walkthrough video</p>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                  <video
                    controls
                    className="w-full h-full"
                    poster="/demo/video-thumbnail.png"
                  >
                    <source src="/demo/product-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Fallback for no video */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500">Demo video will be available soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}