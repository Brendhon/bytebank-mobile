import { AnimatedView } from '@/components/animation/AnimatedComponents';
import { TransactionActions } from './TransactionActions';
import ReceiptViewer from './ReceiptViewer';
import { Transaction, TransactionDesc, TransactionType } from '@/models/transaction';
import { formatCurrencyWithSign } from '@/utils/currency';
import { formatDateWithRelative } from '@/utils/date';
import { useAuth } from '@/contexts/AuthContext';
import { useReceiptUpload } from '@/hooks/storage';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

/**
 * Component for rendering a single transaction item
 */
export const TransactionItem = ({ transaction, index, onEdit, onDelete }: TransactionItemProps) => {
  const delay = index * 100 + 600; // Progressive delay for list items
  const { user } = useAuth();
  const { receiptUrl, getReceiptUrl } = useReceiptUpload();

  const valueClass = `${styles.transactionValue} ${
    transaction.type === TransactionType.INFLOW ? styles.positiveValue : styles.negativeValue
  }`;

  // Try to get receipt URL when component mounts
  useEffect(() => {
    if (user?._id && transaction._id && transaction) {
      getReceiptUrl(user._id, transaction._id);
    }
  }, [user?._id, transaction._id, transaction, getReceiptUrl]);

  return (
    <AnimatedView delay={delay} className={styles.container}>
      <View className={styles.header}>
        <View className={styles.info}>
          <Text className={styles.alias}>{transaction.alias || 'Sem descrição'}</Text>
          <Text className={styles.date}>{formatDateWithRelative(transaction.date)}</Text>
        </View>
        <Text className={valueClass}>
          {formatCurrencyWithSign(transaction.type, transaction.value)}
        </Text>
      </View>

      <View>
        {receiptUrl && (
          <ReceiptViewer className={styles.receipt} receiptUrl={receiptUrl} variant="button" />
        )}
      </View>

      <View className={styles.footer}>
        <View className={styles.footerLeft}>
          <View className={styles.typeContainer}>
            <Text className={styles.typeText}>{getTransactionDescription(transaction.desc)}</Text>
          </View>
        </View>
        <TransactionActions transaction={transaction} onEdit={onEdit} onDelete={onDelete} />
      </View>
    </AnimatedView>
  );
};

/**
 * Helper function to get transaction description in Portuguese
 */
const getTransactionDescription = (desc: TransactionDesc): string => {
  switch (desc) {
    case TransactionDesc.DEPOSIT:
      return 'Depósito';
    case TransactionDesc.PAYMENT:
      return 'Pagamento';
    case TransactionDesc.TRANSFER:
      return 'Transferência';
    case TransactionDesc.WITHDRAWAL:
      return 'Saque';
    default:
      return 'Transação';
  }
};

const styles = {
  container: 'rounded-xl bg-white p-4 border-2 border-light-green',
  header: 'mb-6 flex-row items-center justify-between',
  info: 'flex-1',
  alias: 'text-dark font-semibold text-lg',
  date: 'text-dark-gray text-sm',
  transactionValue: 'text-lg font-bold',
  positiveValue: 'text-green',
  negativeValue: 'text-red',
  receipt: 'mb-8',
  footer: 'flex-row items-center justify-between',
  footerLeft: 'flex-row items-center gap-2',
  typeContainer: 'rounded-xl px-2 py-1 bg-light-green',
  typeText: 'text-sm font-medium text-dark',
};
