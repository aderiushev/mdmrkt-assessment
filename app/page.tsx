"use client";
import { client } from "@/utils/gql-client";
import { ApolloProvider } from "@apollo/client";
import IssuesList from "@/components/IssuesList";
import { Suspense } from 'react'

const Root = () => {
  return (
    <Suspense>
      <ApolloProvider client={client}>
        <IssuesList />
      </ApolloProvider>
    </Suspense>
  );
}

export default Root;
