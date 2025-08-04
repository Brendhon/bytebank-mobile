# GradientContainer Usage

The `GradientContainer` component provides a reusable wrapper for `LinearGradient` with predefined gradient configurations from the design system.

## Basic Usage

```typescript
import { GradientContainer } from '@/components/layout/GradientContainer';

const MyComponent = () => {
  return (
    <GradientContainer>
      <Text>Content with primary gradient background</Text>
    </GradientContainer>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gradient` | `GradientKey` | `'primary'` | The gradient type to use from the gradients configuration |
| `children` | `React.ReactNode` | - | Content to render inside the gradient container |

## Available Gradients

Currently available gradient types:

- `primary`: Light green to white gradient

## Examples

### Using a specific gradient

```typescript
<GradientContainer gradient="primary">
  <BenefitsSection />
</GradientContainer>
```

### With custom styles

```typescript
<GradientContainer 
  gradient="primary"
>
  <Text>Content with custom padding</Text>
</GradientContainer>
```

## Implementation Details

The component uses the gradient configurations defined in `@/utils/colors.ts` and applies the `flex-1` style by default to ensure the gradient fills the available space. 