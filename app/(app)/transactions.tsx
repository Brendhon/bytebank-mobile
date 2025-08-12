import { GradientContainer } from '@/components/layout/GradientContainer';
import TransactionModal from '@/components/modal/TransactionModal';
import { EmptyState } from '@/components/transaction/EmptyState';
import { LoadingFooter } from '@/components/transaction/LoadingFooter';
import { TransactionItem } from '@/components/transaction/TransactionItem';
import { TransactionsHeader } from '@/components/transaction/TransactionsHeader';
import { Transaction, TransactionInput } from '@/models/transaction';
import { TransactionService } from '@/services/api/transaction.service';
import { insertTransactionInOrder, updateTransactionInOrder } from '@/utils/transaction';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList } from 'react-native';

const PAGE_SIZE = 10;

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
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
      console.log(error);
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

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    fetchTransactions(page + 1, true);
  }, [fetchTransactions, loading, hasMore, page]);

  const handleEditTransaction = useCallback(
    (transaction: Transaction) => {
      openEditModal(transaction);
    },
    [openEditModal]
  );

  const handleDeleteTransaction = useCallback((transaction: Transaction) => {
    Alert.alert('Excluir transação', 'Tem certeza que deseja excluir esta transação?', [
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
    ]);
  }, []);

  const renderTransactionItem = useCallback(
    ({ item, index }: { item: Transaction; index: number }) => {
      return (
        <TransactionItem
          transaction={item}
          index={index}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      );
    },
    [handleEditTransaction, handleDeleteTransaction]
  );

  const renderFooter = useCallback(() => {
    return <LoadingFooter loading={loading} />;
  }, [loading]);

  const handleNewTransaction = useCallback(() => {
    openCreateModal();
  }, [openCreateModal]);

  const renderEmptyState = useCallback(() => {
    return loading ? null : <EmptyState onNewTransaction={handleNewTransaction} />;
  }, [handleNewTransaction, loading]);

  const handleSaved = useCallback((saved: Transaction) => {
    setTransactions((prev) => {
      const exists = prev.some((t) => t._id === saved._id);
      return exists ? updateTransactionInOrder(prev, saved) : insertTransactionInOrder(prev, saved);
    });
  }, []);

  const submitTransactionRequest = useCallback(async (payload: TransactionInput, id?: string) => {
    return id
      ? TransactionService.updateTransaction(id, payload)
      : TransactionService.createTransaction(payload);
  }, []);

  return (
    <GradientContainer>
      {/* Header */}
      <TransactionsHeader onNewTransaction={handleNewTransaction} />

      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        ListEmptyComponent={renderEmptyState}
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
