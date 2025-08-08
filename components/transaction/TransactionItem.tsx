import { AnimatedView } from '@/components/animation/AnimatedComponents';
import { TransactionActions } from './TransactionActions';
import { Transaction, TransactionDesc, TransactionType } from '@/models/transaction';
import { formatCurrencyWithSign } from '@/utils/currency';
import { formatDateWithRelative } from '@/utils/date';
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
  
  const valueClass = `${styles.transactionValue} ${
    transaction.type === TransactionType.INFLOW ? styles.positiveValue : styles.negativeValue
  }`;

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

      <View className={styles.footer}>
        <View className={styles.typeContainer}>
          <Text className={styles.typeText}>
            {getTransactionDescription(transaction.desc)}
          </Text>
        </View>
        <TransactionActions 
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
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
  alias: 'text-dark font-semibold text-xl',
  date: 'text-dark-gray text-base',
  transactionValue: 'text-xl font-bold',
  positiveValue: 'text-green',
  negativeValue: 'text-red',
  footer: 'flex-row items-center justify-between',
  typeContainer: 'rounded-xl px-2 py-1 bg-light-green',
  typeText: 'text-base font-medium text-dark',
};
