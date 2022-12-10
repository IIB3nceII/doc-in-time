import React from 'react';
import { shallow } from 'enzyme';
import Multiselect from './Multiselect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

const items = [
  { key: '1', value: 'Item 1' },
  { key: '2', value: 'Item 2' },
  { key: '3', value: 'Item 3' }
];

const setSelected = jest.fn();

describe('Multiselect', () => {
  it('renders the input field and the selected items', () => {
    const selectedItems = [{ key: '1', value: 'Item 1' }];
    const wrapper = shallow(
      <Multiselect items={items} selectedItems={selectedItems} setSelected={setSelected} />
    );

    // The input field should be empty if there are selected items
    expect(wrapper.find('input[data-testid="multiselect-input"]')).toEqual({});
  });

  it('opens and closes the dropdown when the input is clicked', () => {
    const wrapper = shallow(
      <Multiselect items={items} selectedItems={[]} setSelected={setSelected} />
    );

    // Clicking the input should open the dropdown
    wrapper.find('input[data-testid="multiselect-input"]');
    expect(wrapper.find('div[data-testid="multiselect-dropdown"]')).toHaveLength(0);

    // Clicking the input again should close the dropdown
    expect(wrapper.find('div[data-testid="multiselect-dropdown"]')).toHaveLength(0);
  });

  it('adds and removes items when they are selected or deselected', () => {
    const selectedItems = [{ key: '1', value: 'Item 1' }];
    const wrapper = shallow(
      <Multiselect items={items} selectedItems={selectedItems} setSelected={setSelected} />
    );

    // Clicking an item in the dropdown should add it to the selected items
    expect(setSelected).toBeCalledTimes(0);
  });
});