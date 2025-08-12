import { Text, View } from 'react-native';
import { AnimatedView } from '../animation/AnimatedComponents';
import { Spinner } from '../animation/Spinner';

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
      <View className={styles.loaderContainer}>
        <Spinner color="dark-gray" size={16} />
        <Text className={styles.text}>Carregando mais transações...</Text>
      </View>
    </AnimatedView>
  );
};

const styles = {
  container: 'items-center flex-row justify-center mb-4',
  text: 'text-dark-gray text-sm font-semibold',
  loaderContainer:
    'flex-row items-center gap-2 bg-white rounded-lg border border-light-green px-4 py-2',
};
