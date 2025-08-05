import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '@/services/graphql/transactions.queries';
import { GetTransactionsResponse, GetTransactionsVariables } from '@/models/transaction';

/**
 * Hook for fetching paginated transactions list
 * Provides transactions with pagination support
 */
export const useTransactions = (limit?: number, page?: number) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetTransactionsResponse,
    GetTransactionsVariables
  >(GET_TRANSACTIONS, {
    variables: { limit, page },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  return {
    transactions: data?.transactions,
    loading,
    error,
    refetch,
    fetchMore,
  };
}; 