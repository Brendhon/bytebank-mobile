import Button from '@/components/form/Button';
import { Checkbox } from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import RegisterIllustration from '@/components/illustrations/RegisterIllustration';
import Modal from '@/components/modal/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterFormData, registerSchema } from '@/schemas/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RegisterModal({ visible, onClose }: RegisterModalProps) {
  const { signUp, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptPrivacy: false,
    },
  });

  // Submit
  const onSubmit = async (data: RegisterFormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        acceptPrivacy: data.acceptPrivacy,
      });
      onClose();
      reset();
    } catch {
      Alert.alert('Erro', 'Falha no registro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close
  const handleClose = () => {
    reset();
    onClose();
  };

  // Watch values
  const watchedValues = watch();

  // Illustration component
  const illustration = <RegisterIllustration height={200} />;

  return (
    <Modal visible={visible} onClose={handleClose} title="Criar Conta" illustration={illustration}>
      <View className={styles.formContainer}>
        <Input
          label="Nome"
          placeholder="Digite seu nome completo"
          icon={<User />}
          value={watchedValues.name}
          onChangeText={(text) => setValue('name', text)}
          error={errors.name?.message}
        />

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

        <Input
          label="Confirme sua senha"
          placeholder="Repita sua senha"
          type="password"
          value={watchedValues.confirmPassword}
          onChangeText={(text) => setValue('confirmPassword', text)}
          error={errors.confirmPassword?.message}
        />

        <Checkbox
          name="acceptPrivacy"
          control={control}
          label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."
        />

        <View className={styles.buttonContainer}>
          <Button
            variant="green"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading || isSubmitting}
            disabled={isLoading || isSubmitting}
            className="w-full"
          >
            {isLoading || isSubmitting ? 'Criando conta...' : 'Criar Conta'}
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
