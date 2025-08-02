# Component Guidelines

This document outlines the best practices for creating React Native components in the Bytebank Mobile project. The goal is to ensure consistency, maintainability, and performance.

## 1. File Structure and Naming

-   **Location**: Store all components in the `components/` directory.
-   **Complexity**:
    -   **Simple Components**: A single file is sufficient (e.g., `components/Button.tsx`).
    -   **Complex Components**: Use a dedicated directory for components that require multiple files (e.g., hooks, types).
        -   `components/TransactionCard/index.tsx`
        -   `components/TransactionCard/types.ts`
-   **Naming**:
    -   Component files and directories must use `PascalCase` (e.g., `Button.tsx`, `TransactionCard/`).

## 2. Styling with NativeWind

To maintain clean and readable code, all styling must be centralized in a `styles` object. **Inline styles are forbidden.**

-   **`styles` Object**: Define all Tailwind classes in a `styles` object at the end of the file. Use semantic keys to describe the elements.
-   **Usage**: Apply styles using `className={styles.keyName}`.

**Example:**

```typescript
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles.container}>
      <Text className={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: `bg-blue-500 rounded-lg py-3 px-6 items-center justify-center`,
  label: `text-white font-bold text-base`,
};
```

## 3. Icons

-   **Library**: Use `lucide-react-native` for all icons.
-   **Implementation**: Import the required icon and use it directly in your component.

```typescript
import { Camera } from 'lucide-react-native';

const MyComponent = () => {
  return <Camera color="red" size={48} />;
};
```

## 4. Component Logic and State

-   **Functional Components**: All components must be functional. Class components are not allowed.
-   **TypeScript**: Typing is **mandatory** for all props, state, and hook return values.
-   **Hooks**:
    -   **`useState`**: For simple, local component state.
    -   **`useEffect`**: For side effects. Always include a dependency array and a cleanup function if necessary.
    -   **`useContext`**: To consume data from the Context API.
    -   **`useCallback` & `useMemo`**: For performance optimizations only when a clear bottleneck is identified.
-   **Custom Hooks**: Encapsulate reusable logic (e.g., API calls, business logic) in custom hooks and place them in the `hooks/` directory.

## 5. Responsive Design

Components must adapt to different screen sizes.

-   **Flexible Units**: Prioritize flexible units like percentages (`w-4/5`) and flexbox (`flex-1`).
-   **Avoid Fixed Values**: Do not use fixed pixel values (e.g., `w-[97px]`). Use Tailwind's `rem`-based spacing scale instead (`w-16`, `h-24`).
-   **Breakpoints**: Use NativeWind's responsive prefixes (`sm:`, `md:`, `lg:`) to apply styles at different screen sizes.

## 6. Accessibility (a11y)

Ensure the application is usable by everyone.

-   **Labels and Hints**:
    -   `accessibilityLabel`: Provide a descriptive text label, especially for icon-only buttons.
    -   `accessibilityHint`: Describe the action that will occur when the user interacts with an element.
-   **Roles and States**:
    -   `accessibilityRole`: Define the element's purpose (e.g., `'button'`, `'header'`).
    -   `accessibilityState`: Describe the component's current state (e.g., `{ disabled: true }`).
-   **Touch Area**: Interactive elements must have a minimum touch area of **44x44 points**. Use padding if needed to increase the touch target size without changing the visual appearance.
-   **Color Contrast**: The text-to-background contrast ratio must be at least **4.5:1**.