import { View } from 'react-native';
import Animated, { SlideInRight, FadeOut, FadeIn } from 'react-native-reanimated';
import LogoIllustration from '../illustrations/LogoIllustration';
import Button from '../form/Button';

type HeaderProps = {
  onOpenAccount: () => void;
  onLogin: () => void;
};

// Animated view component for buttons
const AnimatedButton = ({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number; 
}) => {
  return (
    <Animated.View 
      entering={SlideInRight.delay(delay).springify()} 
      exiting={FadeOut}
    >
      {children}
    </Animated.View>
  );
};

export const GuestHeader = ({ onOpenAccount, onLogin }: HeaderProps) => {
  return (
    <View className={styles.container}>
      <View className={styles.content}>
        <Animated.View entering={FadeIn.delay(0).springify()}>
          <LogoIllustration width={24} height={24} color='#47A138' />
        </Animated.View>
        <View className={styles.buttonContainer}>
          <AnimatedButton delay={0}>
            <Button
              variant="green"
              onPress={onOpenAccount}
              className={styles.registerButton}
              accessibilityLabel="Register button"
              accessibilityHint="Opens the registration modal">
              Cadastrar
            </Button>
          </AnimatedButton>
          <AnimatedButton delay={200}>
            <Button
              variant="outlineGreen"
              onPress={onLogin}
              className={styles.loginButton}
              accessibilityLabel="Login button"
              accessibilityHint="Opens the login modal">
              Entrar
            </Button>
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: 'bg-dark px-6 py-6 pt-16',
  content: 'flex-row items-center justify-between gap-4',
  buttonContainer: 'flex-row gap-4',
  loginButton: 'w-20 h-10',
  registerButton: 'w-24 h-10',
}; 