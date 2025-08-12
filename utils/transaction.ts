import { Transaction } from '@/models/transaction';

/**
 * Compare dates in DD/MM/YYYY format
 * @param dateA First date in DD/MM/YYYY format
 * @param dateB Second date in DD/MM/YYYY format
 * @returns Positive if dateB is newer, negative if dateA is newer, 0 if equal
 */
export const compareDates = (dateA: string, dateB: string): number => {
  const [dayA, monthA, yearA] = dateA.split('/').map(Number);
  const [dayB, monthB, yearB] = dateB.split('/').map(Number);

  const dateObjA = new Date(yearA, monthA - 1, dayA);
  const dateObjB = new Date(yearB, monthB - 1, dayB);

  // Sort in descending order (newest first)
  return dateObjB.getTime() - dateObjA.getTime();
};

/**
 * Find the correct position to insert a transaction in a sorted list
 * @param transactions Current sorted transactions list
 * @param newTransaction Transaction to insert
 * @returns Index where the transaction should be inserted
 */
export const findInsertPosition = (
  transactions: Transaction[],
  newTransaction: Transaction
): number => {
  for (let i = 0; i < transactions.length; i++) {
    if (compareDates(newTransaction.date, transactions[i].date) >= 0) {
      return i;
    }
  }
  return transactions.length;
};

/**
 * Insert a transaction in the correct position maintaining date order
 * @param transactions Current transactions list
 * @param newTransaction Transaction to insert
 * @returns New transactions array with the transaction inserted in correct position
 */
export const insertTransactionInOrder = (
  transactions: Transaction[],
  newTransaction: Transaction
): Transaction[] => {
  const insertPosition = findInsertPosition(transactions, newTransaction);
  return [
    ...transactions.slice(0, insertPosition),
    newTransaction,
    ...transactions.slice(insertPosition),
  ];
};

/**
 * Update a transaction and maintain date order
 * @param transactions Current transactions list
 * @param updatedTransaction Updated transaction
 * @returns New transactions array with the transaction updated and reordered
 */
export const updateTransactionInOrder = (
  transactions: Transaction[],
  updatedTransaction: Transaction
): Transaction[] => {
  const updated = transactions.map((t) =>
    t._id === updatedTransaction._id ? updatedTransaction : t
  );
  return updated.sort((a, b) => compareDates(a.date, b.date));
};
