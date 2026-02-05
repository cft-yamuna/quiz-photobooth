import { useState, useRef } from 'react';
import { Screen, QuizAnswer, QuizSession } from './types';
import { generateImageWithGemini, base64ToDataUrl, GeminiImageResult } from './lib/gemini';
import StartScreen from './components/StartScreen';
import NameInputScreen from './components/NameInputScreen';
import CameraScreen from './components/CameraScreen';
import InstructionsScreen from './components/InstructionsScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';

// Cricket portrait prompt for image transformation
const CRICKET_PORTRAIT_PROMPT = `Ultra close-up editorial sports portrait of a professional male cricket batsman, facing from the left side toward the camera (left-profile dominant), tight crop from shoulders to head. Body and face angled clearly from the left, not front-facing. Cricket bat resting on the opposite shoulder, held firmly with both hands in padded gloves.

Expression is subtle and focused — calm intensity, concentrated eyes, composed confidence (not furious, not aggressive).

Appearance reflects a post-play condition — slightly messy, sweat-damp hair, natural flyaways, mild sheen of sweat on skin, signs of exertion, not fresh or groomed, authentic just-finished-playing look.

Wearing a white cricket jersey with a clearly visible Nike swoosh logo on the chest, and Nike-branded padded gloves. Cricket bat branding visible and realistic.

Dark charcoal / deep grey studio background.

Lighting: premium low-key studio lighting inspired by professional sports photography — sculpted key light coming from the front-right to emphasize the left-facing profile, soft rim light outlining shoulders and bat, controlled soft shadows, cinematic contrast without harshness, realistic highlights on fabric and bat texture.

Shallow depth of field, ultra-realistic textures, natural skin tones, sharp details, premium sports editorial campaign aesthetic, high resolution.

No text, no overlays, no effects, no extra props.`;

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [sessionData, setSessionData] = useState<Partial<QuizSession>>({
    user_name: '',
    photo_url: '',
    quiz_answers: [],
    gemini_result_url: '',
  });

  // Store the pending Gemini request promise
  const geminiRequestRef = useRef<Promise<GeminiImageResult> | null>(null);

  const handleStart = () => {
    setCurrentScreen('name-input');
  };

  const handleNameSubmit = (name: string) => {
    setSessionData((prev) => ({ ...prev, user_name: name }));
    setCurrentScreen('camera');
  };

  const handlePhotoCapture = async (photoDataUrl: string) => {
    setSessionData((prev) => ({ ...prev, photo_url: photoDataUrl }));

    // Start Gemini image generation immediately in the background
    // This runs while the user completes the quiz
    geminiRequestRef.current = generateImageWithGemini(CRICKET_PORTRAIT_PROMPT, photoDataUrl);

    setCurrentScreen('instructions');
  };

  const handleInstructionsNext = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = async (answers: QuizAnswer[]) => {
    setSessionData((prev) => ({ ...prev, quiz_answers: answers }));
    setCurrentScreen('loading');

    try {
      // Wait for the already-started Gemini request to complete
      if (!geminiRequestRef.current) {
        throw new Error('Image generation was not started');
      }

      const geminiResult = await geminiRequestRef.current;
      const imageUrl = base64ToDataUrl(geminiResult.imageData, geminiResult.mimeType);

      setSessionData((prev) => ({
        ...prev,
        gemini_result_url: imageUrl,
        gemini_prompt: CRICKET_PORTRAIT_PROMPT,
      }));

      setCurrentScreen('result');
    } catch (error) {
      console.error('Error processing quiz:', error);
      alert('An error occurred. Please try again.');
      setCurrentScreen('start');
    }
  };

  const handleRestart = () => {
    // Clear the pending request
    geminiRequestRef.current = null;

    setSessionData({
      user_name: '',
      photo_url: '',
      quiz_answers: [],
      gemini_result_url: '',
    });
    setCurrentScreen('start');
  };

  return (
    <>
      {currentScreen === 'start' && <StartScreen onStart={handleStart} />}
      {currentScreen === 'name-input' && <NameInputScreen onSubmit={handleNameSubmit} />}
      {currentScreen === 'camera' && (
        <CameraScreen userName={sessionData.user_name || ''} onCapture={handlePhotoCapture} />
      )}
      {currentScreen === 'instructions' && <InstructionsScreen onNext={handleInstructionsNext} />}
      {currentScreen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {currentScreen === 'loading' && <LoadingScreen />}
      {currentScreen === 'result' && (
        <ResultScreen
          userName={sessionData.user_name || ''}
          resultImageUrl={sessionData.gemini_result_url || ''}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;

