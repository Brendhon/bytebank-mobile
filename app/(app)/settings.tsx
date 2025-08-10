import { AnimatedView } from '@/components/animation/AnimatedComponents';
import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import { GradientContainer } from '@/components/layout/GradientContainer';
import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthService } from '@/hooks/useAuthService';
import { SettingsFormData, settingsSchema } from '@/schemas/index';
import { colors } from '@/utils/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, Mail, Shield, User } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';

// Animated text component
const AnimatedText = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) => {
  return (
    <AnimatedView delay={delay} className={className}>
      <Text className={className}>
        {children}
      </Text>
    </AnimatedView>
  );
};

export default function SettingsScreen() {
  const { user } = useAuth();
  const { updateUser, validatePassword, isUpdatingUser } = useAuthService();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const watchedValues = watch();

  // Function to save changes
  const handleSaveChanges = useCallback(async (data: SettingsFormData) => {
    try {
      // Validate current password for any changes
      if (!data.currentPassword || !data.currentPassword.trim()) {
        Alert.alert('Erro', 'Senha atual é obrigatória para fazer alterações');
        return;
      }

      const isValidPassword = await validatePassword(data.currentPassword);
      if (!isValidPassword) {
        Alert.alert('Erro', 'Senha atual incorreta');
        return;
      }

      // Prepare data for update
      const updates: any = {
        name: data.name,
      };

      if (data.newPassword) {
        updates.password = data.newPassword;
      }

      // Update user
      await updateUser(updates);

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');

      // Clear password fields
      setValue('currentPassword', '');
      setValue('newPassword', '');
      setValue('confirmPassword', '');

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os dados. Tente novamente.');
    }
  }, [validatePassword, updateUser, setValue]);

  // Function to open account deletion modal
  const handleDeleteAccount = useCallback(() => {
    setDeleteModalVisible(true);
  }, []);

  return (
    <GradientContainer>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <AnimatedView delay={300} className={styles.header}>
          <AnimatedText className={styles.headerTitle} delay={450}>
            Minha conta
          </AnimatedText>
        </AnimatedView>

        {/* Form */}
        <AnimatedView delay={600} className={styles.formContainer}>
          {/* User data */}
          <AnimatedView delay={750} className={styles.section}>
            <View className={styles.sectionHeader}>
              <User size={20} color={colors.blue} />
              <AnimatedText className={styles.sectionTitle} delay={900}>
                Dados pessoais
              </AnimatedText>
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
                icon={<Mail size={16} />}
                disabled
                value={user?.email || ''}
              />
            </View>
          </AnimatedView>

          {/* Password change */}
          <AnimatedView delay={1050} className={styles.section}>
            <View className={styles.sectionHeader}>
              <Shield size={20} color={colors.blue} />
              <AnimatedText className={styles.sectionTitle} delay={1200}>
                Segurança
              </AnimatedText>
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
          </AnimatedView>

          {/* Action buttons */}
          <AnimatedView delay={1350} className={styles.buttonContainer}>
            {/* Save button */}
            <Button
              variant="blue"
              onPress={handleSubmit(handleSaveChanges)}
              loading={isUpdatingUser}
              className={styles.saveButton}
              accessibilityLabel="Salvar alterações da conta"
              accessibilityHint="Salva as alterações feitas nos dados pessoais e senha"
            >
              Salvar alterações
            </Button>

          </AnimatedView>
        </AnimatedView>

        {/* Danger section */}
        <AnimatedView delay={1500} className={styles.dangerSection}>
          <View className={styles.dangerHeader}>
            <AlertTriangle size={20} color={colors.orange} />
            <AnimatedText className={styles.dangerTitle} delay={1650}>
              Zona de perigo
            </AnimatedText>
          </View>
          <AnimatedText className={styles.dangerDescription} delay={1800}>
            A exclusão da conta é permanente e não pode ser desfeita.
            Todos os seus dados serão perdidos.
          </AnimatedText>

          <Button
            variant="orange"
            onPress={handleDeleteAccount}
            className={styles.deleteButton}
            accessibilityLabel="Excluir conta permanentemente"
            accessibilityHint="Abre um modal para confirmar a exclusão da conta com validação de senha"
          >
            Excluir conta
          </Button>
        </AnimatedView>
      </ScrollView>

      {/* Account deletion modal */}
      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
      />
    </GradientContainer>
  );
}

const styles = {
  header: 'border-light-green border-b bg-white p-6',
  headerTitle: 'text-dark text-xl font-semibold',
  formContainer: 'gap-8 bg-white p-6 rounded-xl border border-light-green m-4',
  section: 'gap-6',
  sectionHeader: 'flex-row items-center gap-3',
  sectionTitle: 'text-dark text-xl font-semibold',
  inputGroup: 'gap-4',
  buttonContainer: 'gap-8',
  saveButton: 'w-full',
  dangerSection: 'bg-orange/5 border border-orange/20 rounded-xl p-6 gap-4 m-4 mb-8',
  dangerHeader: 'flex-row items-center gap-3',
  dangerTitle: 'text-orange text-lg font-semibold',
  dangerDescription: 'text-gray text-base',
  deleteButton: 'rounded-xl px-6 items-center justify-center',
};
