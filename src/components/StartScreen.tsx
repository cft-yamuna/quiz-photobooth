import { Camera, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Camera className="w-24 h-24 text-white" strokeWidth={1.5} />
            <Sparkles className="w-12 h-12 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">
          Quiz Booth
        </h1>

        <p className="text-xl text-blue-50 mb-12 max-w-lg mx-auto">
          Take a photo, answer fun questions, and get an AI-generated artistic version of yourself!
        </p>

        <button
          onClick={onStart}
          className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
        >
          Start Experience
        </button>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">1</div>
            <div className="text-sm text-blue-100">Take Photo</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">2</div>
            <div className="text-sm text-blue-100">Answer Quiz</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">3</div>
            <div className="text-sm text-blue-100">Get AI Art</div>
          </div>
        </div>
      </div>
    </div>
  );
}
