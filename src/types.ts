export interface QuizAnswer {
  question: string;
  answer: string;
}

export interface QuizSession {
  id?: string;
  user_name: string;
  photo_url?: string;
  quiz_answers: QuizAnswer[];
  gemini_result_url?: string;
  gemini_prompt?: string;
  created_at?: string;
  updated_at?: string;
}

export type Screen =
  | 'start'
  | 'name-input'
  | 'camera'
  | 'instructions'
  | 'quiz'
  | 'loading'
  | 'result';
