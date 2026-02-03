# Theme Implementation Guide

## Overview
Your Resume Builder application now has a comprehensive theming system with both light and dark mode support. The theme uses CSS custom properties (variables) that are applied throughout the entire application.

## What's Been Implemented

### 1. CSS Theme Variables (`src/index.css`)
- Added `:root` variables for light mode (default)
- Added `.dark` class variables for dark mode
- Variables include colors for:
  - Background and foreground
  - Card, popover, and modal backgrounds
  - Primary, secondary, accent colors
  - Muted colors and borders
  - Input, ring (focus), and destructive colors
  - Shadow variations (sm, md, lg, xl)
  - Font families (sans, serif, mono)
  - Border radius and spacing

### 2. Tailwind Configuration (`tailwind.config.js`)
- Enabled `darkMode: 'class'` for class-based dark mode toggling
- Extended Tailwind theme to use CSS variables
- Configured all color utilities to reference CSS custom properties
- Added border radius, box shadow, and font family utilities

### 3. Theme Context (`src/context/ThemeContext.jsx`)
- Created a React Context for global theme state management
- Implemented `useTheme` hook for easy theme access
- Features:
  - Persists theme preference to localStorage
  - Respects system preference on first load
  - Applies `.dark` class to document root when dark mode is active
  - Provides `toggleTheme` function for switching themes

### 4. Theme Toggle Component (`src/components/ThemeToggle.jsx`)
- Reusable button component for toggling between light and dark modes
- Shows moon icon in light mode, sun icon in dark mode
- Uses theme variables for consistent styling
- Can be placed anywhere in the application

### 5. Updated Components and Pages
The following pages have been updated to use theme variables:

#### Core Pages:
- **App.jsx**: Wrapped with ThemeProvider
- **LandingPage.jsx**: Updated all colors to use theme variables, added ThemeToggle
- **RegisterPage.jsx**: Updated form and container styling
- **LoginPage.jsx**: Updated form and container styling
- **Dashboard.jsx**: Updated header, cards, and added ThemeToggle

#### Component Updates:
- All hardcoded colors replaced with theme variable references
- Button classes (`.btn-primary`, `.btn-secondary`) now use theme variables
- Input fields (`.input-field`) use theme variables
- Cards, borders, and shadows use theme utilities

## How to Use

### Applying Theme Variables

#### In CSS Files:
```css
.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

#### In Tailwind Classes:
```jsx
<div className="bg-background text-foreground border border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Using the Theme Toggle

Add the ThemeToggle component to any page:

```jsx
import ThemeToggle from '../components/ThemeToggle';

function MyPage() {
  return (
    <div>
      <ThemeToggle />
      {/* rest of your component */}
    </div>
  );
}
```

### Accessing Theme State Programmatically

```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Theme Color Reference

### Light Mode Colors
- **Background**: `#f8fffe` (Very light mint)
- **Foreground**: `#065f46` (Dark green)
- **Primary**: `#059669` (Emerald green)
- **Secondary**: `#f0fdf4` (Light green tint)
- **Muted**: `#f0fdf4` (Subtle background)
- **Border**: `#d1fae5` (Light green border)
- **Accent**: `#059669` (Same as primary)
- **Destructive**: `#ef4444` (Red)

### Dark Mode Colors
- **Background**: `#030f0b` (Very dark green-black)
- **Foreground**: `#ecf5f1` (Very light green)
- **Primary**: `#34d399` (Light emerald)
- **Secondary**: `#064e3b` (Dark green)
- **Muted**: `#064e3b` (Dark green)
- **Border**: `#064e3b` (Dark green)
- **Accent**: `#34d399` (Light emerald)
- **Destructive**: `#ff7f7f` (Light red)

## Best Practices

1. **Always use theme variables**: Avoid hardcoded colors like `#ffffff` or `text-gray-900`
2. **Use semantic color names**: Use `text-foreground` instead of `text-gray-900`
3. **Leverage Tailwind utilities**: Prefer `bg-card` over `bg-white`
4. **Test both themes**: Always check your UI in both light and dark modes
5. **Use appropriate contrast**: Ensure text is readable in both themes

## Remaining Components to Update

For complete theme consistency, you may want to update these components:
- `ResumeForm.jsx`
- `ResumePreview.jsx`
- Template components (FaangPathTemplate, HarshibarTemplate, etc.)
- `CustomModal.jsx`
- `EmailModal.jsx`
- Any other custom components

## Customizing Colors

To change the theme colors, edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: #your-color;
  --background: #your-background;
  /* ... other variables */
}

.dark {
  --primary: #your-dark-mode-color;
  --background: #your-dark-background;
  /* ... other variables */
}
```

## Browser Support

The theme system uses modern CSS features:
- CSS Custom Properties (CSS Variables)
- Class-based dark mode
- localStorage API

Supported in all modern browsers (Chrome, Firefox, Safari, Edge).

## Troubleshooting

### Theme not persisting?
- Check browser localStorage is enabled
- Clear localStorage and try again: `localStorage.clear()`

### Colors not updating?
- Ensure component is wrapped in `<ThemeProvider>`
- Check if using hardcoded Tailwind colors instead of theme utilities
- Verify CSS variables are defined in `index.css`

### Dark mode class not applying?
- Check that `darkMode: 'class'` is set in `tailwind.config.js`
- Ensure ThemeProvider is wrapping your app in `App.jsx`

## Next Steps

1. Test the application thoroughly in both light and dark modes
2. Update remaining components to use theme variables
3. Consider adding more theme variants (e.g., high contrast mode)
4. Add theme selection beyond just light/dark (e.g., color accent preferences)
5. Add smooth transitions between theme changes with CSS transitions
