import { SafeAreaView } from 'react-native';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={styles.container}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex-1 m-6 bg-white',
};

export default Container;