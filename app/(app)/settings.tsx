import { useAuth } from '@/contexts/AuthContext';
import { useAuthService } from '@/hooks/useAuthService';
import { SettingsFormData, settingsSchema } from '@/schemas/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User, Shield, AlertTriangle, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import { GradientContainer } from '@/components/layout/GradientContainer';
import { colors } from '@/utils/colors';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { updateUser, deleteUser, validatePassword, isUpdatingUser } = useAuthService();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const watchedValues = watch();

  // Função para salvar alterações
  const handleSaveChanges = async (data: SettingsFormData) => {
    try {
      // Validar senha atual se houver alteração de senha
      if (data.newPassword && data.currentPassword) {
        const isValidPassword = await validatePassword(data.currentPassword);
        if (!isValidPassword) {
          Alert.alert('Erro', 'Senha atual incorreta');
          return;
        }
      }

      // Preparar dados para atualização
      const updates: any = {
        name: data.name,
        email: data.email,
      };

      if (data.newPassword) {
        updates.password = data.newPassword;
      }

      // Atualizar usuário
      await updateUser(updates);
      
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      
      // Limpar campos de senha
      setValue('currentPassword', '');
      setValue('newPassword', '');
      setValue('confirmPassword', '');
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os dados. Tente novamente.');
    }
  };

  // Função para excluir conta
  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);
              await deleteUser();
              await signOut();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a conta. Tente novamente.');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <GradientContainer>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className={styles.header}>
          <Text className={styles.headerTitle}>Minha conta</Text>
        </View>

        {/* Formulário */}
        <View className={styles.formContainer}>
          {/* Dados do usuário */}
          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <User size={24} color={colors.blue} />
              <Text className={styles.sectionTitle}>Dados pessoais</Text>
            </View>
            
            <View className={styles.inputGroup}>
              <Input
                label="Nome completo"
                placeholder="Digite seu nome completo"
                icon={<User size={16} />}
                value={watchedValues.name}
                onChangeText={(text) => setValue('name', text)}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Digite seu email"
                disabled
                icon={<Mail size={16} />}
                value={watchedValues.email}
                onChangeText={(text) => setValue('email', text)}
                error={errors.email?.message}
              />
            </View>
          </View>

          {/* Alteração de senha */}
          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Shield size={24} color={colors.blue} />
              <Text className={styles.sectionTitle}>Segurança</Text>
            </View>
            
            <View className={styles.inputGroup}>
              <Input
                label="Senha atual"
                type="password"
                placeholder="Digite sua senha atual"
                value={watchedValues.currentPassword}
                onChangeText={(text) => setValue('currentPassword', text)}
                error={errors.currentPassword?.message}
              />

              <Input
                label="Nova senha"
                type="password"
                placeholder="Digite sua nova senha"
                value={watchedValues.newPassword}
                onChangeText={(text) => setValue('newPassword', text)}
                error={errors.newPassword?.message}
              />

              <Input
                label="Confirmar nova senha"
                type="password"
                placeholder="Repita sua nova senha"
                value={watchedValues.confirmPassword}
                onChangeText={(text) => setValue('confirmPassword', text)}
                error={errors.confirmPassword?.message}
              />
            </View>
          </View>

          {/* Botões de ação */}
          <View className={styles.buttonContainer}>
            {/* Botão salvar */}
            <Button
              variant="blue"
              onPress={handleSubmit(handleSaveChanges)}
              loading={isUpdatingUser}
              disabled={isDeleting || isUpdatingUser || !isDirty}
              className={styles.saveButton}
              accessibilityLabel="Salvar alterações da conta"
              accessibilityHint="Salva as alterações feitas nos dados pessoais e senha"
            >
              Salvar alterações
            </Button>

            {/* Seção de perigo */}
            <View className={styles.dangerSection}>
              <View className={styles.dangerHeader}>
                <AlertTriangle size={20} color={colors.orange} />
                <Text className={styles.dangerTitle}>Zona de perigo</Text>
              </View>
              <Text className={styles.dangerDescription}>
                A exclusão da conta é permanente e não pode ser desfeita. 
                Todos os seus dados serão perdidos.
              </Text>
              
              <Button
              variant="orange"
              onPress={handleDeleteAccount}
              loading={isDeleting}
              disabled={isDeleting || isUpdatingUser}
              className={styles.deleteButton}
              accessibilityLabel="Excluir conta permanentemente"
              accessibilityHint="Abre um alerta para confirmar a exclusão da conta"
            >
              Excluir conta
            </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientContainer>
  );
}

const styles = {
  header: 'border-light-green border-b bg-white p-6',
  headerTitle: 'text-dark text-2xl font-bold',
  headerContent: 'gap-2',
  headerSubtitle: 'text-gray text-base',
  formContainer: 'px-6 py-6 gap-8',
  section: 'gap-6',
  sectionHeader: 'flex-row items-center gap-3',
  sectionTitle: 'text-dark text-2xl font-semibold',
  inputGroup: 'gap-4',
  buttonContainer: 'gap-8',
  saveButton: 'w-full',
  dangerSection: 'bg-orange/5 border border-orange/20 rounded-xl p-6 gap-4',
  dangerHeader: 'flex-row items-center gap-3',
  dangerTitle: 'text-orange text-lg font-semibold',
  dangerDescription: 'text-gray text-base',
  deleteButton: 'rounded-xl px-6 items-center justify-center',
};
