import { useQuery } from '@apollo/client';
import { GET_TRANSACTION_SUMMARY } from '@/services/graphql/transactions.queries';
import { GetTransactionSummaryResponse } from '@/models/transaction';

/**
 * Hook for fetching transaction summary data
 * Provides balance and breakdown of different transaction types
 */
export const useTransactionSummary = () => {
  const { data, loading, error, refetch } = useQuery<GetTransactionSummaryResponse>(
    GET_TRANSACTION_SUMMARY,
    {
      // Fetch policy to ensure fresh data
      fetchPolicy: 'cache-and-network',
      // Error policy to handle partial data
      errorPolicy: 'all',
    }
  );

  return {
    summary: data?.getTransactionSummary,
    loading,
    error,
    refetch,
  };
}; 