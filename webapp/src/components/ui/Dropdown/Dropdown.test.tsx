//@ts-nocheck
import React from 'react';
import Dropdown from './Dropdown';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Dropdown', () => {
  it('should render the component', () => {
    const { container } = render(<Dropdown 
      list={[{ key: 1, value: 'Item 1' }, { key: 2, value: 'Item 2' }]}
      selectedItems={[{ key: 1, value: 'Item 1' }]}
      addItem={() => {}}
      removeItem={() => {}}
    />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should add an item when it is clicked', () => {
    const addItem = jest.fn();
    const removeItem = jest.fn();

    render(<Dropdown 
      list={[{ key: 1, value: 'Item 1' }, { key: 2, value: 'Item 2' }]}
      selectedItems={[{ key: 1, value: 'Item 1' }]}
      addItem={addItem}
      removeItem={removeItem}
    />);

    fireEvent.click(screen.getByText('Item 2'));

    expect(addItem).toHaveBeenCalledWith(2);
    expect(removeItem).not.toHaveBeenCalled();
  });

  it('should remove an item when it is clicked', () => {
    const addItem = jest.fn();
    const removeItem = jest.fn();

    render(<Dropdown 
      list={[{ key: 1, value: 'Item 1' }, { key: 2, value: 'Item 2' }]}
      selectedItems={[{ key: 1, value: 'Item 1' }]}
      addItem={addItem}
      removeItem={removeItem}
    />);

    fireEvent.click(screen.getByText('Item 1'));

    expect(addItem).not.toHaveBeenCalled();
    expect(removeItem).toHaveBeenCalledWith(1);
  });
});
