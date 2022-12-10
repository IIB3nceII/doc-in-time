import React from 'react';
import Introduction from './Introduction';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import i18n from 'src/i18n';

afterEach(cleanup);

describe('Introduction component', () => {
  test('renders title and cards', () => {
    const { getByText } = render(<Introduction />);
    const title = getByText('introduction.title');
    expect(title).toBeInTheDocument();
    const card1Title = getByText('introduction.card_1.title');
    expect(card1Title).toBeInTheDocument();
    const card1Description = getByText('introduction.card_1.description');
    expect(card1Description).toBeInTheDocument();
    const card2Title = getByText('introduction.card_2.title');
    expect(card2Title).toBeInTheDocument();
    const card2Description = getByText('introduction.card_2.description');
    expect(card2Description).toBeInTheDocument();
    const card3Title = getByText('introduction.card_3.title');
    expect(card3Title).toBeInTheDocument();
    const card3Description = getByText('introduction.card_3.description');
    expect(card3Description).toBeInTheDocument();
  });
});
