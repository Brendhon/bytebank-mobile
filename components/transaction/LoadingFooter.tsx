import { AnimatedView } from '@/components/animation/AnimatedComponents';
import { Text } from 'react-native';

interface LoadingFooterProps {
  loading: boolean;
}

/**
 * Loading footer component for transaction list
 */
export const LoadingFooter = ({ loading }: LoadingFooterProps) => {
  if (!loading) return null;

  return (
    <AnimatedView delay={300} className={styles.container}>
      <Text className={styles.text}>Carregando mais transações...</Text>
    </AnimatedView>
  );
};

const styles = {
  container: 'py-4 items-center',
  text: 'text-gray text-sm',
};
