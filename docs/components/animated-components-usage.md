# AnimatedComponents Usage

This document describes how to use the reusable animated components for consistent animations throughout the app.

## AnimatedView

A view component with fade-in animation and spring effect.

### Props

- `children`: React.ReactNode - Content to be animated
- `className`: string - Tailwind CSS classes for styling
- `delay`: number (optional) - Animation delay in milliseconds (default: 0)

### Usage

```typescript
import { AnimatedView } from '@/components/animation/AnimatedComponents';

<AnimatedView delay={300} className="p-4 bg-white rounded-lg">
  <Text>This content will fade in with animation</Text>
</AnimatedView>
```

## AnimatedText

A text component with fade-in animation and spring effect.

### Props

- `children`: React.ReactNode - Text content to be animated
- `className`: string - Tailwind CSS classes for styling
- `delay`: number (optional) - Animation delay in milliseconds (default: 0)

### Usage

```typescript
import { AnimatedText } from '@/components/animation/AnimatedComponents';

<AnimatedText delay={450} className="text-2xl font-bold text-dark">
  Animated Title
</AnimatedText>
```

## Animation Details

- Uses `react-native-reanimated` for smooth animations
- Entry animation: `FadeInUp` with spring effect
- Exit animation: `FadeOut`
- Progressive delays can be applied for staggered effects
