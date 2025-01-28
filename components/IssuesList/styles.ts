import styled from 'styled-components';

export const StyledList = styled.div`

`;

export const StyledListItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
  
  ol, ul {
    padding: inherit;
  }
  
  p {
    padding: 10px;
  }
`;

export const StyledIssuesList = styled.div`
  width: 100%;
`;

export const StyledPagination = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const StyledPaginationButton = styled.button`
  padding: 10px;
  background-color: azure;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: blueviolet;
  font-weight: bold;
  cursor: pointer;
  font-size: 20px;
  
  &:hover {
    background-color: lavenderblush;
  }
`;

export const StyledListItemTitle = styled.h3`
  color: brown;
`;

export const StyledListItemStatus = styled.p`
  color: aquamarine;
`;
