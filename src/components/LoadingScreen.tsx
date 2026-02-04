import { Sparkles, Palette, Wand2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8 flex justify-center relative">
          <div className="relative">
            <Palette className="w-24 h-24 text-white animate-pulse" strokeWidth={1.5} />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-bounce" />
            <Wand2 className="w-8 h-8 text-pink-300 absolute -bottom-2 -left-2 animate-bounce delay-150" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">
          Creating Your Masterpiece
        </h2>

        <p className="text-xl text-indigo-100 mb-12">
          Our AI is analyzing your photo and quiz answers to create a unique artistic portrait just for you...
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-white">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
          </div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-white text-sm">
            This may take a few moments. Please don't refresh the page.
          </p>
        </div>
      </div>
    </div>
  );
}
