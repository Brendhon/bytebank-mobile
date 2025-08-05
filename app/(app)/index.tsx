import { GradientContainer } from '@/components/layout/GradientContainer';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/utils/colors';
import { formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/currency';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Types for movement data
type Movement = {
  id: number;
  type: string;
  value: number;
  color: string;
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // Movement data
  const movements: Movement[] = [
    {
      id: 1,
      type: 'Pagamentos',
      value: 1001.00,
      color: 'bg-dark',
    },
    {
      id: 2,
      type: 'Depósitos',
      value: 9250.00,
      color: 'bg-blue',
    },
    {
      id: 3,
      type: 'Transferências',
      value: 510.00,
      color: 'bg-orange',
    },
    {
      id: 4,
      type: 'Saque',
      value: 0.00,
      color: 'bg-green',
    },
  ];

  // Get first name from user
  const firstName = user?.name?.split(' ')?.[0] || 'Usuário';

  // Toggle balance visibility
  const toggleBalanceVisibility = () => setIsBalanceVisible(!isBalanceVisible);

  return (
    <GradientContainer>
      <ScrollView className={styles.container}>
        {/* Header with greeting and date */}
        <View className={styles.header}>
          <View className={styles.headerContent}>
            <View className={styles.greetingContainer}>
              <Text className={styles.greetingText}>
                Olá, {firstName}! :)
              </Text>
              <Text className={styles.dateText}>{formatDate()}</Text>
            </View>

            <TouchableOpacity
              onPress={toggleBalanceVisibility}
              className={styles.visibilityButton}
              accessibilityLabel={isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
              accessibilityHint="Toque para alternar a visibilidade do saldo da conta"
              accessibilityRole="button"
              accessibilityState={{ checked: isBalanceVisible }}
            >
              {isBalanceVisible ? (
                <EyeOff size={32} color={colors.dark} />
              ) : (
                <Eye size={32} color={colors.dark} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance section */}
        <View className={styles.balanceSection}>
          <View className={styles.balanceCard}>
            <View className={styles.balanceInfo}>
              <Text className={styles.balanceLabel}>Saldo</Text>
              <Text className={styles.accountType}>Conta Corrente</Text>
            </View>

            <View className={styles.balanceValueContainer}>
              <Text
                className={styles.balanceValue}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ maxWidth: 220 }}
              >
                {isBalanceVisible ? 'R$ 15.420,50' : '••••••'}
              </Text>
            </View>
          </View>

          {/* Movements section */}
          <View className={styles.movementsSection}>
            <Text className={styles.movementsTitle}>
              Movimentações
            </Text>

            <View className={styles.movementsList}>
              {movements.map((movement) => (
                <View
                  key={movement.id}
                  className={`${styles.movementCard} ${movement.color}`}
                  accessibilityLabel={`${movement.type}: ${formatCurrency(movement.value)}`}
                  accessibilityRole="summary"
                >
                  <Text className={styles.movementValue}>
                    {isBalanceVisible ? formatCurrency(movement.value) : '••••••'}
                  </Text>
                  <Text className={styles.movementType}>
                    {movement.type}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientContainer>
  );
}

const styles = {
  container: 'flex-1',
  header: 'p-6 mt-6',
  headerContent: 'flex-row items-start justify-between',
  greetingContainer: 'flex items-start justify-start gap-1',
  greetingText: 'mb-2 text-3xl font-bold text-dark',
  dateText: 'text-dark-gray',
  visibilityButton: 'p-2',
  balanceSection: 'p-6',
  balanceCard: 'mb-8 rounded-lg bg-dark p-6 shadow-sm flex-row justify-between',
  balanceInfo: 'flex items-start justify-start gap-1',
  balanceLabel: 'text-white text-2xl font-semibold',
  accountType: 'text-white text-sm',
  balanceValueContainer: 'flex items-center justify-center',
  balanceValue: 'text-white mb-2 text-3xl font-bold',
  movementsSection: 'mb-6',
  movementsTitle: 'text-dark mb-4 text-2xl font-semibold',
  movementsList: 'flex gap-4',
  movementCard: 'rounded-lg p-6 shadow-sm',
  movementValue: 'mb-2 text-2xl font-bold text-white',
  movementType: 'text-white',
};
