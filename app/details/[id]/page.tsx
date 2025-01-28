"use client";
import {client} from "@/utils/gql-client";
import {ApolloProvider} from "@apollo/client";
import IssueDetails from "@/components/IssueDetails";
import { useParams } from "next/navigation";

const Root = () => {
  const { id } = useParams();

  if (!id) return <p>Loading...</p>;

  return (
    <ApolloProvider client={client}>
      <IssueDetails id={Number(id)} />
    </ApolloProvider>
  );
}

export default Root;
