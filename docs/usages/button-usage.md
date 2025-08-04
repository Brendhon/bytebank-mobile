# Button Component

A reusable button component for React Native with multiple variants and loading states.

## Import

```typescript
import Button from '@/components/Button';
```

## Basic Usage

```typescript
<Button onPress={() => console.log('Button pressed')}>
  Click me
</Button>
```

## Variants

The button supports different visual variants:

```typescript
// Default blue variant
<Button variant="blue" onPress={handlePress}>
  Blue Button
</Button>

// Dark variant
<Button variant="dark" onPress={handlePress}>
  Dark Button
</Button>

// Green variant
<Button variant="green" onPress={handlePress}>
  Green Button
</Button>

// Orange variant
<Button variant="orange" onPress={handlePress}>
  Orange Button
</Button>

// Outline variants
<Button variant="outlineGreen" onPress={handlePress}>
  Outline Green
</Button>

<Button variant="outlineOrange" onPress={handlePress}>
  Outline Orange
</Button>
```

## Loading State

```typescript
<Button 
  loading={true} 
  onPress={handlePress}
>
  Loading...
</Button>
```

## Disabled State

```typescript
<Button 
  disabled={true} 
  onPress={handlePress}
>
  Disabled Button
</Button>
```

## Custom Styling

```typescript
<Button 
  className="w-48 h-12" 
  onPress={handlePress}
>
  Custom Size
</Button>
```

## Accessibility

```typescript
<Button 
  onPress={handlePress}
  accessibilityLabel="Submit form button"
  accessibilityHint="Double tap to submit the form"
>
  Submit
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'blue'` | Visual variant of the button |
| `children` | `React.ReactNode` | - | Button content |
| `className` | `string` | - | Additional CSS classes |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `disabled` | `boolean` | `false` | Disables the button |
| `onPress` | `() => void` | - | Press handler |
| `accessibilityLabel` | `string` | - | Accessibility label |
| `accessibilityHint` | `string` | - | Accessibility hint |

## ButtonVariant Type

```typescript
type ButtonVariant = 'dark' | 'blue' | 'green' | 'orange' | 'outlineGreen' | 'outlineOrange';
``` 