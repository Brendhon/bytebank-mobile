import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Loader2 } from 'lucide-react-native';
import { colors, ColorKey } from '@/utils/colors';

interface SpinnerProps {
  color?: ColorKey;
  size?: number;
  className?: string;
}

/**
 * Animated spinner component with customizable color and size
 */
export const Spinner = ({ color = 'dark-gray', size = 16, className }: SpinnerProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }),
      -1, // Infinite repetition
      false // Don't reverse
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle} className={className}>
      <Loader2 size={size} color={colors[color]} />
    </Animated.View>
  );
};
