import { colors } from '@/utils/colors';
import { memo, useCallback } from 'react';
import { TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

interface InputFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete: 'off' | 'email' | 'password' | 'name' | 'tel';
  editable?: boolean;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  style?: any;
  className?: string;
  accessibilityLabel: string;
  accessibilityHint: string;
  accessibilityState: { disabled?: boolean };
  dateMask: string;
  phoneMask: string;
  isDate: boolean;
  isPhone: boolean;
  isPassword?: boolean;
}

const InputField = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  autoComplete,
  editable = true,
  autoFocus,
  secureTextEntry,
  style,
  className,
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  dateMask,
  phoneMask,
  isDate,
  isPhone,
  isPassword,
}: InputFieldProps) => {
  const handleMaskedChange = useCallback(
    (text: string, _rawText: string) => onChangeText?.(text),
    [onChangeText]
  );

  if (isDate) {
    return (
      <MaskedTextInput
        value={value}
        onChangeText={handleMaskedChange}
        placeholder={placeholder || 'DD/MM/AAAA'}
        placeholderTextColor={colors.gray}
        mask={dateMask}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        editable={editable}
        autoFocus={autoFocus}
        style={style}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="text"
        accessibilityState={accessibilityState}
      />
    );
  }

  if (isPhone) {
    return (
      <MaskedTextInput
        value={value}
        onChangeText={handleMaskedChange}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        mask={phoneMask}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        editable={editable}
        autoFocus={autoFocus}
        style={style}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="text"
        accessibilityState={accessibilityState}
      />
    );
  }

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      secureTextEntry={isPassword ? secureTextEntry : false}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      editable={editable}
      autoFocus={autoFocus}
      className={className}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="text"
      accessibilityState={accessibilityState}
    />
  );
};

export default memo(InputField);
