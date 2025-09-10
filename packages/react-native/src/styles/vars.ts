// theme.js
export const COLORS = {
  light: '#FFFFFF', // Assuming this is what vars.$light-color is
  dark: '#333333',  // Assuming vars.$dark-color
  primary: '#007BFF', // Assuming vars.$primary-color
  primaryLight: '#7fbdff',
  grey: 'grey',
};

export const SIZES = {
  // Border radius, converted from a CSS variable
  borderRadius: 8, // Or a different number, whatever your design system uses
  // Rem values converted to dp (e.g., 1rem ≈ 16dp)
  gap: 16,
  minTabWidth: 96,  // 6rem * 16dp/rem
  tabHeight: 40,   // 2.5rem * 16dp/rem
  borderWidth: 1,
  selectedIndicatorWidth: 64, // 4rem * 16dp/rem
  selectedIndicatorHeight: 3,
  padding: 16,
};