import type { Question, QuizData } from './schema';

function shuffleArray<T>(items: T[], seed?: number): T[] {
  const result = [...items];
  const random = seed === undefined ? Math.random : () => seed;
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQuestions(data: QuizData, seed?: number): QuizData {
  return { ...data, questions: shuffleArray(data.questions, seed) };
}

export function shuffleQuestionOptions(question: Question, seed?: number): Question {
  if (question.type === 'single_choice' || question.type === 'multiple_choice') {
    return { ...question, options: shuffleArray(question.options, seed) };
  }
  return question;
}

export function shuffleQuiz(data: QuizData, optionsEnabled: boolean, seed?: number): QuizData {
  const questions = shuffleArray(data.questions, seed).map((question) =>
    optionsEnabled ? shuffleQuestionOptions(question, seed) : question,
  );
  return { ...data, questions };
}

export { shuffleArray };
