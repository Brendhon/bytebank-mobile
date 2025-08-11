# 🏦 Transaction Hooks Usage

This document describes how to use the transaction hooks for fetching and managing transaction data in the Bytebank Mobile application.

## Overview

The transaction hooks provide a clean interface for interacting with the GraphQL API to manage financial transactions. They follow the Apollo Client patterns and handle loading states, errors, and data updates automatically.

## Available Hooks

### 1. `useTransactionSummary`

Fetches the transaction summary including balance and breakdown by transaction type.

```typescript
import { useTransactionSummary } from '@/hooks/transaction';

const { summary, loading, error, refetch } = useTransactionSummary();
```

**Returns:**
- `summary`: Transaction summary with balance and breakdown
- `loading`: Boolean indicating if data is being fetched
- `error`: Error object if the request failed
- `refetch`: Function to manually refetch the data

**Example Usage:**
```typescript
const { summary, loading, error } = useTransactionSummary();

if (loading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

const balance = summary?.balance || 0;
const breakdown = summary?.breakdown;
```

### 2. `useTransactions`

Fetches a paginated list of transactions.

```typescript
import { useTransactions } from '@/hooks/transaction';

const { transactions, loading, error, refetch, fetchMore } = useTransactions(10, 1);
```

**Parameters:**
- `limit` (optional): Number of transactions per page
- `page` (optional): Page number to fetch

**Returns:**
- `transactions`: Paginated transactions data
- `loading`: Boolean indicating if data is being fetched
- `error`: Error object if the request failed
- `refetch`: Function to manually refetch the data
- `fetchMore`: Function to load more data (pagination)

**Example Usage:**
```typescript
const { transactions, loading, error, fetchMore } = useTransactions(20, 1);

const handleLoadMore = () => {
  if (transactions?.hasMore) {
    fetchMore({
      variables: {
        page: transactions.page + 1,
      },
    });
  }
};
```

### 3. `useCreateTransaction`

Creates a new transaction.

```typescript
import { useCreateTransaction } from '@/hooks/transaction';

const { createTransaction, loading, error } = useCreateTransaction();
```

**Returns:**
- `createTransaction`: Function to create a transaction
- `loading`: Boolean indicating if the mutation is in progress
- `error`: Error object if the mutation failed
- `data`: Created transaction data

**Example Usage:**
```typescript
const { createTransaction, loading, error } = useCreateTransaction();

const handleCreateTransaction = async () => {
  try {
    const newTransaction = await createTransaction({
      value: 100.50,
      date: new Date().toISOString(),
      desc: TransactionDesc.PAYMENT,
      type: TransactionType.OUTFLOW,
      alias: 'Payment description',
    });
    
    console.log('Transaction created:', newTransaction);
  } catch (err) {
    console.error('Failed to create transaction:', err);
  }
};
```

### 4. `useUpdateTransaction`

Updates an existing transaction.

```typescript
import { useUpdateTransaction } from '@/hooks/transaction';

const { updateTransaction, loading, error } = useUpdateTransaction();
```

**Returns:**
- `updateTransaction`: Function to update a transaction
- `loading`: Boolean indicating if the mutation is in progress
- `error`: Error object if the mutation failed
- `data`: Updated transaction data

**Example Usage:**
```typescript
const { updateTransaction, loading, error } = useUpdateTransaction();

const handleUpdateTransaction = async (transactionId: string) => {
  try {
    const updatedTransaction = await updateTransaction(transactionId, {
      value: 150.75,
      alias: 'Updated description',
    });
    
    console.log('Transaction updated:', updatedTransaction);
  } catch (err) {
    console.error('Failed to update transaction:', err);
  }
};
```

### 5. `useDeleteTransaction`

Deletes a transaction.

```typescript
import { useDeleteTransaction } from '@/hooks/transaction';

const { deleteTransaction, loading, error } = useDeleteTransaction();
```

**Returns:**
- `deleteTransaction`: Function to delete a transaction
- `loading`: Boolean indicating if the mutation is in progress
- `error`: Error object if the mutation failed
- `data`: Boolean indicating if deletion was successful

**Example Usage:**
```typescript
const { deleteTransaction, loading, error } = useDeleteTransaction();

const handleDeleteTransaction = async (transactionId: string) => {
  try {
    const success = await deleteTransaction(transactionId);
    
    if (success) {
      console.log('Transaction deleted successfully');
    }
  } catch (err) {
    console.error('Failed to delete transaction:', err);
  }
};
```

## Helper Methods

The `TransactionService` also provides helper methods for creating specific types of transactions:

```typescript
import { TransactionService } from '@/services/api/transaction.service';

// Create a deposit
const deposit = await TransactionService.createDeposit(1000, new Date().toISOString());

// Create a payment
const payment = await TransactionService.createPayment(500, new Date().toISOString());

// Create a transfer
const transfer = await TransactionService.createTransfer(300, new Date().toISOString());

// Create a withdrawal
const withdrawal = await TransactionService.createWithdrawal(200, new Date().toISOString());
```

## Error Handling

All hooks provide error handling through the `error` property. It's recommended to always check for errors and provide appropriate user feedback:

```typescript
const { summary, loading, error } = useTransactionSummary();

if (error) {
  return (
    <View>
      <Text>Erro ao carregar dados: {error.message}</Text>
      <Button onPress={refetch} title="Tentar novamente" />
    </View>
  );
}
```

## Cache Management

The hooks automatically handle Apollo Client cache management:

- **Queries**: Use `cache-and-network` fetch policy for fresh data
- **Mutations**: Automatically refetch related queries after mutations
- **Error Policy**: Use `all` error policy to handle partial data

## Performance Considerations

- Use `useMemo` for expensive computations based on transaction data
- Use `useCallback` for functions passed as props to child components
- The hooks automatically handle loading states and error boundaries
- Apollo Client provides automatic caching and deduplication 