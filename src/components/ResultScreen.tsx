import { Printer, Download, RotateCcw } from 'lucide-react';

interface ResultScreenProps {
  userName: string;
  resultImageUrl: string;
  onRestart: () => void;
}

export default function ResultScreen({ userName, resultImageUrl, onRestart }: ResultScreenProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImageUrl;
    link.download = `${userName}-ai-portrait.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-red-600 text-white py-8 px-8">
            <h2 className="text-4xl font-bold text-center mb-2">
              Your AI Masterpiece, {userName}!
            </h2>
            <p className="text-center text-amber-50 text-lg">
              A unique artistic portrait created just for you
            </p>
          </div>

          <div className="p-8">
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-8 shadow-inner">
              <img
                src={resultImageUrl}
                alt="AI Generated Portrait"
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handlePrint}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-4 rounded-2xl text-lg font-semibold hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print
              </button>

              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>

              <button
                onClick={onRestart}
                className="bg-gray-200 text-gray-700 px-6 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
