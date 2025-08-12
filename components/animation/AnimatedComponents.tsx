import { Text } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';

interface AnimatedViewProps {
  children: React.ReactNode;
  className: string;
  delay?: number;
}

interface AnimatedTextProps {
  children: React.ReactNode;
  className: string;
  delay?: number;
}

/**
 * Animated view component with fade in animation
 */
export const AnimatedView = ({ children, className, delay = 0 }: AnimatedViewProps) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      className={className}
      exiting={FadeOut}>
      {children}
    </Animated.View>
  );
};

/**
 * Animated text component with fade in animation
 */
export const AnimatedText = ({ children, className, delay = 0 }: AnimatedTextProps) => {
  return (
    <AnimatedView delay={delay} className={className}>
      <Text className={className}>{children}</Text>
    </AnimatedView>
  );
};
