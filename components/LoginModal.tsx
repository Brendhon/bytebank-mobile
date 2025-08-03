import { useAuth } from '@/contexts/AuthContext';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { X } from 'lucide-react-native';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await signIn({ email, password });
      onClose();
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Falha no login. Tente novamente.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="border-gray-200 flex-row items-center justify-between border-b p-4">
          <Text className="text-gray-900 text-xl font-bold">Entrar</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="flex-1 p-6">
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2 text-sm font-medium">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border-gray-300 text-gray-900 rounded-lg border px-4 py-3"
              />
            </View>

            <View>
              <Text className="text-gray-700 mb-2 text-sm font-medium">Senha</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                secureTextEntry
                className="border-gray-300 text-gray-900 rounded-lg border px-4 py-3"
              />
            </View>

            <TouchableOpacity
              onPress={handleSignIn}
              disabled={isLoading}
              className={`mt-6 rounded-lg px-4 py-3 ${isLoading ? 'bg-gray' : 'bg-blue'}`}>
              <Text className="text-center font-semibold text-white">
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
