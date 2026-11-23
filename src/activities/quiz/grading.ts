import type { QuizAnswer, QuizData } from './schema';
import { getQuestionPoints } from './schema';
import { gradeQuestion } from './questions';
import type { TagScore } from '../../core/types';

export function gradeQuiz(data: QuizData, answers: Record<string, unknown>): QuizAnswer[] {
  return data.questions.map((question) => {
    const correct = gradeQuestion(question, answers[question.id]);
    const maxScore = getQuestionPoints(question);
    return {
      questionId: question.id,
      value: answers[question.id],
      correct,
      score: correct ? maxScore : 0,
      maxScore,
      tags: question.tags ?? [],
    };
  });
}

export function summarizeTags(answers: QuizAnswer[]): TagScore[] {
  const map = new Map<string, TagScore>();
  for (const answer of answers) {
    const tags = answer.tags.length > 0 ? answer.tags : ['general'];
    for (const tag of tags) {
      const entry = map.get(tag) ?? { tag, correct: 0, total: 0 };
      entry.total += answer.maxScore;
      entry.correct += answer.score;
      map.set(tag, entry);
    }
  }
  return [...map.values()];
}

export function calculateQuizScore(answers: QuizAnswer[]) {
  const score = answers.reduce((sum, answer) => sum + answer.score, 0);
  const maxScore = answers.reduce((sum, answer) => sum + answer.maxScore, 0);
  return { score, maxScore, percent: maxScore === 0 ? 0 : Math.round((score / maxScore) * 100) };
}
