import { ArrowRight, HelpCircle, Clock, Smile } from 'lucide-react';

interface InstructionsScreenProps {
  onNext: () => void;
}

export default function InstructionsScreen({ onNext }: InstructionsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-violet-500 to-pink-600 p-4 rounded-full">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Ready for the Quiz?
          </h2>

          <p className="text-gray-600 text-center mb-10 text-lg">
            Answer 6 fun questions to help our AI create a unique artistic portrait based on your personality!
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 bg-gradient-to-r from-violet-50 to-pink-50 p-5 rounded-2xl">
              <div className="bg-violet-500 p-2 rounded-lg shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Take Your Time</h3>
                <p className="text-gray-600 text-sm">
                  There's no time limit. Choose the answer that feels most like you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 p-5 rounded-2xl">
              <div className="bg-fuchsia-500 p-2 rounded-lg shrink-0">
                <Smile className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Be Yourself</h3>
                <p className="text-gray-600 text-sm">
                  Your answers will help create a personalized AI artwork that reflects your unique personality.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-violet-500 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-violet-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            Start Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
