import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation';
import Root from './page';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/utils/gql-client', () => ({
  client: {},
}));

jest.mock('@apollo/client', () => ({
  ApolloProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/IssueDetails', () => {
  const MockIssueDetails = () => <div>IssueDetails Component</div>;
  MockIssueDetails.displayName = 'MockIssueDetails';
  return MockIssueDetails;
});

describe('Root Component', () => {
  it('renders loading state when id is not present', () => {
    (useParams as jest.Mock).mockReturnValue({ id: null });

    const { getByText } = render(<Root />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders IssueDetails component when id is present', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    const { getByText } = render(<Root />);
    expect(getByText('IssueDetails Component')).toBeInTheDocument();
  });
});
