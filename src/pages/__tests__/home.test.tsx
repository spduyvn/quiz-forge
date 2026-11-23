import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('shows the English sample quiz with its first question', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'English Basics', level: 1 })).toBeTruthy();
    expect(screen.getByText('Which word means the opposite of “hot”?')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Mở nội dung của tôi' }).getAttribute('href')).toBe('/open');
  });
});
