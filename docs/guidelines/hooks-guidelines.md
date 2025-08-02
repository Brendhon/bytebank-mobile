# 🎣 Custom Hooks Guidelines

This document defines the rules for creating **custom hooks**, which serve as the bridge between **UI Components** and the **Service Layer**.

### 1. Core Principles

-   **Bridge to UI**: Hooks are the **only layer** that should interact with services defined in `services/`.
-   **State Management**: The hook is responsible for managing all state related to an operation: `loading`, `error`, and `data`.

### 2. Structure and Naming

-   **Main Directory**: All custom hooks must reside in `hooks/`.
-   **Naming Convention**: Use the `use` prefix followed by the feature name in `PascalCase` (e.g., `useFileUpload`, `useFetchTransactions`).

### 3. Implementation Patterns

#### 3.1. Hooks for General Services (e.g., Firebase)

These hooks manage their own state for asynchronous operations.

-   **Local State**: Use `useState` to manage `loading`, `error`, and `data`.
-   **Memoized Functions**: The function that the hook exposes to the component (e.g., to initiate an upload) **must** be wrapped in `useCallback` for performance optimization.
-   **Service Communication**: The function inside `useCallback` should call the corresponding service function and update the hook's internal state.

**Example (Upload Hook)**

```typescript
import { useState, useCallback } from 'react';
import { uploadReceiptService } from '../services/firebase/storage.service';

export const useUploadReceipt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(async (file: Blob, transactionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await uploadReceiptService(file, transactionId);
      setIsLoading(false);
      return url;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      return null;
    }
  }, []);

  return { isLoading, error, upload };
};
```

#### 3.2. Hooks for the API (Apollo Client)

These hooks wrap Apollo's native hooks to abstract the API logic.

-   **Apollo Hook Wrapper**: Hooks for the API should wrap native Apollo hooks (`useQuery`, `useMutation`).
-   **State Managed by Apollo**: Do not use `useState` for `loading`, `error`, and `data`, as Apollo provides them automatically.
-   **Cache Updates**: The responsibility for updating the cache (`refetchQueries` or `update`) belongs to the **mutation hook**.

**Example (API Mutation Hook)**

```typescript
import { useMutation } from '@apollo/client';
import { CREATE_TRANSACTION, GET_TRANSACTIONS } from '../services/graphql/transactions.queries';

export const useCreateTransaction = () => {
  const [mutate, { loading, error, data }] = useMutation(CREATE_TRANSACTION, {
    // Refetch the transactions list after a new one is created
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  return { createTransaction: mutate, loading, error, data };
};
```
