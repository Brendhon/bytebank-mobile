import Button from '@/components/form/Button';
import { AnimatedText, AnimatedView } from '@/components/animation/AnimatedComponents';
import { Text, View } from 'react-native';

interface TransactionsHeaderProps {
  onNewTransaction: () => void;
}

/**
 * Header component for the transactions screen
 */
export const TransactionsHeader = ({ onNewTransaction }: TransactionsHeaderProps) => {
  return (
    <AnimatedView delay={300} className={styles.header}>
      <View className={styles.headerContent}>
        <AnimatedText className={styles.headerTitle} delay={450}>
          Histórico
        </AnimatedText>
        <View className={styles.headerActions}>
          <Button
            variant="blue"
            className={styles.newTransactionButton}
            onPress={onNewTransaction}
            accessibilityLabel="Nova transação"
            accessibilityHint="Toque duas vezes para criar uma nova transação">
            <Text>Nova transação</Text>
          </Button>
        </View>
      </View>
    </AnimatedView>
  );
};

const styles = {
  header: 'border-light-green border-b bg-white p-4',
  headerContent: 'flex-row items-center justify-between',
  headerTitle: 'text-dark text-xl font-semibold',
  headerActions: 'flex-row gap-2',
  newTransactionButton: 'text-white',
};
