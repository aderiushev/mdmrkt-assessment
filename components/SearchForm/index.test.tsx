import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from './index';

describe('SearchForm', () => {
  it('renders the form with input, select, and button', () => {
    const { getByTestId } = render(<SearchForm onSearch={jest.fn()} />);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('status-select')).toBeInTheDocument();
    expect(getByTestId('search-button')).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when the form is submitted', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = render(<SearchForm onSearch={onSearchMock} />);

    fireEvent.change(getByTestId('search-input'), { target: { value: 'test' } });
    fireEvent.change(getByTestId('status-select'), { target: { value: 'CLOSED' } });
    fireEvent.click(getByTestId('search-button'));

    expect(onSearchMock).toHaveBeenCalledWith('repo:facebook/react is:issue is:closed test');
  });
});
