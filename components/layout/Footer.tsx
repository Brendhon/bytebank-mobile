import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut} className="flex-row justify-between">
          
        <Content>
          <Text className="text-base font-bold text-white">Contato</Text>
          <Text className="text-white">0800 004 250 08</Text>
          <Text className="text-white">meajuda@bytebank.com.br</Text>
        </Content>

        <Content>
          <Text className="text-2xl font-bold text-white">Bytebank</Text>
        </Content>

      </Animated.View>
    </View>
  );
}; 