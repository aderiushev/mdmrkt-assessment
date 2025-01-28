'use client';
import { useQuery } from '@apollo/client';
import Markdown from 'react-markdown';
import { SEARCH_ISSUES_QUERY } from '@/utils/qgl-queries';
import {StyledList, StyledListItem, StyledIssuesList, StyledPagination, StyledPaginationButton, StyledListItemTitle, StyledListItemStatus } from "./styles";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import SearchForm from "@/components/SearchForm";
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

const IssueList: React.FC = () => {
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState('');
  const { loading, error, data } = useQuery<IssueList>(SEARCH_ISSUES_QUERY, {
    variables: { query, after },
  });
  const router = useRouter();

  const onPrev = useCallback(() => {
    if (data && data.search.pageInfo.startCursor) {
      setAfter(data.search.pageInfo.startCursor);
    }
  }, [data])

  const onNext = useCallback(() => {
    if (data && data.search.pageInfo.endCursor) {
      setAfter(data?.search.pageInfo.endCursor);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Invalid data</p>;

  return (
    <App>
      <SearchForm onSearch={setQuery} />
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
