'use client';
import { useQuery } from '@apollo/client';
import Markdown from 'react-markdown';
import { SEARCH_ISSUES_QUERY } from '@/utils/qgl-queries';
import {StyledList, StyledListItem, StyledIssuesList, StyledPagination, StyledPaginationButton, StyledListItemTitle, StyledListItemStatus } from "./styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import SearchForm, {OnSearchPayload} from "@/components/SearchForm";
import App from "@/components/App";

type IssueEdge = {
  node: {
    id: string;
    title: string;
    body: string;
    state: string;
    number: number;
  }
}

type IssueList = {
  search: {
    edges: IssueEdge[],
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      startCursor: string;
      hasPreviousPage: boolean;
    }
  }
}

type Pagination = {
  after?: string;
  before?: string;
}

const IssueList: React.FC = () => {
  const searchParams = useSearchParams();
  const afterParam = searchParams.get('after') || undefined;
  const beforeParam = searchParams.get('before') || undefined;
  const [pagination, setPagination] = useState<Pagination>({ after: afterParam, before: beforeParam});
  const [query, setQuery] = useState('');
  const { loading, error, data } = useQuery<IssueList>(SEARCH_ISSUES_QUERY, {
    variables: { query, after: pagination.after, before: pagination.before },
  });
  const router = useRouter();

  const onPrev = useCallback(() => {
    if (data && data.search.pageInfo.startCursor) {
      const before = data.search.pageInfo.startCursor;
      setPagination({
        after: undefined,
        before,
      })
      const query = searchParams.get('query') || '';
      const status = searchParams.get('status') || 'OPEN';
      router.push(`/?query=${encodeURIComponent(query)}&status=${status}&before=${before}`);
    }
  }, [data, router, searchParams])

  const onNext = useCallback(() => {
    if (data && data.search.pageInfo.endCursor) {
      const after = data.search.pageInfo.endCursor
      setPagination({
        after,
        before: undefined
      })
      const query = searchParams.get('query') || '';
      const status = searchParams.get('status') || 'OPEN';
      router.push(`/?query=${encodeURIComponent(query)}&status=${status}&after=${after}`);
    }
  }, [data, router, searchParams]);

  const onSearch = useCallback((payload: OnSearchPayload) => {
    setQuery(`repo:facebook/react is:issue is:${payload.status.toLowerCase()} ${payload.term}`);
    router.push(`/?query=${encodeURIComponent(payload.term)}&status=${payload.status}`);
  }, [router]);

  useEffect(() => {
    const query = searchParams.get('query');
    const status = searchParams.get('status');
    if (query && status) {
      setQuery(`repo:facebook/react is:issue is:${status} ${query}`);
    }
  }, [searchParams]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Invalid data</p>;

  return (
    <App>
      <SearchForm onSearch={onSearch} />
      <StyledIssuesList>
        <StyledList data-testid="issues-list">
          {data.search.edges.map((edge, index) => (
            <StyledListItem
              key={edge.node.id}
              onClick={() => {
                router.push(`/details/${edge.node.number}`);
              }}
            >
              <StyledListItemTitle data-testid={`issues-list-item-title-${index}`}>{edge.node.title}</StyledListItemTitle>
              <Markdown>{edge.node.body}</Markdown>
              <StyledListItemStatus data-testid="issue-item-status">Status: {edge.node.state}</StyledListItemStatus>
            </StyledListItem>
          ))}
        </StyledList>

        {!!data.search.edges.length && (
          <StyledPagination>
            {data.search.pageInfo.hasPreviousPage && (
              <StyledPaginationButton onClick={onPrev} data-testid="prev-page-button">prev.</StyledPaginationButton>
            )}

            {data.search.pageInfo.hasNextPage && (
              <StyledPaginationButton onClick={onNext} data-testid="next-page-button">next</StyledPaginationButton>
            )}
          </StyledPagination>
        )}
      </StyledIssuesList>
    </App>
  );
};

export default IssueList;
