# ⚙️ API Guidelines (GraphQL with Apollo Client)

This document defines the specific rules for the **service layer** that interacts with the GraphQL API. These rules extend the general guidelines in `service-guidelines.md`.

### 1. Structure and Naming

-   **Client Configuration**: The `ApolloClient` instance must be configured and exported from `services/api/client.ts`.
-   **GraphQL Definitions**:
    -   All `gql` definitions (`query`, `mutation`, `fragment`) must be centralized in `services/graphql/`.
    -   Files should be organized by domain (e.g., `transactions.queries.ts`).

### 2. Implementation Patterns

-   **Use GraphQL Fragments**: It is mandatory to use fragments to group reusable fields, ensuring consistency and maintainability.
-   **Generated Types**: It is highly recommended to use tools like **GraphQL Code Generator** to generate types from the API schema. This ensures that returned data and operation variables are fully typed.

### 3. API Usage and Schema Reference

For detailed information on all available GraphQL queries, mutations, types, and expected data structures, consult the official API usage documentation. This document serves as the single source of truth for the API contract.

-   **See: [Bytebank API GraphQL - Usage Documentation](../usages/api-usage.md)**

#### Example Definition

Below is an example of how to define queries and mutations according to the project standards.

**File: `services/graphql/transactions.queries.ts`**

```typescript
import { gql } from '@apollo/client';

// Rule: Use fragments for reusable fields.
export const TRANSACTION_FIELDS = gql`
  fragment TransactionFields on Transaction {
    id
    description
    amount
    date
    type
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions($filter: TransactionFilterInput) {
    transactions(filter: $filter) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;
```
