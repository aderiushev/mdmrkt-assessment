"use client";
import { client } from "@/utils/gql-client";
import { ApolloProvider } from "@apollo/client";
import IssuesList from "@/components/IssuesList";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <IssuesList />
    </ApolloProvider>
  );
}

export default Root;
