import React from 'react';
import ConfirmModal from './ConfirmModal';
import { render } from '@testing-library/react';

describe('ConfirmModal', () => {
  test('renders prompt text and buttons', () => {
    const text = 'Are you sure you want to delete this item?';
    const cancelButtonText = 'No, cancel';
    const submitButtonText = 'Yes, delete';

    const { getByText } = render(
      <ConfirmModal
        text={text}
        item={{ id: 1, name: 'Item 1' }}
        cancelButtonText={cancelButtonText}
        submitButtonText={submitButtonText}
        cancel={jest.fn()}
        submit={jest.fn()}
      />
    );

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(cancelButtonText)).toBeInTheDocument();
    expect(getByText(submitButtonText)).toBeInTheDocument();
  });

  test('calls cancel callback when cancel button is clicked', () => {
    const cancel = jest.fn();

    const { getByText } = render(
      <ConfirmModal
        text="Are you sure?"
        item={{ id: 1, name: 'Item 1' }}
        cancel={cancel}
        submit={jest.fn()}
      />
    );

    const cancelButton = getByText('Cancel');
    cancelButton.click();

    expect(cancel).toHaveBeenCalledWith(false);
  });

  test('calls submit callback when submit button is clicked', () => {
    const submit = jest.fn();
    const item = { id: 1, name: 'Item 1' };

    const { getByText } = render(
      <ConfirmModal
        text="Are you sure?"
        item={item}
        cancel={jest.fn()}
        submit={submit}
      />
    );

    const submitButton = getByText('Submit');
    submitButton.click();

    expect(submit).toHaveBeenCalledWith(item);
  });
});
