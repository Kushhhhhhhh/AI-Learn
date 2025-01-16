export type Question = {
    question: string;
    options: { [key: string]: string };
    correctAnswer: string;
  };