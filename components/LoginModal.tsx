import { useAuth } from '@/contexts/AuthContext';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { X, Mail } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/index';
import Input from './Input';
import Button from './Button';

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
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex items-center justify-center p-4">
          <Text className="text-dark text-2xl font-bold">Login</Text>
        </View>

        {/* Form */}
        <View className="p-6">
          <View className="gap-4">
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

            <View className="flex-col items-center gap-6 pt-4">

              <Button
                variant="dark"
                onPress={handleClose}
                className="w-full"
              >
                Cancelar
              </Button>

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
        </View>
      </View>
    </Modal>
  );
}
