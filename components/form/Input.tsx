import { colors } from '@/utils/colors';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { cloneElement, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

// Tipos para o componente
export type InputTypes = 'text' | 'email' | 'password' | 'date' | 'number' | 'phone';

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

export default function Input({
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
  // Estado para mostrar/ocultar senha
  const [showPassword, setShowPassword] = useState(false);

  // Verificar se é senha
  const isPassword = type === 'password';

  // Verificar se é data
  const isDate = type === 'date';

  // Verificar se é telefone
  const isPhone = type === 'phone';

  // Obter tipo de teclado
  const getKeyboardType = () => {
    if (keyboardType) return keyboardType;
    if (type === 'email') return 'email-address';
    if (type === 'number') return 'numeric';
    if (type === 'phone') return 'phone-pad';
    if (isDate) return 'numeric';
    return 'default';
  };

  // Obter entrada segura
  const getSecureTextEntry = () => {
    return !secureTextEntry ? secureTextEntry : type === 'password' && !showPassword;
  };

  // Obter capitalização automática
  const getAutoCapitalize = () => {
    if (autoCapitalize) return autoCapitalize;
    return type === 'email' ? 'none' : 'sentences';
  };

  // Obter autocompletar
  const getAutoComplete = () => {
    if (autoComplete) return autoComplete;
    switch (type) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      case 'phone':
        return 'tel';
      default:
        return 'off';
    }
  };

  // Obter máscara para data (dd/mm/yyyy)
  const getDateMask = () => '99/99/9999';

  // Obter máscara para telefone
  const getPhoneMask = () => '(99) 99999-9999';

  // Constantes para classes CSS
  const inputClassName = [
    styles.input,
    (icon || isPassword) && styles.inputWithIcon,
    error ? styles.inputError : styles.inputDefault,
    disabled && styles.inputDisabled,
    className
  ].filter(Boolean).join(' ');

  // Constantes para accessibility
  const getAccessibilityLabel = () => {
    const fieldType = isDate ? 'data' : isPhone ? 'telefone' : type;
    return `${label || 'Campo'} de ${fieldType}`;
  };

  const getAccessibilityHint = () => {
    if (isDate) return "Digite a data no formato DD/MM/AAAA";
    if (isPhone) return "Digite o telefone no formato (00) 00000-0000";
    return `Digite ${label?.toLowerCase() || 'o valor'}`;
  };

  return (
    <View className={styles.container}>
      {label && (
        <Text 
          className={styles.label}
          accessibilityRole="text"
        >
          {label}
        </Text>
      )}

      <View className={styles.inputContainer}>
        {/* Input com máscara para data */}
        {isDate ? (
          <MaskedTextInput
            value={value}
            onChangeText={(text, rawText) => onChangeText?.(text)}
            placeholder={placeholder || 'DD/MM/AAAA'}
            mask={getDateMask()}
            keyboardType={getKeyboardType()}
            autoCapitalize={getAutoCapitalize()}
            autoComplete={getAutoComplete()}
            editable={!disabled}
            autoFocus={autoFocus}
            style={[
              rnStyles.input,
              (icon || isPassword) && rnStyles.inputWithIcon,
              error ? rnStyles.inputError : rnStyles.inputDefault,
              disabled && rnStyles.inputDisabled,
            ]}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityRole="text"
            accessibilityState={{ disabled }}
            {...props}
          />
        ) : isPhone ? (
          <MaskedTextInput
            value={value}
            onChangeText={(text, rawText) => onChangeText?.(text)}
            placeholder={placeholder}
            mask={getPhoneMask()}
            keyboardType={getKeyboardType()}
            autoCapitalize={getAutoCapitalize()}
            autoComplete={getAutoComplete()}
            editable={!disabled}
            autoFocus={autoFocus}
            style={[
              rnStyles.input,
              (icon || isPassword) && rnStyles.inputWithIcon,
              error ? rnStyles.inputError : rnStyles.inputDefault,
              disabled && rnStyles.inputDisabled,
            ]}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityRole="text"
            accessibilityState={{ disabled }}
            {...props}
          />
        ) : (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={getSecureTextEntry()}
            keyboardType={getKeyboardType()}
            autoCapitalize={getAutoCapitalize()}
            autoComplete={getAutoComplete()}
            editable={!disabled}
            autoFocus={autoFocus}
            className={inputClassName}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityRole="text"
            accessibilityState={{ disabled }}
            {...props}
          />
        )}

        {/* Ícone customizado */}
        {icon && !isPassword && (
          <TouchableOpacity
            className={styles.iconButton}
            onPress={onIconClick}
            disabled={!onIconClick || disabled}
            accessibilityLabel={`Botão ${label || 'do campo'}`}
            accessibilityHint={onIconClick ? "Toque para executar ação" : "Botão desabilitado"}
            accessibilityRole="button"
            accessibilityState={{ disabled: !onIconClick || disabled }}
          >
            {icon && React.isValidElement(icon) && cloneElement(icon, {
              size: 20,
              color: '#004D61',
              ...(icon.props || {}),
            } as any)}
          </TouchableOpacity>
        )}

        {/* Toggle de senha */}
        {isPassword && (
          <TouchableOpacity
            className={styles.iconButton}
            onPress={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            accessibilityLabel={`${showPassword ? 'Ocultar' : 'Mostrar'} senha`}
            accessibilityHint={`Toque para ${showPassword ? 'ocultar' : 'mostrar'} a senha`}
            accessibilityRole="button"
            accessibilityState={{ disabled }}
          >
            {showPassword ? (
              <EyeOff size={20} color="#004D61" />
            ) : (
              <Eye size={20} color="#004D61" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Mensagem de erro */}
      {error && (
        <Text 
          className={styles.errorText}
          accessibilityRole="text"
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = {
  container: 'space-y-2',
  label: 'text-dark text-lg font-bold mb-2',
  inputContainer: 'relative',
  input: 'w-full h-13 bg-white border-2 border-gray rounded-md px-4 text-dark text-lg',
  inputWithIcon: 'pr-12',
  inputDefault: 'border-gray',
  inputError: 'border-red border-2',
  inputDisabled: 'opacity-50',
  iconButton: 'absolute right-3 top-2 p-2',
  errorText: 'text-red text-sm mt-1',
};

// React Native style object for MaskedTextInput where className has no effect
const rnStyles = {
  input: {
    width: '100%',
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 6,
    paddingHorizontal: 16,
    color: colors.dark,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  inputDefault: {
    borderColor: colors.gray,
  },
  inputError: {
    borderColor: colors.red,
    borderWidth: 2,
  },
  inputDisabled: {
    opacity: 0.5,
  },
} as const;
