import { Text } from 'react-native';

interface InputLabelProps {
  label: string;
}

const InputLabel = ({ label }: InputLabelProps) => {
  return (
    <Text className={styles.label} accessibilityRole="text">
      {' '}
      {label}{' '}
    </Text>
  );
};

const styles = {
  label: 'text-dark text-lg font-bold mb-2',
};

export default InputLabel;
