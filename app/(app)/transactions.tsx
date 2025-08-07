import { GradientContainer } from '@/components/layout/GradientContainer';
import { Transaction, TransactionDesc, TransactionType } from '@/models/transaction';
import { formatCurrencyWithSign } from '@/utils/currency';
import { formatDateWithRelative } from '@/utils/date';
import { Edit, Filter, Plus, Search, Trash2 } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Button from '@/components/form/Button';
import { colors } from '@/utils/colors';

// Mock data based on transaction interfaces
const mockTransactions: Transaction[] = [
  {
    _id: '1',
    alias: 'Pix Farmácia',
    date: '2025-01-15',
    desc: TransactionDesc.PAYMENT,
    type: TransactionType.OUTFLOW,
    value: -100.50,
  },
  {
    _id: '2',
    alias: 'Netflix',
    date: '2025-01-14',
    desc: TransactionDesc.PAYMENT,
    type: TransactionType.OUTFLOW,
    value: -39.90,
  },
  {
    _id: '3',
    alias: 'Salario',
    date: '2025-01-10',
    desc: TransactionDesc.DEPOSIT,
    type: TransactionType.INFLOW,
    value: 600.00,
  },
  {
    _id: '4',
    alias: 'Transferência',
    date: '2025-01-08',
    desc: TransactionDesc.TRANSFER,
    type: TransactionType.OUTFLOW,
    value: -250.00,
  },
  {
    _id: '5',
    alias: 'Freelance',
    date: '2025-01-05',
    desc: TransactionDesc.DEPOSIT,
    type: TransactionType.INFLOW,
    value: 1200.00,
  },
  {
    _id: '6',
    alias: 'Uber',
    date: '2025-01-03',
    desc: TransactionDesc.PAYMENT,
    type: TransactionType.OUTFLOW,
    value: -25.50,
  },
  {
    _id: '7',
    alias: 'Supermercado',
    date: '2025-01-02',
    desc: TransactionDesc.PAYMENT,
    type: TransactionType.OUTFLOW,
    value: -320.00,
  },
  {
    _id: '8',
    alias: 'Depósito',
    date: '2024-12-30',
    desc: TransactionDesc.DEPOSIT,
    type: TransactionType.INFLOW,
    value: 500.00,
  },
];

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would fetch more data from the API
      const moreTransactions: Transaction[] = [
        {
          _id: '9',
          alias: 'Spotify',
          date: '2024-12-28',
          desc: TransactionDesc.PAYMENT,
          type: TransactionType.OUTFLOW,
          value: -19.90,
        },
        {
          _id: '10',
          alias: 'Gasolina',
          date: '2024-12-25',
          desc: TransactionDesc.PAYMENT,
          type: TransactionType.OUTFLOW,
          value: -150.00,
        },
      ];

      setTransactions(prev => [...prev, ...moreTransactions]);
      setHasMore(false); // No more data in this mock
      setLoading(false);
    }, 1000);
  }, [loading, hasMore]);

  const handleEditTransaction = useCallback((transaction: Transaction) => {
    // TODO: Navigate to edit transaction screen
    console.log('Edit transaction:', transaction._id);
  }, []);

  const handleDeleteTransaction = useCallback((transaction: Transaction) => {
    // TODO: Show confirmation dialog and delete transaction
    console.log('Delete transaction:', transaction._id);
  }, []);

  const renderTransactionItem = useCallback(({ item }: { item: Transaction }) => (
    <View className={styles.transactionItem}>
      <View className={styles.transactionHeader}>
        <View className={styles.transactionInfo}>
          <Text className={styles.transactionAlias}>{item.alias || 'Sem descrição'}</Text>
          <Text className={styles.transactionDate}>{formatDateWithRelative(item.date)}</Text>
        </View>
        <Text
          className={`${styles.transactionValue} ${
            item.type === TransactionType.INFLOW ? styles.positiveValue : styles.negativeValue
          }`}>
          {formatCurrencyWithSign(item.value)}
        </Text>
      </View>

      <View className={styles.transactionFooter}>
        <View className={styles.transactionType}>
          <Text className={styles.transactionTypeText}>
            {getTransactionDescription(item.desc)}
          </Text>
        </View>
        <View className={styles.transactionActions}>
          <TouchableOpacity
            className={styles.actionButton}
            onPress={() => handleEditTransaction(item)}
            accessibilityLabel="Editar transação"
            accessibilityRole="button">
            <Edit size={22} color={colors.blue} />
          </TouchableOpacity>
          <TouchableOpacity
            className={styles.actionButton}
            onPress={() => handleDeleteTransaction(item)}
            accessibilityLabel="Excluir transação"
            accessibilityRole="button">
            <Trash2 size={22} color={colors.red} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ), [handleEditTransaction, handleDeleteTransaction]);

  const renderFooter = useCallback(() => {
    if (!loading) return null;

    return (
      <View className={styles.loadingContainer}>
        <Text className={styles.loadingText}>Carregando mais transações...</Text>
      </View>
    );
  }, [loading]);

  const handleNewTransaction = useCallback(() => {
    // TODO: Implement new transaction navigation
    console.log('New transaction pressed');
  }, []);

  return (
    <GradientContainer>
      {/* Header */}
      <View className={styles.header}>
        <View className={styles.headerContent}>
          <Text className={styles.headerTitle}>Histórico</Text>
          <View className={styles.headerActions}>
            <Button
              variant="blue"
              className={styles.newTransactionButton}
              onPress={handleNewTransaction}
              accessibilityLabel="Nova transação"
              accessibilityHint="Toque duas vezes para criar uma nova transação">
              <Text>Nova transação</Text>
            </Button>
          </View>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 12, gap: 16 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 116, // Item height (100) + gap (16)
          offset: 116 * index,
          index,
        })}
      />
    </GradientContainer>
  );
}

const styles = {
  header: 'border-light-green border-b bg-white p-4',
  headerContent: 'flex-row items-center justify-between',
  headerTitle: 'text-dark text-2xl font-bold',
  headerActions: 'flex-row gap-2',
  searchButton: 'p-2',
  filterButton: 'p-2',
  newTransactionButton: 'rounded-md px-4',
  transactionItem: 'rounded-xl bg-white p-4 border-2 border-light-green',
  transactionHeader: 'mb-6 flex-row items-center justify-between',
  transactionInfo: 'flex-1',
  transactionAlias: 'text-dark font-semibold text-xl',
  transactionDate: 'text-dark-gray text-base',
  transactionValue: 'text-xl font-bold',
  positiveValue: 'text-green',
  negativeValue: 'text-red',
  transactionFooter: 'flex-row items-center justify-between',
  transactionType: 'rounded-xl px-2 py-1 bg-light-green',
  transactionTypeText: 'text-base font-medium text-dark',
  transactionActions: 'flex-row gap-2',
  actionButton: 'p-2',
  loadingContainer: 'py-4 items-center',
  loadingText: 'text-gray text-sm',
};
