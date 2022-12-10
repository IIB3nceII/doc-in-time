//@ts-nocheck
import React from 'react';
import LoadingDots from './LoadingDots';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('LoadingDots component', () => {
  test('renders three dots', () => {
    const { container } = render(<LoadingDots />);
    const dots = container.querySelectorAll('span');
    expect(dots).toHaveLength(3);
  });
});
