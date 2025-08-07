import { useAuth } from '@/contexts/AuthContext';
import { useAuthService } from '@/hooks/useAuthService';
import { SettingsFormData, settingsSchema } from '@/schemas/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import { GradientContainer } from '@/components/layout/GradientContainer';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { updateUser, deleteUser, validatePassword, isUpdatingUser } = useAuthService();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
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
      <ScrollView className="flex-1">
        {/* Header */}
        <View className={styles.header}>
          <Text className={styles.headerTitle}>Minha conta</Text>
        </View>

        {/* Formulário */}
        <View className={styles.formContainer}>
          {/* Dados do usuário */}
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>Dados pessoais</Text>
            
            <Input
              label="Nome"
              placeholder="Digite seu nome"
              icon={<User />}
              value={watchedValues.name}
              onChangeText={(text) => setValue('name', text)}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              icon={<Mail />}
              value={watchedValues.email}
              onChangeText={(text) => setValue('email', text)}
              error={errors.email?.message}
            />
          </View>

          {/* Alteração de senha */}
          <View className={styles.section}>
            <Text className={styles.sectionTitle}>Alterar senha</Text>
            
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
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
              label="Confirme sua senha"
              type="password"
              placeholder="Repita sua nova senha"
              value={watchedValues.confirmPassword}
              onChangeText={(text) => setValue('confirmPassword', text)}
              error={errors.confirmPassword?.message}
            />
          </View>

          {/* Botões de ação */}
          <View className={styles.buttonContainer}>
            <Button
              variant="orange"
              onPress={handleDeleteAccount}
              loading={isDeleting}
              disabled={isDeleting || isUpdatingUser}
              className={styles.deleteButton}
            >
              Excluir conta
            </Button>

            <Button
              variant="blue"
              onPress={handleSubmit(handleSaveChanges)}
              loading={isUpdatingUser}
              disabled={isDeleting || isUpdatingUser}
              className={styles.saveButton}
            >
              Salvar alterações
            </Button>
          </View>
        </View>
      </ScrollView>
    </GradientContainer>
  );
}

const styles = {
  header: 'border-light-green border-b bg-white p-6',
  headerTitle: 'text-dark text-2xl font-bold',
  formContainer: 'p-6 space-y-6',
  section: 'space-y-4',
  sectionTitle: 'text-dark text-lg font-semibold mb-4',
  buttonContainer: 'space-y-4 pt-4',
  deleteButton: 'w-full',
  saveButton: 'w-full',
};
