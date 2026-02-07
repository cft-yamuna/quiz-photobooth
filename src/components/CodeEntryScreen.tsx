import { useState } from 'react';
import { KeyRound, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { validateCode } from '../lib/supabase';

interface CodeEntryScreenProps {
  onCodeValid: (rowId: number) => void;
}

export default function CodeEntryScreen({ onCodeValid }: CodeEntryScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setError('Please enter a code');
      triggerShake();
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await validateCode(trimmedCode);

      if (result.valid && result.rowId !== null) {
        onCodeValid(result.rowId);
      } else if (result.used) {
        setError('This code has already been used.');
        triggerShake();
      } else {
        setError('Invalid code. Please try again.');
        triggerShake();
      }
    } catch {
      setError('Something went wrong. Please try again.');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full">
            <KeyRound className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-3">
          Enter Access Code
        </h1>

        <p className="text-lg text-indigo-100 mb-10">
          Please enter your unique code to start the experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`relative ${isShaking ? 'animate-shake' : ''}`}>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your code"
              className="w-full px-6 py-4 text-lg text-center rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-200 tracking-widest uppercase"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-200">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-2xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
