import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import Modal from '@/components/modal/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthService } from '@/hooks/useAuthService';
import { colors } from '@/utils/colors';
import { AlertTriangle } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ visible, onClose }: DeleteAccountModalProps) {
  const { signOut } = useAuth();
  const { deleteUser, validatePassword } = useAuthService();
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      Alert.alert('Erro', 'Por favor, insira sua senha para confirmar a exclusão.');
      return;
    }

    try {
      setIsDeleting(true);

      // Validar senha
      const isValidPassword = await validatePassword(password);
      if (!isValidPassword) {
        Alert.alert('Erro', 'Senha incorreta. Tente novamente.');
        return;
      }

      // Excluir conta
      await deleteUser();
      
      // Sign out to clear all user data
      await signOut();

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a conta. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setPassword('');
    onClose();
  };

  // Illustration component
  const illustration = (
    <View className={styles.illustration}>
      <AlertTriangle size={80} color={colors.orange} />
    </View>
  );

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title="Excluir Conta"
      illustration={illustration}
    >
      <View className={styles.container}>
        <View className={styles.warningSection}>
          <Text className={styles.warningTitle}>Atenção!</Text>
          <Text className={styles.warningText}>
            Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão perdidos.
          </Text>
        </View>

        <View className={styles.formSection}>
          <Input
            label="Digite sua senha"
            placeholder="Confirme sua senha para excluir a conta"
            type="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          variant="orange"
          onPress={handleDeleteAccount}
          loading={isDeleting}
          disabled={isDeleting || !password.trim()}
        >
          {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
        </Button>
      </View>
    </Modal>
  );
}

const styles = {
  container: 'gap-6',
  illustration: 'items-center justify-center',
  warningSection: 'bg-orange/10 border border-orange/20 rounded-xl p-4 gap-2',
  warningTitle: 'text-orange text-lg font-semibold text-center',
  warningText: 'text-gray text-base text-center',
  formSection: 'gap-4', 
};
