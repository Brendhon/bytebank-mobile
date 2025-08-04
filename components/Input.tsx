import React, { cloneElement, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
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
    if (secureTextEntry !== undefined) return secureTextEntry;
    return type === 'password' && !showPassword;
  };

  // Obter capitalização automática
  const getAutoCapitalize = () => {
    if (autoCapitalize) return autoCapitalize;
    if (type === 'email') return 'none';
    return 'sentences';
  };

  // Obter autocompletar
  const getAutoComplete = () => {
    if (autoComplete) return autoComplete;
    if (type === 'email') return 'email';
    if (type === 'password') return 'password';
    if (type === 'phone') return 'tel';
    return 'off';
  };

  // Obter máscara para data
  const getDateMask = () => {
    return 'DD/MM/YYYY';
  };

  // Obter máscara para telefone
  const getPhoneMask = () => {
    return '(99) 99999-9999';
  };

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
            placeholder={placeholder}
            mask={getDateMask()}
            keyboardType={getKeyboardType()}
            autoCapitalize={getAutoCapitalize()}
            autoComplete={getAutoComplete()}
            editable={!disabled}
            className={inputClassName}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityRole="text"
            accessibilityState={{ disabled }}
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
            className={inputClassName}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityRole="text"
            accessibilityState={{ disabled }}
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
            className={inputClassName}
            accessibilityLabel={getAccessibilityLabel()}
            accessibilityHint={getAccessibilityHint()}
            accessibilityRole="text"
            accessibilityState={{ disabled }}
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
  label: 'text-gray text-sm font-medium mb-1',
  inputContainer: 'relative',
  input: 'w-full bg-white border-2 border-gray rounded-lg px-4 py-3 text-dark',
  inputWithIcon: 'pr-12',
  inputDefault: 'border-gray',
  inputError: 'border-red border-2',
  inputDisabled: 'opacity-50',
  iconButton: 'absolute right-3 top-1 p-2',
  errorText: 'text-red text-sm mt-1',
};
