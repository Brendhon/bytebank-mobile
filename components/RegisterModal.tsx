import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RegisterModal({ visible, onClose }: RegisterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, isLoading } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await signUp({ name, email, password, acceptPrivacy: true });
      onClose();
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Falha no registro. Tente novamente.');
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
          <Text className="text-gray-900 text-xl font-bold">Criar Conta</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="flex-1 p-6">
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2 text-sm font-medium">Nome Completo</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome completo"
                className="border-gray-300 text-gray-900 rounded-lg border px-4 py-3"
              />
            </View>

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

            <View>
              <Text className="text-gray-700 mb-2 text-sm font-medium">Confirmar Senha</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirme sua senha"
                secureTextEntry
                className="border-gray-300 text-gray-900 rounded-lg border px-4 py-3"
              />
            </View>

            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isLoading}
              className={`mt-6 rounded-lg px-4 py-3 ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`}>
              <Text className="text-center font-semibold text-white">
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
