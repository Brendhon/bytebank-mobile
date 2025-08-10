# Spinner Component

## Overview

The `Spinner` component is a reusable animated loading indicator that displays a rotating icon with customizable color and size.

## Features

- **Customizable Color**: Accepts any color from the project's color palette
- **Customizable Size**: Configurable size with a default of 16
- **Smooth Animation**: Uses `react-native-reanimated` for smooth rotation animation
- **TypeScript Support**: Fully typed with proper interfaces

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `ColorKey` | `'dark-gray'` | Color from the project's color palette |
| `size` | `number` | `16` | Size of the spinner icon |
| `className` | `string` | `undefined` | Additional CSS classes for styling |

## Usage

### Basic Usage

```tsx
import { Spinner } from '@/components/animation';

// Default spinner
<Spinner />

// Custom color and size
<Spinner color="blue" size={24} />

// With custom styling
<Spinner color="green" size={20} className="my-4" />
```

### Available Colors

The component accepts any color key from the project's color palette:

- `blue` - Primary blue color
- `orange` - Accent orange color  
- `green` - Success green color
- `red` - Error red color
- `gray` - Text gray color
- `dark-gray` - Dark text color
- `dark` - Primary text color
- `white` - White color
- `light-green` - Light green background
- `light-gray` - Light gray background

## Implementation Details

- Uses `react-native-reanimated` for smooth 60fps animations
- Implements continuous rotation animation with 1-second duration
- Leverages the `Loader2` icon from `lucide-react-native`
- Follows project's TypeScript and styling conventions
