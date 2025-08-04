import { useAuth } from '@/contexts/AuthContext';
import { LoginFormData, loginSchema } from '@/schemas/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import LoginIllustration from './illustrations/LoginIllustration';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
  const { signIn, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Submit
  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await signIn({ email: data.email, password: data.password });
      onClose();
      reset();
    } catch {
      Alert.alert('Erro', 'Falha no login. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close
  const handleClose = () => {
    reset();
    onClose();
  };

  // Watch values
  const watchedValues = watch();

  // Illustration component
  const illustration = <LoginIllustration />;

  return (
    <Modal visible={visible} onClose={handleClose} title="Login" illustration={illustration}>
      <View className={styles.formContainer}>
        <Input
          label="Email"
          placeholder="Digite seu email"
          type="email"
          icon={<Mail />}
          value={watchedValues.email}
          onChangeText={(text) => setValue('email', text)}
          error={errors.email?.message}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          value={watchedValues.password}
          onChangeText={(text) => setValue('password', text)}
          error={errors.password?.message}
        />

        <View className={styles.buttonContainer}>
          <Button
            variant="green"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading || isSubmitting}
            disabled={isLoading || isSubmitting}
            className="w-full"
          >
            {isLoading || isSubmitting ? 'Entrando...' : 'Acessar'}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  formContainer: 'gap-4',
  buttonContainer: 'flex-col items-center gap-6 pt-4',
};
