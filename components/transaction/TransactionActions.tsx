import Button from '@/components/form/Button';
import { Transaction } from '@/models/transaction';
import { colors } from '@/utils/colors';
import { Edit, Trash2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface TransactionActionsProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

/**
 * Component for transaction action buttons (edit/delete)
 */
export const TransactionActions = ({ transaction, onEdit, onDelete }: TransactionActionsProps) => {
  return (
    <View className={styles.container}>
      <Button
        variant="outlineGreen"
        className={styles.iconButton}
        onPress={() => onEdit(transaction)}
        accessibilityLabel="Editar transação"
      >
        <View className={styles.actionContainer}>
          <Edit size={16} color={colors.green} />
          <Text className={styles.actionText}>Editar</Text>
        </View>
      </Button>
      <Button
        variant="outlineOrange"
        className={styles.iconButton}
        onPress={() => onDelete(transaction)}
        accessibilityLabel="Excluir transação"
      >
        <View className={styles.actionContainer}>
          <Trash2 size={16} color={colors.red} />
          <Text className={styles.actionText}>Excluir</Text>
        </View>
      </Button>
    </View>
  );
};

const styles = {
  container: 'flex-row gap-4',
  iconButton: 'h-9',
  actionContainer: 'flex-row items-center gap-1',
  actionText: 'text-sm font-medium',
};
