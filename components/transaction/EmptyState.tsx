import { AnimatedView } from '@/components/animation/AnimatedComponents';
import Button from '@/components/form/Button';
import TransactionIllustration from '@/components/illustrations/TransactionIllustration';
import { memo, useCallback } from 'react';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  onNewTransaction?: () => void;
}

/**
 * Component displayed when the transactions list is empty
 */
export const EmptyState = memo(({ onNewTransaction }: EmptyStateProps) => {
  // Memoize the button press handler to prevent recreation on every render
  const handleButtonPress = useCallback(() => {
    onNewTransaction?.();
  }, [onNewTransaction]);

  return (
    <AnimatedView delay={300} className={styles.container}>
      <View className={styles.content}>
        {/* Illustration */}
        <AnimatedView delay={450} className={styles.illustrationContainer}>
          <TransactionIllustration width={200} height={140} />
        </AnimatedView>

        {/* Text Content */}
        <AnimatedView delay={600} className={styles.textContainer}>
          <Text className={styles.title}>Nenhuma transação encontrada</Text>
          <Text className={styles.description}>
            Comece a organizar suas finanças criando sua primeira transação
          </Text>
        </AnimatedView>

        {/* Action Button */}
        {onNewTransaction && (
          <AnimatedView delay={750} className={styles.buttonContainer}>
            <Button
              variant="green"
              onPress={handleButtonPress}
              className={styles.button}
              accessibilityLabel="Criar nova transação"
              accessibilityHint="Toque para adicionar uma nova transação à sua lista">
              Criar primeira transação
            </Button>
          </AnimatedView>
        )}
      </View>
    </AnimatedView>
  );
});

EmptyState.displayName = 'EmptyState';

const styles = {
  container: 'flex-1 justify-center items-center px-6 py-12',
  content: 'items-center max-w-sm',
  illustrationContainer: 'mb-8',
  textContainer: 'items-center mb-8',
  title: 'text-xl font-bold text-dark text-center mb-3',
  description: 'text-dark-gray text-base text-center leading-6',
  buttonContainer: 'w-full',
  button: 'w-full',
};
