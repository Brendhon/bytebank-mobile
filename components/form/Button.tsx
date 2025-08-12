import { colors } from '@/utils/colors';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

/**
 * Button variants - Defines different styles for the button component
 * using a variant management approach compatible with React Native
 * This provides a way to define different styles based on the variant prop passed to the Button component.
 * The variant styles are defined in the styles object at the end of the file.
 */
type ButtonVariant =
  | 'dark'
  | 'blue'
  | 'green'
  | 'orange'
  | 'outlineGreen'
  | 'outlineOrange'
  | 'outlineBlue';

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

  const textClass = `${styles.text.base} ${loading ? styles.text.hidden : ''} ${styles.text[variant]}`;

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
      <Text className={textClass}>{children}</Text>
      {loading && <ActivityIndicator size="small" color={colors.white} className={styles.loader} />}
    </TouchableOpacity>
  );
};

const styles = {
  // Base styles for all button variants
  base: `h-12 rounded-md relative items-center justify-center`,
  disabled: `opacity-70`,

  // Loader styles
  loader: `absolute`,

  // Variant styles
  dark: `bg-dark`,
  blue: `bg-blue`,
  green: `bg-green`,
  orange: `bg-orange`,
  outlineGreen: `bg-transparent border-2 border-green`,
  outlineOrange: `bg-transparent border-2 border-orange`,
  outlineBlue: `bg-transparent border-2 border-blue`,

  // Text styles
  text: {
    base: `text-base font-semibold px-3`,
    hidden: `opacity-0`,
    dark: `text-white`,
    blue: `text-white`,
    green: `text-white`,
    orange: `text-white`,
    outlineGreen: `text-green`,
    outlineOrange: `text-orange`,
    outlineBlue: `text-blue`,
  },
};

export default Button;
