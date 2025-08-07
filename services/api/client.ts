import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';

// Create HTTP link
const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_API_URL,
});

// Create auth link to add JWT token to requests
const authLink = setContext(async (_, { headers }) => {
  try {
    // Get token from secure storage
    const token = await SecureStore.getItemAsync('auth_token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return {
      headers: {
        ...headers,
      },
    };
  }
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
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// Token management utilities
export const tokenManager = {
  async setToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync('auth_token', token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('auth_token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('auth_token');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  },
};

// Cache management utilities
export const cacheManager = {
  /**
   * Clear all Apollo Client cache and reset the store
   * This ensures all cached data is removed when user logs out or account is deleted
   */
  async clearCache(): Promise<void> {
    try {
      // Clear the entire Apollo cache
      await apolloClient.clearStore();
      
      // Reset the store to ensure complete cleanup
      await apolloClient.resetStore();
      
      console.log('Apollo Client cache cleared successfully');
    } catch (error) {
      console.error('Error clearing Apollo Client cache:', error);
    }
  },
};
