import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_API_URL,
});

// Create auth link to add JWT token to requests
const authLink = setContext((_, { headers }) => {
  // Get token from secure storage (implement this based on your storage solution)
  const token = null; // TODO: Get from secure storage

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
