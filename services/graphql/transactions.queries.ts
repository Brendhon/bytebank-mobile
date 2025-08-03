import { gql } from '@apollo/client';
import {
  TRANSACTION_FIELDS,
  PAGINATED_TRANSACTIONS_FIELDS,
  TRANSACTION_SUMMARY_FIELDS,
} from './fragments';

// Get single transaction query
export const GET_TRANSACTION = gql`
  query Transaction($id: ID!) {
    transaction(id: $id) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;

// Get paginated transactions query
export const GET_TRANSACTIONS = gql`
  query Transactions($limit: Int, $page: Int) {
    transactions(limit: $limit, page: $page) {
      ...PaginatedTransactionsFields
    }
  }
  ${PAGINATED_TRANSACTIONS_FIELDS}
`;

// Get transaction summary query
export const GET_TRANSACTION_SUMMARY = gql`
  query GetTransactionSummary {
    getTransactionSummary {
      ...TransactionSummaryFields
    }
  }
  ${TRANSACTION_SUMMARY_FIELDS}
`;

// Create transaction mutation
export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;

// Update transaction mutation
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $input: TransactionUpdateInput!) {
    updateTransaction(id: $id, input: $input) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;

// Delete transaction mutation
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
