import { GitBranch, FileCode, Database, CheckCircle2 } from 'lucide-react';

interface ProcessingAnimationProps {
  step: 'cloning' | 'reading' | 'indexing';
  repoUrl: string;
}

export default function ProcessingAnimation({ step, repoUrl }: ProcessingAnimationProps) {
  const steps = [
    {
      id: 'cloning',
      icon: GitBranch,
      title: 'Cloning Repository',
      description: 'Downloading repository files from GitHub',
      color: 'blue'
    },
    {
      id: 'reading',
      icon: FileCode,
      title: 'Reading Code',
      description: 'Analyzing files and code structure',
      color: 'cyan'
    },
    {
      id: 'indexing',
      icon: Database,
      title: 'Indexing Content',
      description: 'Building searchable index for AI',
      color: 'purple'
    }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.id === step);
  };

  const repoName = repoUrl.replace('https://github.com/', '');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in text-white">
            Processing Repository
          </h2>
          <p className="text-xl text-gray-400 animate-fade-in-delay">
            {repoName}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>

          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isCompleted = index < getCurrentStepIndex();
            const isPending = index > getCurrentStepIndex();

            return (
              <div
                key={s.id}
                className={`relative pl-24 pb-16 last:pb-0 transition-all duration-500 ${
                  isActive ? 'animate-pulse-subtle' : ''
                }`}
              >
                <div
                  className={`absolute left-0 w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isCompleted
                      ? 'bg-gray-700 border-gray-400 scale-100'
                      : isActive
                      ? 'bg-gray-700 border-gray-300 scale-110 shadow-lg shadow-gray-700/50'
                      : 'bg-gray-800 border-gray-700 scale-90'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-gray-200 animate-scale-in" />
                  ) : (
                    <Icon
                      className={`w-8 h-8 transition-all duration-500 ${
                        isActive
                          ? 'text-white animate-bounce-slow'
                          : isPending
                          ? 'text-gray-600'
                          : 'text-gray-500'
                      }`}
                    />
                  )}
                </div>

                <div
                  className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-500 ${
                    isActive
                      ? 'border-gray-500 shadow-xl shadow-gray-700/30 scale-105'
                      : isCompleted
                      ? 'border-gray-600'
                      : 'border-gray-700'
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-2 transition-colors duration-500 ${
                      isActive
                        ? 'text-white'
                        : isCompleted
                        ? 'text-gray-300'
                        : 'text-gray-500'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`transition-colors duration-500 ${
                      isActive ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {s.description}
                  </p>

                  {isActive && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-1"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-2"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-3"></div>
                      </div>
                      <span className="text-sm text-gray-300 font-medium">Processing...</span>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="mt-4 flex items-center gap-2 text-gray-300 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="relative w-3 h-3">
              <div className="absolute inset-0 bg-gray-500 rounded-full animate-ping"></div>
              <div className="relative bg-gray-500 rounded-full w-3 h-3"></div>
            </div>
            <p className="text-gray-400">
              This usually takes 10-30 seconds depending on repository size
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
