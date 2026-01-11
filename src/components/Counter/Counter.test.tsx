import { render, screen, fireEvent } from '@testing-library/react';
import type { CounterState } from '@/types/collaboration';

import { Counter } from './Counter';

jest.mock('@/hooks/useCurrentTime/useCurrentTime', () => ({
  useCurrentTime: jest.fn(() => Date.now()),
}));

describe('Counter', () => {
  const mockCounter: CounterState = {
    value: 5,
    timestamp: Date.now(),
    lastActionBy: 'John Doe',
    lastActionTimestamp: Date.now() - 5000,
  };

  const mockOnIncrement = jest.fn();
  const mockOnDecrement = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders counter with current value', () => {
    render(
      <Counter
        counter={mockCounter}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );

    expect(screen.getByTestId('timesClicked')).toBeInTheDocument();
    expect(screen.getByText('Counter')).toBeInTheDocument();
  });

  it('displays last action information', () => {
    render(
      <Counter
        counter={mockCounter}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );

    expect(screen.getByText(/Clicked by/i)).toBeInTheDocument();
    expect(screen.getByTestId('actionBy')).toBeInTheDocument();
  });

  it('calls onIncrement when Increment button is clicked', () => {
    render(
      <Counter
        counter={mockCounter}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );

    const incrementButton = screen.getByTestId('Increment');
    fireEvent.click(incrementButton);

    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when Decrement button is clicked', () => {
    render(
      <Counter
        counter={mockCounter}
        onIncrement={mockOnIncrement}
        onDecrement={mockOnDecrement}
      />
    );

    const decrementButton = screen.getByTestId('Decrement');
    fireEvent.click(decrementButton);

    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
  });
});
