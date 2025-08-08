# Transaction Components Usage

This document describes the usage of transaction-related components that improve code organization and reusability.

## TransactionItem

Component for rendering individual transaction items in lists.

### Props

- `transaction`: Transaction - The transaction object to display
- `index`: number - Index in the list for animation timing
- `onEdit`: (transaction: Transaction) => void - Callback when edit button is pressed
- `onDelete`: (transaction: Transaction) => void - Callback when delete button is pressed

### Usage

```typescript
import { TransactionItem } from '@/components/transaction/TransactionItem';

<TransactionItem
  transaction={transactionData}
  index={0}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## TransactionActions

Component for transaction action buttons (edit/delete).

### Props

- `transaction`: Transaction - The transaction object
- `onEdit`: (transaction: Transaction) => void - Edit callback
- `onDelete`: (transaction: Transaction) => void - Delete callback

### Usage

```typescript
import { TransactionActions } from '@/components/transaction/TransactionActions';

<TransactionActions
  transaction={transactionData}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## TransactionsHeader

Header component for the transactions screen with title and action button.

### Props

- `onNewTransaction`: () => void - Callback when "Nova transação" button is pressed

### Usage

```typescript
import { TransactionsHeader } from '@/components/transaction/TransactionsHeader';

<TransactionsHeader onNewTransaction={handleNewTransaction} />
```

## LoadingFooter

Footer component that displays loading state for transaction lists.

### Props

- `loading`: boolean - Whether to show the loading indicator

### Usage

```typescript
import { LoadingFooter } from '@/components/transaction/LoadingFooter';

<LoadingFooter loading={isLoading} />
```

## Benefits

- **Modularity**: Each component has a single responsibility
- **Reusability**: Components can be used in different contexts
- **Maintainability**: Easier to update and test individual components
- **Performance**: Optimized rendering with useCallback and proper prop types
