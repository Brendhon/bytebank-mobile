import { useAuth } from '@/contexts/AuthContext';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { X, Mail } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/index';
import Input from './Input';

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
        <View className="border-gray-200 flex-row items-center justify-between border-b p-4">
          <Text className="text-gray-900 text-xl font-bold">Entrar</Text>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="flex-1 p-6">
          <View className="space-y-4">
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

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading || isSubmitting}
              className={`mt-6 rounded-lg px-4 py-3 ${
                isLoading || isSubmitting ? 'bg-gray-400' : 'bg-blue-600'
              }`}>
              <Text className="text-center font-semibold text-white">
                {isLoading || isSubmitting ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
