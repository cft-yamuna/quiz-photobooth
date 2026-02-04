import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { quizQuestions } from '../data/questions';
import { QuizAnswer } from '../types';

interface QuizScreenProps {
  onComplete: (answers: QuizAnswer[]) => void;
}

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [
        ...answers,
        { question: question.question, answer: selectedOption },
      ];
      setAnswers(newAnswers);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-teal-600 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-semibold text-lg">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-white font-semibold text-lg">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {question.question}
            </h2>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selectedOption === option
                      ? 'border-teal-500 bg-teal-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-800 font-medium">
                      {option}
                    </span>
                    {selectedOption === option && (
                      <div className="bg-teal-500 rounded-full p-1">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
