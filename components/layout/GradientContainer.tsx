import { GradientKey, gradients } from '@/utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

type GradientContainerProps = {
  /**
   * The gradient type to use from the gradients configuration
   * @default 'primary'
   */
  gradient?: GradientKey;
  /**
   * Content to render inside the gradient container
   */
  children: React.ReactNode;
};

/**
 * A reusable gradient container component that wraps LinearGradient
 * with predefined gradient configurations from the design system
 */
export const GradientContainer = ({ gradient = 'primary', children }: GradientContainerProps) => {
  const gradientConfig = gradients[gradient];

  return (
    <LinearGradient
      colors={gradientConfig.colors}
      locations={gradientConfig.locations}
      style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};
