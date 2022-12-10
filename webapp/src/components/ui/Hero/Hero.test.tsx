//@ts-nocheck
import React from 'react';
import Hero from './Hero';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import i18n from 'src/i18n';

afterEach(cleanup);

describe('Hero component', () => {
  test('renders title and image', () => {
    const { getByText, getByAltText } = render(<Hero />);
    const title = getByText('hero.title');
    expect(title).toBeInTheDocument();
    const time = getByText('hero.time');
    expect(time).toBeInTheDocument();
    const image = getByAltText('hero image');
    expect(image).toBeInTheDocument();
  });
});
