import { Text } from 'react-native';

interface InputErrorProps {
  error: string;
}

const InputError = ({ error }: InputErrorProps) => {
  return <Text className={styles.error} accessibilityRole="text"> {error} </Text>;
};

const styles = {
  error: 'text-red text-sm mt-1',
}

export default InputError;
