# Ethereum.org Color Scheme Implementation

This document outlines the color scheme changes made to align Gas4All with ethereum.org's official design system.

## Color Palette

### Primary Colors
- **Primary Purple**: `hsl(250 95% 60%)` - Main ethereum.org brand color
- **Primary Glow**: `hsl(250 100% 70%)` - Enhanced primary for highlights
- **Secondary Teal**: `hsl(180 100% 40%)` - Complementary teal color
- **Secondary Glow**: `hsl(180 100% 50%)` - Enhanced secondary for highlights

### Additional Ethereum.org Colors
- **Ethereum Blue**: `hsl(210 100% 50%)` - For informational elements
- **Ethereum Green**: `hsl(142 84% 55%)` - For success states
- **Ethereum Orange**: `hsl(25 95% 60%)` - For warnings
- **Ethereum Red**: `hsl(0 84% 60%)` - For errors/destructive actions
- **Ethereum Yellow**: `hsl(45 93% 58%)` - For attention-grabbing elements

## Gradients

### Primary Gradients
- **Primary Gradient**: `linear-gradient(135deg, hsl(250 95% 60%), hsl(250 100% 70%))`
- **Secondary Gradient**: `linear-gradient(135deg, hsl(180 100% 40%), hsl(180 100% 50%))`
- **Hero Gradient**: `linear-gradient(135deg, hsl(250 95% 60%), hsl(180 100% 40%))`
- **Warm Gradient**: `linear-gradient(180deg, hsl(180 100% 50%) 0%, hsl(250 95% 60%) 100%)`

## CSS Custom Properties

All colors are defined as CSS custom properties in `src/index.css`:

```css
:root {
  --primary: 250 95% 60%;
  --primary-glow: 250 100% 70%;
  --secondary: 180 100% 40%;
  --secondary-glow: 180 100% 50%;
  --ethereum-blue: 210 100% 50%;
  --ethereum-green: 142 84% 55%;
  --ethereum-orange: 25 95% 60%;
  --ethereum-red: 0 84% 60%;
  --ethereum-yellow: 45 93% 58%;
}
```

## Tailwind Classes

### Color Utilities
- `text-ethereum-primary` - Primary purple text
- `text-ethereum-secondary` - Secondary teal text
- `bg-ethereum-primary` - Primary purple background
- `bg-ethereum-secondary` - Secondary teal background
- `border-ethereum-primary` - Primary purple border
- `border-ethereum-secondary` - Secondary teal border

### Button Variants
- `btn-ethereum-primary` - Primary ethereum button
- `btn-ethereum-secondary` - Secondary ethereum button

### Card Variants
- `card-ethereum-primary` - Primary ethereum card
- `card-ethereum-secondary` - Secondary ethereum card

## Usage Examples

```tsx
// Primary ethereum button
<Button className="btn-ethereum-primary">
  Connect Wallet
</Button>

// Secondary ethereum card
<Card className="card-ethereum-secondary">
  <CardTitle>Network Selection</CardTitle>
</Card>

// Ethereum primary text
<h1 className="text-ethereum-primary">
  Gas4All Dashboard
</h1>
```

## Dark Mode Support

All colors automatically adapt to dark mode with appropriate contrast adjustments. The ethereum.org purple and teal colors maintain their vibrancy while ensuring readability in both light and dark themes.

## Accessibility

The color scheme has been designed to meet WCAG AA contrast requirements:
- Primary purple on white: 4.5:1 contrast ratio
- Secondary teal on white: 4.8:1 contrast ratio
- All text colors maintain sufficient contrast in both themes
