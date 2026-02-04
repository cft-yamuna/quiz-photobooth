export interface Question {
  id: number;
  question: string;
  options: string[];
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What's your ideal weekend activity?",
    options: [
      'Exploring nature and hiking',
      'Reading a book at a cozy cafe',
      'Attending a concert or party',
      'Working on creative projects',
    ],
  },
  {
    id: 2,
    question: 'Which superpower would you choose?',
    options: [
      'Flying through the skies',
      'Reading minds',
      'Time travel',
      'Invisibility',
    ],
  },
  {
    id: 3,
    question: 'Pick your favorite color palette:',
    options: [
      'Ocean blues and teals',
      'Warm oranges and yellows',
      'Forest greens and browns',
      'Sunset pinks and purples',
    ],
  },
  {
    id: 4,
    question: "What's your dream vacation destination?",
    options: [
      'Tropical beach paradise',
      'Historic European city',
      'Mountain retreat',
      'Bustling Asian metropolis',
    ],
  },
  {
    id: 5,
    question: 'Choose your spirit animal:',
    options: [
      'Wise owl',
      'Playful dolphin',
      'Brave lion',
      'Free-spirited butterfly',
    ],
  },
  {
    id: 6,
    question: 'What describes your personality best?',
    options: [
      'Adventurous and bold',
      'Thoughtful and calm',
      'Energetic and social',
      'Creative and imaginative',
    ],
  },
];
