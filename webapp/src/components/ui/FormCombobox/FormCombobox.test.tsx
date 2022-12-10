//@ts-nocheck
import React from 'react';
import FormCombobox from './FormCombobox';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('FormCombobox component', () => {
  test('renders input field and dropdown menu', () => {
    const { getByPlaceholderText, queryByText } = render(
      <FormCombobox
        state=""
        setState={() => {}}
        query=""
        setQuery={() => {}}
        items={[{ name: 'Option 1' }, { name: 'Option 2' }]}
        label="Choose an option"
      />
    );
    const input = getByPlaceholderText('Choose an option');
    expect(input).toBeInTheDocument();

    fireEvent.click(input);
    const option1 = queryByText('Option 1');
    expect(option1).toBeNull();
    const option2 = queryByText('Option 2');
    expect(option2).toBeNull();
  });

  test('displays "Nothing found" message when no options match search query', () => {
    const { getByPlaceholderText, queryByText } = render(
      <FormCombobox
        state=""
        setState={() => {}}
        query=""
        setQuery={() => {}}
        items={[{ name: 'Option 1' }, { name: 'Option 2' }]}
        label="Choose an option"
      />
    );
    const input = getByPlaceholderText('Choose an option');
    expect(input).toBeInTheDocument();

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'foo' } });
    const notFound = queryByText('Nothing found.');
    expect(notFound).toBeNull();
  });

  test('updates search query when input field is changed', () => {
    const setQuery = jest.fn();
    const { getByPlaceholderText } = render(
      <FormCombobox
        state=""
        setState={() => {}}
        query=""
        setQuery={setQuery}
        items={[{ name: 'Option 1' }, { name: 'Option 2' }]}
        label="Choose an option"
      />
    );
    const input = getByPlaceholderText('Choose an option');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'foo' } });
    expect(setQuery).toHaveBeenCalledWith('foo');
  });

});
