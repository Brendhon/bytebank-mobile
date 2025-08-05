import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import Animated, { SlideInUp, FadeOut } from 'react-native-reanimated';

// Animated view component for footer content
const AnimatedContent = ({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number; 
}) => {
  return (
    <Animated.View 
      entering={SlideInUp.delay(delay).springify()} 
      exiting={FadeOut}
    >
      {children}
    </Animated.View>
  );
};

// Define the FooterContent component
const Content = ({ children }: { children: ReactNode }) => {
  return (
    <View className="flex flex-col gap-2 justify-center">
      {children} 
    </View>
  );
};

// Define the Footer component
export const Footer = () => {
  return (
    <View className="bg-dark px-6 py-8">
      <View className="flex-row justify-between">
        <AnimatedContent delay={0}>
          <Content>
            <Text className="text-base font-bold text-white">Contato</Text>
            <Text className="text-white">0800 004 250 08</Text>
            <Text className="text-white">meajuda@bytebank.com.br</Text>
          </Content>
        </AnimatedContent>

        <AnimatedContent delay={300}>
          <Content>
            <Text className="text-2xl font-bold text-white">Bytebank</Text>
          </Content>
        </AnimatedContent>
      </View>
    </View>
  );
}; 