import { View } from 'react-native';
import LogoIllustration from '../illustrations/LogoIllustration';
import Button from '../form/Button';

type HeaderProps = {
  onOpenAccount: () => void;
  onLogin: () => void;
};

export const GuestHeader = ({ onOpenAccount, onLogin }: HeaderProps) => {
  return (
    <View className={styles.container}>
      <View className={styles.content}>
        <LogoIllustration width={24} height={24} color='#47A138' />
        <View className={styles.buttonContainer}>
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