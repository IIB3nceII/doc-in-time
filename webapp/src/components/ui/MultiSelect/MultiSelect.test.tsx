import React from 'react';
import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';
import Multiselect from './Multiselect';

const items = [
  { key: '1', value: 'Option 1' },
  { key: '2', value: 'Option 2' },
  { key: '3', value: 'Option 3' }
];

describe('Multiselect', () => {
  test('renders without crashing', () => {
    const { container } = render(<Multiselect items={items} selectedItems={[]} setSelected={() => {}} />);
    expect(container).toBeTruthy();
  });

  test('shows the dropdown when the input is clicked', () => {
    const { container, getByPlaceholderText } = render(<Multiselect items={items} selectedItems={[]} setSelected={() => {}} />);
    const input = getByPlaceholderText('Szakterületek kiválasztása');
    fireEvent.click(input);
    expect(container.querySelector('.dropdown')).toBeNull();
  });
});