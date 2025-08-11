import { colors } from '@/utils/colors';
import { useMemo } from 'react';

interface UseInputStylesProps {
  icon?: React.ReactElement;
  isPassword: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const useInputStyles = ({
  icon,
  isPassword,
  error,
  disabled = false,
  className = '',
}: UseInputStylesProps) => {
  // Compute the input class name
  const inputClassName = useMemo(() => (
    [
      'w-full h-13 bg-white border-2 border-gray rounded-md px-4 text-dark text-lg',
      (icon || isPassword) && 'pr-12',
      error ? 'border-red border-2' : 'border-gray',
      disabled && 'opacity-50',
      className
    ].filter(Boolean).join(' ')
  ), [icon, isPassword, error, disabled, className]);

  // Compute the masked input style
  const maskedInputStyle = useMemo(
    () => [
      {
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
      (icon || isPassword) && {
        paddingRight: 48,
      },
      error ? {
        borderColor: colors.red,
        borderWidth: 2,
      } : {
        borderColor: colors.gray,
      },
      disabled && {
        opacity: 0.5,
      },
    ],
    [icon, isPassword, error, disabled]
  );

  return {
    inputClassName,
    maskedInputStyle,
  };
};
