# Checkbox Component

## Overview

The `Checkbox` component is a reusable form input that provides a customizable checkbox with label and error handling. It integrates seamlessly with React Hook Form for form management.

## Import

```typescript
import { Checkbox } from '@/components/form/Checkbox';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | Yes | - | Field name for React Hook Form |
| `control` | `Control<any>` | Yes | - | React Hook Form control object |
| `label` | `string` | Yes | - | Text label for the checkbox |
| `error` | `string` | No | - | Custom error message |
| `className` | `string` | No | `''` | Additional CSS classes for container |
| `labelClassName` | `string` | No | `''` | Additional CSS classes for label |
| `errorClassName` | `string` | No | `''` | Additional CSS classes for error text |

## Usage

### Basic Usage

```typescript
import { Checkbox } from '@/components/form/Checkbox';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { control } = useForm();

  return (
    <Checkbox
      name="acceptTerms"
      control={control}
      label="I accept the terms and conditions"
    />
  );
}
```

### With Custom Styling

```typescript
<Checkbox
  name="acceptPrivacy"
  control={control}
  label="I agree to the privacy policy"
  className="my-4"
  labelClassName="text-sm text-gray-600"
  errorClassName="text-red-500 text-xs"
/>
```

### With Custom Error

```typescript
<Checkbox
  name="acceptTerms"
  control={control}
  label="I accept the terms"
  error="You must accept the terms to continue"
/>
```

## Features

- **Accessibility**: Includes proper ARIA attributes for screen readers
- **Form Integration**: Seamless integration with React Hook Form
- **Error Handling**: Displays validation errors from form schema
- **Customizable**: Supports custom styling through className props
- **TypeScript**: Fully typed with TypeScript interfaces

## Styling

The component uses NativeWind classes and can be customized through the `className`, `labelClassName`, and `errorClassName` props. Default styles include:

- Checkbox: 20x20px with border and rounded corners
- Checked state: Blue background with white checkmark
- Label: Gray text with proper line height
- Error: Red text with smaller font size 