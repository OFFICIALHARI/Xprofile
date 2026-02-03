# Theme Quick Reference

## CSS Variables Available

### Colors
```css
--background          /* Main background */
--foreground          /* Main text color */
--card                /* Card backgrounds */
--card-foreground     /* Card text */
--popover             /* Popover backgrounds */
--popover-foreground  /* Popover text */
--primary             /* Primary brand color */
--primary-foreground  /* Text on primary */
--secondary           /* Secondary color */
--secondary-foreground /* Text on secondary */
--muted               /* Muted backgrounds */
--muted-foreground    /* Muted text */
--accent              /* Accent color */
--accent-foreground   /* Text on accent */
--destructive         /* Error/danger color */
--destructive-foreground /* Text on destructive */
--border              /* Border color */
--input               /* Input backgrounds */
--ring                /* Focus ring color */
```

### Other Variables
```css
--radius              /* Border radius */
--shadow              /* Default shadow */
--shadow-sm           /* Small shadow */
--shadow-md           /* Medium shadow */
--shadow-lg           /* Large shadow */
--shadow-xl           /* Extra large shadow */
--font-sans           /* Sans-serif font */
--font-serif          /* Serif font */
--font-mono           /* Monospace font */
```

## Tailwind Utility Classes

### Background Colors
- `bg-background` - Main background
- `bg-card` - Card background
- `bg-primary` - Primary color
- `bg-secondary` - Secondary color
- `bg-muted` - Muted background
- `bg-accent` - Accent color

### Text Colors
- `text-foreground` - Main text
- `text-primary` - Primary text
- `text-secondary` - Secondary text
- `text-muted-foreground` - Muted text
- `text-card-foreground` - Card text

### Border & Outline
- `border-border` - Border color
- `ring-ring` - Focus ring

### Shadows
- `shadow-sm` - Small shadow
- `shadow` - Default shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow

## Common Patterns

### Card Component
```jsx
<div className="bg-card text-card-foreground border border-border rounded-lg shadow-md p-6">
  <h3 className="text-foreground font-semibold">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Button (Primary)
```jsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90">
  Click Me
</button>
```

### Input Field
```jsx
<input 
  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring"
  placeholder="Enter text"
/>
```

### Section with Background
```jsx
<section className="bg-background py-12">
  <div className="container mx-auto">
    <h2 className="text-foreground text-3xl font-bold">Section Title</h2>
    <p className="text-muted-foreground">Section content</p>
  </div>
</section>
```

## Using Theme Toggle

```jsx
import ThemeToggle from '../components/ThemeToggle';

<header className="flex items-center justify-between">
  <Logo />
  <ThemeToggle />
</header>
```

## Using Theme Hook

```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

## Migration Checklist

When updating a component to use theme:

- [ ] Replace `bg-white` with `bg-card` or `bg-background`
- [ ] Replace `bg-gray-*` with `bg-muted` or `bg-secondary`
- [ ] Replace `text-gray-900` with `text-foreground`
- [ ] Replace `text-gray-600` with `text-muted-foreground`
- [ ] Replace `border-gray-*` with `border-border`
- [ ] Replace `text-primary-600` with `text-primary`
- [ ] Replace `bg-primary-*00` with `bg-primary/10` to `bg-primary/90`
- [ ] Replace hardcoded shadow classes with theme shadow utilities
- [ ] Test component in both light and dark modes
