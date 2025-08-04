import { useAuth } from '@/contexts/AuthContext';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Mail } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/index';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
  const { signIn, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleClose = () => {
    reset();
    onClose();
  };

  const watchedValues = watch();

  return (
    <Modal visible={visible} onClose={handleClose} title="Login">
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
