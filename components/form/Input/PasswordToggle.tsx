import { colors } from '@/utils/colors';
import { Eye, EyeOff } from 'lucide-react-native';
import { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

interface PasswordToggleProps {
  disabled?: boolean;
  showPassword: boolean;
  onToggle: (nextShowPassword: boolean) => void;
}

const PasswordToggle = ({ 
  disabled = false,
  showPassword,
  onToggle,
}: PasswordToggleProps) => {
  const handlePress = useCallback(() => {
    onToggle(!showPassword);
  }, [showPassword, onToggle]);

  return (
    <TouchableOpacity
      className={styles.toggle}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={`${showPassword ? 'Ocultar' : 'Mostrar'} senha`}
      accessibilityHint={`Toque para ${showPassword ? 'ocultar' : 'mostrar'} a senha`}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {showPassword ? <EyeOff size={20} color={colors.blue} /> : <Eye size={20} color={colors.blue} />}
    </TouchableOpacity>
  );
};

const styles = {
  toggle: 'absolute right-3 top-2 p-2',
}

export default memo(PasswordToggle);
