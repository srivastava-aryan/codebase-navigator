import { useState } from 'react';
import Hero from './components/Hero';
import RepoInput from './components/RepoInput';
import ProcessingAnimation from './components/ProcessingAnimation';
import ChatInterface from './components/ChatInterface';

type AppState = 'hero' | 'input' | 'processing' | 'chat';

function App() {
  const [state, setState] = useState<AppState>('hero');
  const [repoUrl, setRepoUrl] = useState('');
  const [processingStep, setProcessingStep] = useState<'cloning' | 'reading' | 'indexing'>('cloning');

  const handleGetStarted = () => {
    setState('input');
  };

  const handleRepoSubmit = (url: string) => {
    setRepoUrl(url);
    setState('processing');

    setTimeout(() => {
      setProcessingStep('reading');
      setTimeout(() => {
        setProcessingStep('indexing');
        setTimeout(() => {
          setState('chat');
        }, 2000);
      }, 2000);
    }, 2000);
  };

  const handleBack = () => {
    setState('input');
    setRepoUrl('');
    setProcessingStep('cloning');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {state === 'hero' && <Hero onGetStarted={handleGetStarted} />}
      {state === 'input' && <RepoInput onSubmit={handleRepoSubmit} />}
      {state === 'processing' && (
        <ProcessingAnimation step={processingStep} repoUrl={repoUrl} />
      )}
      {state === 'chat' && <ChatInterface repoUrl={repoUrl} onBack={handleBack} />}
    </div>
  );
}

export default App;
