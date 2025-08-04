import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

/**
 * Button variants - Defines different styles for the button component
 * using a variant management approach compatible with React Native
 * This provides a way to define different styles based on the variant prop passed to the Button component.
 * The variant styles are defined in the styles object at the end of the file.
 */
type ButtonVariant = 'dark' | 'blue' | 'green' | 'orange' | 'outlineGreen' | 'outlineOrange';

/**
 * Button props
 */
interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

/**
 * Button component - A reusable button component that accepts variant and children props
 */
const Button = ({
  className,
  variant = 'blue',
  children,
  loading = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`${styles.base} ${styles[variant]} ${isDisabled ? styles.disabled : ''} ${className || ''}`}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
      {...props}>
      <Text className={`${styles.text} ${loading ? styles.textHidden : ''}`}>{children}</Text>
      {loading && <ActivityIndicator size="small" color="#FFFFFF" className={styles.loader} />}
    </TouchableOpacity>
  );
};

const styles = {
  // Base styles for all button variants
  base: `h-12 rounded-md relative items-center justify-center`,
  disabled: `opacity-70`,

  // Text styles
  text: `text-white text-base font-semibold`,
  textHidden: `opacity-0`,

  // Loader styles
  loader: `absolute`,

  // Variant styles
  dark: `bg-dark`,
  blue: `bg-blue`,
  green: `bg-green`,
  orange: `bg-orange`,
  outlineGreen: `bg-transparent border-2 border-green`,
  outlineOrange: `bg-transparent border-2 border-orange`,
};

export default Button;
