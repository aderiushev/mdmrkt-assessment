import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from './index';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('SearchForm', () => {
  it('renders the form with input, select, and button', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = { query: 'test', status: 'OPEN' };
        return params[key] || null;
      },
    });
    const { getByTestId } = render(<SearchForm onSearch={jest.fn()} />);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('status-select')).toBeInTheDocument();
    expect(getByTestId('search-button')).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when the form is submitted', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = { query: 'test', status: 'OPEN' };
        return params[key] || null;
      },
    });
    const onSearchMock = jest.fn();
    const { getByTestId } = render(<SearchForm onSearch={onSearchMock} />);

    fireEvent.change(getByTestId('search-input'), { target: { value: 'test' } });
    fireEvent.change(getByTestId('status-select'), { target: { value: 'CLOSED' } });
    fireEvent.click(getByTestId('search-button'));

    expect(onSearchMock).toHaveBeenCalledWith({"status": "CLOSED", "term": "test"});
  });
});
