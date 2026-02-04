import { useState } from 'react';
import { Screen, QuizAnswer, QuizSession } from './types';
import { supabase } from './lib/supabase';
import StartScreen from './components/StartScreen';
import NameInputScreen from './components/NameInputScreen';
import CameraScreen from './components/CameraScreen';
import InstructionsScreen from './components/InstructionsScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [sessionData, setSessionData] = useState<Partial<QuizSession>>({
    user_name: '',
    photo_url: '',
    quiz_answers: [],
    gemini_result_url: '',
  });

  const handleStart = () => {
    setCurrentScreen('name-input');
  };

  const handleNameSubmit = (name: string) => {
    setSessionData((prev) => ({ ...prev, user_name: name }));
    setCurrentScreen('camera');
  };

  const handlePhotoCapture = async (photoDataUrl: string) => {
    setSessionData((prev) => ({ ...prev, photo_url: photoDataUrl }));
    setCurrentScreen('instructions');
  };

  const handleInstructionsNext = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = async (answers: QuizAnswer[]) => {
    setSessionData((prev) => ({ ...prev, quiz_answers: answers }));
    setCurrentScreen('loading');

    try {
      const { data: session, error: insertError } = await supabase
        .from('quiz_sessions')
        .insert({
          user_name: sessionData.user_name,
          photo_url: sessionData.photo_url,
          quiz_answers: answers,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const prompt = generatePromptFromAnswers(sessionData.user_name || '', answers);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-portrait`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageData: sessionData.photo_url,
            prompt: prompt,
            sessionId: session.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate AI portrait');
      }

      const result = await response.json();

      await supabase
        .from('quiz_sessions')
        .update({
          gemini_result_url: result.imageUrl,
          gemini_prompt: prompt,
        })
        .eq('id', session.id);

      setSessionData((prev) => ({
        ...prev,
        gemini_result_url: result.imageUrl,
        gemini_prompt: prompt,
      }));

      setCurrentScreen('result');
    } catch (error) {
      console.error('Error processing quiz:', error);
      alert('An error occurred. Please try again.');
      setCurrentScreen('start');
    }
  };

  const handleRestart = () => {
    setSessionData({
      user_name: '',
      photo_url: '',
      quiz_answers: [],
      gemini_result_url: '',
    });
    setCurrentScreen('start');
  };

  const generatePromptFromAnswers = (name: string, answers: QuizAnswer[]): string => {
    const answersText = answers.map((a) => `${a.question}: ${a.answer}`).join('; ');
    return `Create an artistic portrait for ${name} based on these personality traits and preferences: ${answersText}. Make it creative, vibrant, and unique. The style should reflect their personality as indicated by their answers.`;
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
