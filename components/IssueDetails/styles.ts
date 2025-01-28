import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
  width: 100%;
`;

export const StyledCommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

export const StyledCommentItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;

  ol, ul {
    padding: inherit;
  }

  p {
    padding: 10px;
  }
`;

export const StyledToolbar = styled.div`

`;

export const StyledBackButton = styled.button`
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

export const StyledBody = styled.div`
  padding: 10px;
  margin-top: 20px;
  
  ol, ul {
    padding: inherit;
  }
  
  p {
    padding: 10px;
  }
`;

export const StyledTitle = styled.h3`
  color: brown;
`;

export const StyledCommentsTitle = styled.h3`
  color: brown;
`;

