import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { InputTypes } from '@/models/form';
import InputLabel from './InputLabel';
import InputError from './InputError';
import InputIcon from './InputIcon';
import PasswordToggle from './PasswordToggle';
import InputField from './InputField';
import { useInputAccessibility, useInputConfig, useInputStyles } from '@/hooks/input';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  type?: InputTypes;
  icon?: React.ReactElement;
  onIconClick?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'off' | 'email' | 'password' | 'name' | 'tel';
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  type = 'text',
  icon,
  onIconClick,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  disabled = false,
  className = '',
  autoFocus,
  ...props
}: InputProps) {
  // Config, accessibility and styles
  const {
    keyboardTypeValue,
    autoCapitalizeValue,
    autoCompleteValue,
    isPassword,
    isDate,
    isPhone,
    dateMask,
    phoneMask,
  } = useInputConfig({ type, keyboardType, autoCapitalize, autoComplete });

  const { accessibilityLabel, accessibilityHint, accessibilityState } = useInputAccessibility({
    type,
    label,
    isDate,
    isPhone,
    disabled,
  });

  const { inputClassName, maskedInputStyle } = useInputStyles({
    icon,
    isPassword,
    error,
    disabled,
    className,
  });

  // Local state to control password visibility
  const initialShowPassword = useMemo(() => {
    if (!isPassword) return false;
    // If secureTextEntry is provided, visibility is inverse of it; otherwise default to hidden
    return secureTextEntry === undefined ? false : !secureTextEntry;
  }, [isPassword, secureTextEntry]);

  const [showPassword, setShowPassword] = useState<boolean>(initialShowPassword);

  const handlePasswordToggle = useCallback((nextShowPassword: boolean) => {
    setShowPassword(nextShowPassword);
  }, []);

  // Compute secureTextEntry for TextInput
  const computedSecureTextEntry = useMemo(() => {
    if (!isPassword) return undefined;
    // If parent provides secureTextEntry, respect it but allow local toggle to override for UX
    const base = secureTextEntry ?? true; // default secure for password
    return showPassword ? false : base;
  }, [isPassword, secureTextEntry, showPassword]);

  return (
    <View className="space-y-2">
      {label && <InputLabel label={label} />}

      <View className="relative">
        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardTypeValue}
          autoCapitalize={autoCapitalizeValue}
          autoComplete={autoCompleteValue}
          editable={!disabled}
          autoFocus={autoFocus}
          secureTextEntry={computedSecureTextEntry}
          style={isDate || isPhone ? maskedInputStyle : undefined}
          className={isDate || isPhone ? undefined : inputClassName}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={accessibilityState}
          dateMask={dateMask}
          phoneMask={phoneMask}
          isDate={isDate}
          isPhone={isPhone}
          isPassword={isPassword}
          {...props}
        />

        {icon && !isPassword && (
          <InputIcon icon={icon} onIconClick={onIconClick} disabled={disabled} label={label} />
        )}

        {isPassword && (
          <PasswordToggle
            disabled={disabled}
            showPassword={showPassword}
            onToggle={handlePasswordToggle}
          />
        )}
      </View>

      {error && <InputError error={error} />}
    </View>
  );
}

export default memo(Input);
