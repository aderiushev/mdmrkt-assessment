import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import dotenv from 'dotenv';

dotenv.config();

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
