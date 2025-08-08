import { apolloClient } from './client';
import {
  GET_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTION_SUMMARY,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from '../graphql/transactions.queries';
import {
  GetTransactionVariables,
  GetTransactionsVariables,
  CreateTransactionVariables,
  UpdateTransactionVariables,
  DeleteTransactionVariables,
  GetTransactionResponse,
  GetTransactionsResponse,
  GetTransactionSummaryResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
  Transaction,
  PaginatedTransactions,
  TransactionSummary,
  TransactionInput,
  TransactionUpdateInput,
  TransactionDesc,
  TransactionType,
} from '@/models/transaction';

/**
 * Transaction service for financial transaction operations
 */
export class TransactionService {
  /**
   * Get a single transaction by ID
   */
  static async getTransaction(id: string): Promise<Transaction | null> {
    try {
      const { data } = await apolloClient.query<GetTransactionResponse, GetTransactionVariables>({
        query: GET_TRANSACTION,
        variables: { id },
      });

      return data.transaction;
    } catch (error) {
      console.error('Get transaction error:', error);
      throw new Error('Failed to get transaction details.');
    }
  }

  /**
   * Get paginated list of transactions
   */
  static async getTransactions(limit?: number, page?: number): Promise<PaginatedTransactions> {
    try {
      const { data } = await apolloClient.query<GetTransactionsResponse, GetTransactionsVariables>({
        query: GET_TRANSACTIONS,
        variables: { limit, page },
      });

      if (!data?.transactions) {
        throw new Error('Failed to fetch transactions.');
      }

      return data.transactions;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw new Error('Failed to fetch transactions.');
    }
  }

  /**
   * Get transaction summary with balance and breakdown
   */
  static async getTransactionSummary(): Promise<TransactionSummary> {
    try {
      const { data } = await apolloClient.query<GetTransactionSummaryResponse>({
        query: GET_TRANSACTION_SUMMARY,
      });

      if (!data?.getTransactionSummary) {
        throw new Error('Failed to fetch transaction summary.');
      }

      return data.getTransactionSummary;
    } catch (error) {
      console.error('Get transaction summary error:', error);
      throw new Error('Failed to fetch transaction summary.');
    }
  }

  /**
   * Create a new transaction
   */
  static async createTransaction(transactionData: TransactionInput): Promise<Transaction> {
    try {
      const { data } = await apolloClient.mutate<
        CreateTransactionResponse,
        CreateTransactionVariables
      >({
        mutation: CREATE_TRANSACTION,
        variables: {
          input: transactionData,
        },
        // Ensure dashboard summary is refreshed after creating a transaction
        refetchQueries: [
          { query: GET_TRANSACTION_SUMMARY },
        ],
        awaitRefetchQueries: true,
      });

      if (!data?.createTransaction) {
        throw new Error('Failed to create transaction.');
      }

      return data.createTransaction;
    } catch (error) {
      console.error('Create transaction error:', error);
      throw new Error('Failed to create transaction.');
    }
  }

  /**
   * Update an existing transaction
   */
  static async updateTransaction(
    id: string,
    updates: TransactionUpdateInput
  ): Promise<Transaction> {
    try {
      const { data } = await apolloClient.mutate<
        UpdateTransactionResponse,
        UpdateTransactionVariables
      >({
        mutation: UPDATE_TRANSACTION,
        variables: {
          id,
          input: updates,
        },
        // Ensure dashboard summary is refreshed after updating a transaction
        refetchQueries: [
          { query: GET_TRANSACTION_SUMMARY },
        ],
        awaitRefetchQueries: true,
      });

      if (!data?.updateTransaction) {
        throw new Error('Failed to update transaction.');
      }

      return data.updateTransaction;
    } catch (error) {
      console.error('Update transaction error:', error);
      throw new Error('Failed to update transaction.');
    }
  }

  /**
   * Delete a transaction
   */
  static async deleteTransaction(id: string): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<
        DeleteTransactionResponse,
        DeleteTransactionVariables
      >({
        mutation: DELETE_TRANSACTION,
        variables: { id },
        // Ensure dashboard summary is refreshed after deleting a transaction
        refetchQueries: [
          { query: GET_TRANSACTION_SUMMARY },
        ],
        awaitRefetchQueries: true,
      });

      return data?.deleteTransaction ?? false;
    } catch (error) {
      console.error('Delete transaction error:', error);
      throw new Error('Failed to delete transaction.');
    }
  }

  /**
   * Helper method to create a deposit transaction
   */
  static async createDeposit(value: number, date: string, alias?: string): Promise<Transaction> {
    return this.createTransaction({
      value,
      date,
      desc: TransactionDesc.DEPOSIT,
      type: TransactionType.INFLOW,
      alias,
    });
  }

  /**
   * Helper method to create a payment transaction
   */
  static async createPayment(value: number, date: string, alias?: string): Promise<Transaction> {
    return this.createTransaction({
      value,
      date,
      desc: TransactionDesc.PAYMENT,
      type: TransactionType.OUTFLOW,
      alias,
    });
  }

  /**
   * Helper method to create a transfer transaction
   */
  static async createTransfer(value: number, date: string, alias?: string): Promise<Transaction> {
    return this.createTransaction({
      value,
      date,
      desc: TransactionDesc.TRANSFER,
      type: TransactionType.OUTFLOW,
      alias,
    });
  }

  /**
   * Helper method to create a withdrawal transaction
   */
  static async createWithdrawal(value: number, date: string, alias?: string): Promise<Transaction> {
    return this.createTransaction({
      value,
      date,
      desc: TransactionDesc.WITHDRAWAL,
      type: TransactionType.OUTFLOW,
      alias,
    });
  }
}
