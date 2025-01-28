"use client";
import { useQuery } from '@apollo/client';
import { ISSUE_DETAILS_QUERY } from '@/utils/qgl-queries';
import App from '@/components/App';
import { StyledCommentItem, StyledCommentsList, StyledContainer, StyledToolbar, StyledBackButton, StyledTitle, StyledBody, StyledCommentsTitle } from "./styles";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import Markdown from "react-markdown";

type IssueDetailsProps =  {
  id: number;
}

type CommentEdge = {
  node: {
    body: string;
  }
}

type IssueDetails = {
  repository: {
    issue: {
      title: string;
      body: string;
      comments: {
        edges: CommentEdge[]
      }
    }
  }
}

const IssueDetails: React.FC<IssueDetailsProps> = ({ id }) => {
  const router = useRouter();
  const { loading, error, data } = useQuery<IssueDetails>(ISSUE_DETAILS_QUERY, {
    variables: { number: id },
  });

  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p data-testid="issue-details-error">Error: {error.message}</p>;
  if (!data) return <p>Invalid data</p>;

  return (
    <App>
      <StyledToolbar>
        <StyledBackButton onClick={onBack}>
          Back
        </StyledBackButton>
      </StyledToolbar>

      <StyledContainer data-testid="issue-details-container">
        <StyledTitle>{data.repository.issue.title}</StyledTitle>
        <StyledBody>
          <Markdown>
            {data.repository.issue.body}
          </Markdown>
        </StyledBody>
        <StyledCommentsTitle>Comments</StyledCommentsTitle>
        <StyledCommentsList>
          {data.repository.issue.comments.edges.map((edge, index: number) => (
            <StyledCommentItem key={index}>
              <Markdown>
                {edge.node.body}
              </Markdown>
            </StyledCommentItem>
          ))}
        </StyledCommentsList>
      </StyledContainer>
    </App>
  );
};

export default IssueDetails;
