import { colors } from '@/utils/colors';
import { View } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import Button from '../form/Button';
import LogoIllustration from '../illustrations/LogoIllustration';

type HeaderProps = {
  onOpenAccount: () => void;
  onLogin: () => void;
};

export const GuestHeader = ({ onOpenAccount, onLogin }: HeaderProps) => {
  return (
    <View className={styles.container}>
      <View className={styles.content}>
        <Animated.View entering={FadeIn.delay(0).springify()}>
          <LogoIllustration width={24} height={24} color={colors.green} />
        </Animated.View>
        
        <Animated.View entering={SlideInRight} className={styles.buttonContainer}>
          <Button
            variant="green"
            onPress={onOpenAccount}
            className={styles.registerButton}
            accessibilityLabel="Register button"
            accessibilityHint="Opens the registration modal">
            Cadastrar
          </Button>
          <Button
            variant="outlineGreen"
            onPress={onLogin}
            className={styles.loginButton}
            accessibilityLabel="Login button"
            accessibilityHint="Opens the login modal">
            Entrar
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = {
  container: 'bg-dark px-5 py-3 pt-16',
  content: 'flex-row items-center justify-between gap-4',
  buttonContainer: 'flex-row gap-4',
  loginButton: 'w-20 h-10',
  registerButton: 'w-24 h-10',
}; 