import { colors } from '@/utils/colors';
import { cloneElement, isValidElement, memo, ReactElement, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

interface InputIconProps {
  icon: ReactElement;
  onIconClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const InputIcon = ({ icon, onIconClick, disabled = false, label }: InputIconProps) => {
  // Clone the icon and add the size and color props
  const clonedIcon = useMemo(() => {
    // Check if the icon is valid
    if (!icon || !isValidElement(icon)) return null;

    // Clone the icon and add the size and color props
    return cloneElement(icon, { size: 20, color: colors.blue, ...(icon.props || {}) } as any);
  }, [icon]);

  return (
    <TouchableOpacity
      className={styles.icon}
      onPress={onIconClick}
      disabled={!onIconClick || disabled}
      accessibilityLabel={`Botão ${label || 'do campo'}`}
      accessibilityHint={onIconClick ? "Toque para executar ação" : "Botão desabilitado"}
      accessibilityRole="button"
      accessibilityState={{ disabled: !onIconClick || disabled }}
    >
      {clonedIcon}
    </TouchableOpacity>
  );
};

const styles = {
  icon: 'absolute right-3 top-2 p-2',
}

export default memo(InputIcon);
