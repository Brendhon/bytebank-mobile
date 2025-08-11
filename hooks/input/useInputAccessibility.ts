import { useMemo } from 'react';
import { InputTypes } from '@/models/form';

interface UseInputAccessibilityProps {
  type: InputTypes;
  label?: string;
  isDate: boolean;
  isPhone: boolean;
  disabled?: boolean;
}

export const useInputAccessibility = ({
  type,
  label,
  isDate,
  isPhone,
  disabled = false,
}: UseInputAccessibilityProps) => {
  const accessibilityLabel = useMemo(() => {
    const fieldType = isDate ? 'data' : isPhone ? 'telefone' : type;
    return `${label || 'Campo'} de ${fieldType}`;
  }, [isDate, isPhone, type, label]);

  const accessibilityHint = useMemo(() => {
    if (isDate) return 'Digite a data no formato DD/MM/AAAA';
    if (isPhone) return 'Digite o telefone no formato (00) 00000-0000';
    return `Digite ${label?.toLowerCase() || 'o valor'}`;
  }, [isDate, isPhone, label]);

  const accessibilityState = useMemo(() => ({ disabled }), [disabled]);

  return {
    accessibilityLabel,
    accessibilityHint,
    accessibilityState,
  };
};
