import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// Define the FooterContent component
const Content = ({ children }: { children: ReactNode }) => {
  return (
    <View className={styles.content}>
      {children}
    </View>
  );
};

// Define the Footer component
export const Footer = () => {
  return (
    <View className={styles.container}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut} className={styles.animation}>
          
        <Content>
          <Text className={styles.contentTitle}>Contato</Text>
          <Text className={styles.contentText}>0800 004 250 08</Text>
          <Text className={styles.contentText}>meajuda@bytebank.com.br</Text>
        </Content>

        <Content>
          <Text className={styles.logo}>Bytebank</Text>
        </Content>

      </Animated.View>
    </View>
  );
}; 

const styles = {
  container: 'bg-dark px-6 py-8',
  animation: 'flex-row justify-between',
  content: 'flex-col gap-2 justify-center',
  contentTitle: 'text-base font-bold text-white',
  contentText: 'text-white',
  logo: 'text-2xl font-bold text-white italic',
}