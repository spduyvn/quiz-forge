import './single-choice';
import './multiple-choice';
import './true-false';
import './fill-blank';
import './matching';

export { getQuestionModule, gradeQuestion, isQuestionAnswered, listQuestionModules } from './registry';
export type { QuestionModule, QuestionRendererProps } from './types';
