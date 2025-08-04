import { useAuth } from '@/contexts/AuthContext';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import Modal from './Modal';

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

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <Modal visible={visible} onClose={handleClose} title="Criar Conta">
      <View className={styles.formContainer}>
        <View className={styles.inputGroup}>
          <Text className={styles.label}>Nome Completo</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome completo"
            className={styles.input}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            className={styles.input}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
            className={styles.input}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.label}>Confirmar Senha</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirme sua senha"
            secureTextEntry
            className={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          disabled={isLoading}
          className={`${styles.button} ${isLoading ? styles.buttonDisabled : styles.buttonEnabled}`}>
          <Text className={styles.buttonText}>
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  formContainer: 'space-y-4',
  inputGroup: '',
  label: 'text-gray-700 mb-2 text-sm font-medium',
  input: 'border-gray-300 text-gray-900 rounded-lg border px-4 py-3',
  button: 'mt-6 rounded-lg px-4 py-3',
  buttonEnabled: 'bg-blue-600',
  buttonDisabled: 'bg-gray-400',
  buttonText: 'text-center font-semibold text-white',
};
