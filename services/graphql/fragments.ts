import { gql } from '@apollo/client';

// User fields fragment
export const USER_FIELDS = gql`
  fragment UserFields on User {
    _id
    name
    email
    acceptPrivacy
    createdAt
    updatedAt
  }
`;

// Transaction fields fragment
export const TRANSACTION_FIELDS = gql`
  fragment TransactionFields on Transaction {
    _id
    alias
    date
    desc
    type
    value
    user
  }
`;

// Auth payload fields fragment
export const AUTH_PAYLOAD_FIELDS = gql`
  fragment AuthPayloadFields on AuthPayload {
    token
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

// Transaction summary fields fragment
export const TRANSACTION_SUMMARY_FIELDS = gql`
  fragment TransactionSummaryFields on TransactionSummary {
    balance
    breakdown {
      deposit
      payment
      transfer
      withdrawal
    }
  }
`;

// Paginated transactions fields fragment
export const PAGINATED_TRANSACTIONS_FIELDS = gql`
  fragment PaginatedTransactionsFields on PaginatedTransactions {
    hasMore
    items {
      ...TransactionFields
    }
    page
    total
    totalInPage
    totalPages
  }
  ${TRANSACTION_FIELDS}
`;
