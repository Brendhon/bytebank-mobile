import Button from '@/components/form/Button';
import { GradientContainer } from '@/components/layout/GradientContainer';
import TransactionModal from '@/components/modal/TransactionModal';
import { TransactionService } from '@/services/api/transaction.service';
import { Transaction, TransactionDesc, TransactionType, TransactionInput } from '@/models/transaction';
import { colors } from '@/utils/colors';
import { formatCurrencyWithSign } from '@/utils/currency';
import { formatDateWithRelative } from '@/utils/date';
import { Edit, Trash2 } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';

// Pagination configuration
const PAGE_SIZE = 10;

// Animated view component
const AnimatedView = ({ children, className, delay = 0 }: { children: React.ReactNode, className: string, delay?: number }) => {
  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} className={className} exiting={FadeOut}>
      {children}
    </Animated.View>
  );
};

// Animated text component
const AnimatedText = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) => {
  return (
    <AnimatedView delay={delay} className={className}>
      <Text className={className}>
        {children}
      </Text>
    </AnimatedView>
  );
};



export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const isInitialLoaded = useRef(false);

  const openCreateModal = useCallback(() => {
    setEditingTransaction(null);
    setModalVisible(true);
  }, []);

  const openEditModal = useCallback((tx: Transaction) => {
    setEditingTransaction(tx);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setEditingTransaction(null);
  }, []);

  const fetchTransactions = useCallback(async (nextPage: number, append: boolean) => {
    try {
      setLoading(true);
      const data = await TransactionService.getTransactions(PAGE_SIZE, nextPage);
      setHasMore(Boolean(data?.hasMore));
      setPage(data?.page ?? nextPage);
      setTransactions((prev) => (append ? [...prev, ...data.items] : data.items));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as transações.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoaded.current) {
      isInitialLoaded.current = true;
      fetchTransactions(1, false);
    }
  }, [fetchTransactions]);

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
    fetchTransactions(page + 1, true);
  }, [fetchTransactions, loading, hasMore, page]);

  const handleEditTransaction = useCallback((transaction: Transaction) => {
    openEditModal(transaction);
  }, [openEditModal]);

  const handleDeleteTransaction = useCallback((transaction: Transaction) => {
    Alert.alert(
      'Excluir transação',
      'Tem certeza que deseja excluir esta transação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const ok = await TransactionService.deleteTransaction(transaction._id);
              if (ok) {
                setTransactions((prev) => prev.filter((t) => t._id !== transaction._id));
              }
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir a transação.');
            }
          },
        },
      ]
    );
  }, []);

  const renderTransactionItem = useCallback(({ item, index }: { item: Transaction, index: number }) => {
    const delay = index * 100 + 600; // Progressive delay for list items

    const valueClass = `${styles.transactionValue} ${item.type === TransactionType.INFLOW ? styles.positiveValue : styles.negativeValue}`;

    return (
      <AnimatedView delay={delay} className={styles.transactionItem}>
        <View className={styles.transactionHeader}>
          <View className={styles.transactionInfo}>
            <Text className={styles.transactionAlias}>{item.alias || 'Sem descrição'}</Text>
            <Text className={styles.transactionDate}>{formatDateWithRelative(item.date)}</Text>
          </View>
          <Text className={valueClass}>
            {formatCurrencyWithSign(item.type, item.value)}
          </Text>
        </View>

        <View className={styles.transactionFooter}>
          <View className={styles.transactionType}>
            <Text className={styles.transactionTypeText}>
              {getTransactionDescription(item.desc)}
            </Text>
          </View>
          <View className={styles.transactionActions}>
            <Button
              variant="outlineGreen"
              className={styles.iconButton}
              onPress={() => handleEditTransaction(item)}
              accessibilityLabel="Editar transação"
            >
              <View className={styles.transactionActionContainer}>
                <Edit size={18} color={colors.dark} />
                <Text>Editar</Text>
              </View>
            </Button>
            <Button
              variant="outlineOrange"
              className={styles.iconButton}
              onPress={() => handleDeleteTransaction(item)}
              accessibilityLabel="Excluir transação"
            >
              <View className={styles.transactionActionContainer}>
                <Trash2 size={18} color={colors.red} />
                <Text>Excluir</Text>
              </View>
            </Button>
          </View>
        </View>
      </AnimatedView>
    );
  }, [handleEditTransaction, handleDeleteTransaction]);

  const renderFooter = useCallback(() => {
    if (!loading) return null;

    return (
      <AnimatedView delay={300} className={styles.loadingContainer}>
        <Text className={styles.loadingText}>Carregando mais transações...</Text>
      </AnimatedView>
    );
  }, [loading]);

  const handleNewTransaction = useCallback(() => {
    openCreateModal();
  }, [openCreateModal]);

  const handleSaved = useCallback((saved: Transaction) => {
    setTransactions((prev) => {
      const exists = prev.some((t) => t._id === saved._id);
      if (exists) {
        return prev.map((t) => (t._id === saved._id ? saved : t));
      }
      return [saved, ...prev];
    });
  }, []);

  const submitTransactionRequest = useCallback(
    async (payload: TransactionInput, id?: string) => {
      if (id) {
        return TransactionService.updateTransaction(id, payload);
      }
      return TransactionService.createTransaction(payload);
    },
    []
  );

  return (
    <GradientContainer>
      {/* Header */}
      <AnimatedView delay={300} className={styles.header}>
        <View className={styles.headerContent}>
          <AnimatedText className={styles.headerTitle} delay={450}>
            Histórico
          </AnimatedText>
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
      </AnimatedView>

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

      {/* Create/Edit Transaction Modal */}
      {modalVisible && (
        <TransactionModal
          key={editingTransaction?._id ?? 'new'}
          visible={modalVisible}
          onClose={closeModal}
          transaction={editingTransaction}
          onSaved={handleSaved}
          onSubmitRequest={submitTransactionRequest}
        />
      )}
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
  newTransactionButton: 'text-white',
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
  transactionActions: 'flex-row gap-4',
  actionButton: 'p-2',
  iconButton: 'h-9',
  loadingContainer: 'py-4 items-center',
  loadingText: 'text-gray text-sm',
  transactionActionContainer: 'flex-row items-center gap-1',
};
