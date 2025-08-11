import { useMemo } from 'react';
import { InputTypes } from '@/models/form';

interface UseInputConfigProps {
  type: InputTypes;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'off' | 'email' | 'password' | 'name' | 'tel';
}

export const useInputConfig = ({
  type,
  keyboardType,
  autoCapitalize,
  autoComplete,
}: UseInputConfigProps) => {
  const keyboardTypeValue = useMemo(() => {
    if (keyboardType) return keyboardType;

    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'phone':
        return 'phone-pad';
      case 'date':
        return 'numeric';
      default:
        return 'default';
    }
  }, [keyboardType, type]);

  const autoCapitalizeValue = useMemo(() => {
    if (autoCapitalize) return autoCapitalize;
    return type === 'email' ? 'none' : 'sentences';
  }, [autoCapitalize, type]);

  const autoCompleteValue = useMemo(() => {
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
  }, [autoComplete, type]);

  const isPassword = type === 'password';
  const isDate = type === 'date';
  const isPhone = type === 'phone';

  const dateMask = '99/99/9999';
  const phoneMask = '(99) 99999-9999';

  return {
    keyboardTypeValue,
    autoCapitalizeValue,
    autoCompleteValue,
    isPassword,
    isDate,
    isPhone,
    dateMask,
    phoneMask,
  };
};
