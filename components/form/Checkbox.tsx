import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Control, Controller } from 'react-hook-form';

interface CheckboxProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  control,
  label,
  error,
  className = '',
  labelClassName = '',
  errorClassName = '',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <View className={`${styles.container} ${className}`}>
          <TouchableOpacity
            onPress={() => field.onChange(!field.value)}
            className={styles.checkbox}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: field.value }}
          >
            <View className={`${styles.checkboxInner} ${field.value ? styles.checkboxChecked : ''}`}>
              {field.value && <Text className={styles.checkmark}>✓</Text>}
            </View>
            <Text className={`${styles.label} ${labelClassName}`}>
              {label}
            </Text>
          </TouchableOpacity>
          {(fieldState.error || error) && (
            <Text className={`${styles.errorText} ${errorClassName}`}>
              {fieldState.error?.message || error}
            </Text>
          )}
        </View>
      )}
    />
  );
}; 

const styles = {
  container: 'flex items-start gap-2',
  checkbox: 'flex-row items-start gap-2',
  checkboxInner: 'w-5 h-5 border-2 border-gray rounded items-center justify-center',
  checkboxChecked: 'bg-green border-green',
  checkmark: 'text-white text-xs font-bold',
  label: 'flex-1 text-sm text-gray leading-5',
  errorText: 'text-red text-sm mt-1',
};