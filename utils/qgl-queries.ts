import { gql } from '@apollo/client';

export const SEARCH_ISSUES_QUERY = gql`
  query SearchIssues($query: String!, $after: String) {
    search(query: $query, type: ISSUE, first: 10, after: $after) {
      edges {
        node {
          ... on Issue {
            id
            title
            body
            state
            number
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const ISSUE_DETAILS_QUERY = gql`
  query IssueDetails($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        title
        body
        comments(first: 10) {
          edges {
            node {
              body
            }
          }
        }
      }
    }
  }
`;
