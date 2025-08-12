import { useMutation } from '@apollo/client';
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTION_SUMMARY,
} from '@/services/graphql/transactions.queries';
import {
  CreateTransactionResponse,
  CreateTransactionVariables,
  UpdateTransactionResponse,
  UpdateTransactionVariables,
  DeleteTransactionResponse,
  DeleteTransactionVariables,
  TransactionInput,
  TransactionUpdateInput,
} from '@/models/transaction';

/**
 * Hook for creating a new transaction
 */
export const useCreateTransaction = () => {
  const [mutate, { loading, error, data }] = useMutation<
    CreateTransactionResponse,
    CreateTransactionVariables
  >(CREATE_TRANSACTION, {
    // Refetch queries to update the UI
    refetchQueries: [{ query: GET_TRANSACTIONS }, { query: GET_TRANSACTION_SUMMARY }],
  });

  const createTransaction = async (input: TransactionInput) => {
    try {
      const result = await mutate({ variables: { input } });
      return result.data?.createTransaction;
    } catch (err) {
      console.error('Create transaction error:', err);
      throw err;
    }
  };

  return {
    createTransaction,
    loading,
    error,
    data: data?.createTransaction,
  };
};

/**
 * Hook for updating an existing transaction
 */
export const useUpdateTransaction = () => {
  const [mutate, { loading, error, data }] = useMutation<
    UpdateTransactionResponse,
    UpdateTransactionVariables
  >(UPDATE_TRANSACTION, {
    // Refetch queries to update the UI
    refetchQueries: [{ query: GET_TRANSACTIONS }, { query: GET_TRANSACTION_SUMMARY }],
  });

  const updateTransaction = async (id: string, input: TransactionUpdateInput) => {
    try {
      const result = await mutate({ variables: { id, input } });
      return result.data?.updateTransaction;
    } catch (err) {
      console.error('Update transaction error:', err);
      throw err;
    }
  };

  return {
    updateTransaction,
    loading,
    error,
    data: data?.updateTransaction,
  };
};

/**
 * Hook for deleting a transaction
 */
export const useDeleteTransaction = () => {
  const [mutate, { loading, error, data }] = useMutation<
    DeleteTransactionResponse,
    DeleteTransactionVariables
  >(DELETE_TRANSACTION, {
    // Refetch queries to update the UI
    refetchQueries: [{ query: GET_TRANSACTIONS }, { query: GET_TRANSACTION_SUMMARY }],
  });

  const deleteTransaction = async (id: string) => {
    try {
      const result = await mutate({ variables: { id } });
      return result.data?.deleteTransaction;
    } catch (err) {
      console.error('Delete transaction error:', err);
      throw err;
    }
  };

  return {
    deleteTransaction,
    loading,
    error,
    data: data?.deleteTransaction,
  };
};
