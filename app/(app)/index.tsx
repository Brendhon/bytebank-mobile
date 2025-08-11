import { AnimatedView } from '@/components/animation/AnimatedComponents';
import { Spinner } from '@/components/animation/Spinner';
import { GradientContainer } from '@/components/layout/GradientContainer';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactionSummary } from '@/hooks/transaction';
import { colors } from '@/utils/colors';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { AlertCircle, Eye, EyeOff } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


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

// Types for movement data
type Movement = {
  id: number;
  type: string;
  value: number;
  color: string;
};

// Memoized icon components for better performance
const VisibilityIcon = ({ isVisible }: { isVisible: boolean }) => isVisible
  ? <EyeOff size={28} color={colors.dark} />
  : <Eye size={28} color={colors.dark} />;

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  
  // Fetch transaction summary data
  const { summary, loading, error } = useTransactionSummary();

  // Memoize movement data based on real transaction summary
  const movements: Movement[] = useMemo(() => {
    const breakdown = summary?.breakdown;
    return [
      {
        id: 1,
        type: 'Pagamentos',
        value: breakdown?.payment || 0,
        color: 'bg-dark',
      },
      {
        id: 2,
        type: 'Depósitos',
        value: breakdown?.deposit || 0,
        color: 'bg-blue',
      },
      {
        id: 3,
        type: 'Transferências',
        value: breakdown?.transfer || 0,
        color: 'bg-orange',
      },
      {
        id: 4,
        type: 'Saque',
        value: breakdown?.withdrawal || 0,
        color: 'bg-green',
      },
    ];
  }, [summary?.breakdown]);

  // Memoize first name extraction
  const firstName = useMemo(() => user?.name?.split(' ')?.[0] || 'Usuário', [user?.name]);

  // Memoize formatted date to prevent recalculation on every render
  const formattedDate = useMemo(() => formatDate(), []);

  // Memoize toggle function to prevent recreation on every render
  const toggleBalanceVisibility = useCallback(() => setIsBalanceVisible(prev => !prev), []);

  // Memoize accessibility label to prevent string recreation
  const visibilityAccessibilityLabel = useMemo(() => isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo', [isBalanceVisible]);

  // Memoize balance display value based on real data
  const balanceDisplayValue = useMemo(() => {
    switch (true) {
      case loading:
        return <Spinner color="white" size={20} />;
      case !!error:
        return <AlertCircle size={20} color={colors.red} />;
      default:
        return isBalanceVisible ? formatCurrency(summary?.balance || 0) : '••••••';
    }
  }, [isBalanceVisible, summary?.balance, loading, error]);

  // Show loading state if data is being fetched
  if (loading) {
    return (
      <GradientContainer>
        <View className={styles.loadingContainer}>
          <Spinner color="dark-gray" size={32} />
          <Text className={styles.loadingText}>Carregando dados...</Text>
        </View>
      </GradientContainer>
    );
  }

  return (
    <GradientContainer>
      <ScrollView className={styles.container}>
        {/* Header with greeting and date */}
        <AnimatedView delay={300} className={styles.header}>
          <View className={styles.headerContent}>
            <View className={styles.greetingContainer}>
              <AnimatedText className={styles.greetingText} delay={450}>
                Olá, {firstName}! :)
              </AnimatedText>
              <AnimatedText className={styles.dateText} delay={600}>
                {formattedDate}
              </AnimatedText>
            </View>

            <TouchableOpacity
              onPress={toggleBalanceVisibility}
              className={styles.visibilityButton}
              accessibilityLabel={visibilityAccessibilityLabel}
              accessibilityHint="Toque para alternar a visibilidade do saldo da conta"
              accessibilityRole="button"
              accessibilityState={{ checked: isBalanceVisible }}
            >
              <VisibilityIcon isVisible={isBalanceVisible} />
            </TouchableOpacity>
          </View>
        </AnimatedView>

        {/* Balance section */}
        <AnimatedView delay={750} className={styles.balanceSection}>
          <AnimatedView delay={900} className={styles.balanceCard}>
            <View className={styles.balanceInfo}>
              <AnimatedText className={styles.balanceLabel} delay={1050}>
                Saldo
              </AnimatedText>
              <AnimatedText className={styles.accountType} delay={1200}>
                Conta Corrente
              </AnimatedText>
            </View>

            <View className={styles.balanceValueContainer}>
              <Text
                className={styles.balanceValue}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ maxWidth: 220 }}
              >
                {balanceDisplayValue}
              </Text>
            </View>
          </AnimatedView>

          {/* Movements section */}
          <AnimatedView delay={1350} className={styles.movementsSection}>
            <AnimatedText className={styles.movementsTitle} delay={1500}>
              Movimentações
            </AnimatedText>

            <View className={styles.movementsList}>
              {movements.map((movement, index) => (
                <AnimatedView
                  key={movement.id}
                  delay={1650 + (index * 150)}
                  className={`${styles.movementCard} ${movement.color}`}
                >
                  <View
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
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>
        </AnimatedView>
      </ScrollView>
    </GradientContainer>
  );
}

const styles = {
  container: 'flex-1',
  header: 'p-6 mt-6',
  headerContent: 'flex-row items-start justify-between',
  greetingContainer: 'flex items-start justify-start gap-1',
  greetingText: 'text-2xl font-bold text-dark',
  dateText: 'text-dark-gray text-base',
  visibilityButton: 'p-2',
  balanceSection: 'p-6',
  balanceCard: 'mb-8 rounded-lg bg-dark p-6 shadow-sm flex-row justify-between',
  balanceInfo: 'flex items-start justify-start gap-1',
  balanceLabel: 'text-white text-xl font-semibold',
  accountType: 'text-white text-sm',
  balanceValueContainer: 'flex items-center justify-center',
  balanceValue: 'text-white mb-2 text-2xl font-bold',
  movementsSection: 'bg-white rounded-lg p-6 border border-light-green',
  movementsTitle: 'text-dark mb-4 text-2xl font-semibold',
  movementsList: 'flex gap-4',
  movementCard: 'rounded-lg p-6 shadow-sm',
  movementValue: 'text-xl font-bold text-white',
  movementType: 'text-white text-sm',
  loadingContainer: 'flex-1 justify-center items-center bg-white rounded-lg p-6 border border-light-green flex-row gap-2',
  loadingText: 'text-dark text-lg font-semibold',
};
