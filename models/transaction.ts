// Enums
export enum TransactionDesc {
  DEPOSIT = 'deposit',
  PAYMENT = 'payment',
  TRANSFER = 'transfer',
  WITHDRAWAL = 'withdrawal',
}

export enum TransactionType {
  INFLOW = 'inflow',
  OUTFLOW = 'outflow',
}

// Transaction types
export interface Transaction {
  _id: string;
  alias?: string;
  date: string;
  desc: TransactionDesc;
  type: TransactionType;
  value: number;
  user?: string;
}

export interface TransactionSummaryBreakdown {
  deposit: number;
  payment: number;
  transfer: number;
  withdrawal: number;
}

export interface TransactionSummary {
  balance: number;
  breakdown: TransactionSummaryBreakdown;
}

export interface PaginatedTransactions {
  hasMore: boolean;
  items: Transaction[];
  page: number;
  total: number;
  totalInPage: number;
  totalPages: number;
}

// Input types
export interface TransactionInput {
  alias?: string;
  date: string;
  desc: TransactionDesc;
  type: TransactionType;
  value: number;
  user?: string;
}

export interface TransactionUpdateInput {
  alias?: string;
  date?: string;
  desc?: TransactionDesc;
  type?: TransactionType;
  value?: number;
}

// Query/Mutation variables
export interface GetTransactionVariables {
  id: string;
}

export interface GetTransactionsVariables {
  limit?: number;
  page?: number;
}

export interface CreateTransactionVariables {
  input: TransactionInput;
}

export interface UpdateTransactionVariables {
  id: string;
  input: TransactionUpdateInput;
}

export interface DeleteTransactionVariables {
  id: string;
}

// Response types
export interface GetTransactionResponse {
  transaction: Transaction | null;
}

export interface GetTransactionsResponse {
  transactions: PaginatedTransactions;
}

export interface GetTransactionSummaryResponse {
  getTransactionSummary: TransactionSummary;
}

export interface CreateTransactionResponse {
  createTransaction: Transaction;
}

export interface UpdateTransactionResponse {
  updateTransaction: Transaction;
}

export interface DeleteTransactionResponse {
  deleteTransaction: boolean;
}
