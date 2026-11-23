import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import QuizPlayer from '../Player';
import { quizSamples } from '../samples';

const sample = quizSamples[1].data;

describe('QuizPlayer', () => {
  it('allows submitting an incomplete quiz and shows the result', () => {
    const onFinish = vi.fn();
    render(<QuizPlayer data={sample} activityId="quiz" lang="vi" onFinish={onFinish} />);

    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }));

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', { name: 'Kết quả của bạn' })).toBeTruthy();
    expect(screen.getByText(/0\/5 câu đúng/)).toBeTruthy();
  });

  it('can restart after submitting', () => {
    const onFinish = vi.fn();
    render(<QuizPlayer data={sample} activityId="quiz" lang="vi" onFinish={onFinish} />);

    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }));
    fireEvent.click(screen.getByRole('button', { name: 'Làm lại bài' }));

    expect(screen.getByText(/Câu 1\/5/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Nộp bài' })).toBeTruthy();
  });
});
