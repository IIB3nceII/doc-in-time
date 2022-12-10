import React from 'react';
import { render } from '@testing-library/react';
import AppointmentCard from './AppointmentCard';

// Define a sample user object
const sampleUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  // Add other properties as needed
};

// Define a sample start and end date for the appointment
const startDate = new Date('2022-12-10T10:00:00');
const endDate = new Date('2022-12-10T10:30:00');

describe('AppointmentCard component', () => {
  test('renders the appointment time range', () => {
    const { getByText } = render(
      <AppointmentCard startDate={startDate} endDate={endDate} doc={sampleUser} />
    );
    const timeRangeText = getByText(/10:00 - 10:30/i);
    expect(timeRangeText).toBeInTheDocument();
  });

  test('renders the appointment date', () => {
    const { getByText } = render(
      <AppointmentCard startDate={startDate} endDate={endDate} doc={sampleUser} />
    );
    const dateText = getByText(/2022. 12. 10/i);
    expect(dateText).toBeInTheDocument();
  });

  test('renders the doctor name', () => {
    const { getByText } = render(
      <AppointmentCard startDate={startDate} endDate={endDate} doc={sampleUser} />
    );
    const doctorNameText = getByText(/Dr. Doe Jane/i);
    expect(doctorNameText).toBeInTheDocument();
  });

  test('shows the selected label when isSelected prop is true', () => {
    const { getByText } = render(
      <AppointmentCard startDate={startDate} endDate={endDate} doc={sampleUser} isSelected={true} />
    );
    const selectedText = getByText(/Selected/i);
    expect(selectedText).toBeInTheDocument();
  });

  test('does not show the selected label when isSelected prop is false', () => {
    const { queryByText } = render(
      <AppointmentCard startDate={startDate} endDate={endDate} doc={sampleUser} isSelected={false} />
    );
    const selectedText = queryByText(/Selected/i);
    expect(selectedText).not.toBeInTheDocument();
  });
});
