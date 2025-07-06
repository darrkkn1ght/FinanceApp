// src/constants/Sizes.ts
export const Sizes = {
    // Spacing
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 40,
      xxxl: 48,
    },
    
    // Padding
    padding: {
      container: 16,
      card: 16,
      button: 16,
      input: 12,
      screen: 20,
      section: 24,
    },
    
    // Margins
    margin: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      component: 12,
      section: 20,
    },
    
    // Border Radius
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
      full: 9999,
      
      // Component specific
      button: 8,
      card: 12,
      input: 8,
      modal: 16,
    },
    
    // Border Width
    borderWidth: {
      hairline: 0.5,
      thin: 1,
      thick: 2,
    },
    
    // Icon Sizes
    icon: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      xxl: 40,
      
      // Component specific
      tab: 24,
      button: 20,
      header: 24,
      card: 20,
    },
    
    // Button Sizes
    button: {
      height: {
        small: 32,
        medium: 44,
        large: 56,
      },
      minWidth: {
        small: 80,
        medium: 120,
        large: 160,
      },
      padding: {
        small: 8,
        medium: 16,
        large: 24,
      },
    },
    
    // Input Sizes
    input: {
      height: {
        small: 36,
        medium: 44,
        large: 52,
      },
      padding: {
        horizontal: 12,
        vertical: 8,
      },
    },
    
    // Card Sizes
    card: {
      minHeight: 80,
      padding: 16,
      margin: 8,
    },
    
    // Modal Sizes
    modal: {
      padding: 24,
      borderRadius: 16,
      maxWidth: 400,
    },
    
    // Header Sizes
    header: {
      height: 56,
      padding: 16,
    },
    
    // Tab Bar Sizes
    tabBar: {
      height: 60,
      padding: 8,
    },
    
    // Chart Sizes
    chart: {
      height: {
        small: 200,
        medium: 250,
        large: 300,
      },
      padding: 16,
    },
    
    // Avatar Sizes
    avatar: {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
      xxl: 80,
    },
    
    // Shadow Elevation
    elevation: {
      none: 0,
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12,
      xxl: 16,
    },
    
    // Opacity
    opacity: {
      disabled: 0.5,
      secondary: 0.7,
      overlay: 0.8,
      transparent: 0,
      opaque: 1,
    },
    
    // Hit Slop (for touchable areas)
    hitSlop: {
      small: { top: 8, bottom: 8, left: 8, right: 8 },
      medium: { top: 12, bottom: 12, left: 12, right: 12 },
      large: { top: 16, bottom: 16, left: 16, right: 16 },
    },
    
    // Screen Dimensions (will be overridden by actual device dimensions)
    screen: {
      width: 375, // iPhone 11 Pro width as baseline
      height: 812, // iPhone 11 Pro height as baseline
    },
    
    // Breakpoints for responsive design
    breakpoints: {
      small: 320,
      medium: 375,
      large: 414,
      tablet: 768,
    },
    
    // Z-Index
    zIndex: {
      background: -1,
      base: 0,
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      overlay: 1070,
      max: 9999,
    },
    
    // Animation Durations (in milliseconds)
    animation: {
      fast: 150,
      normal: 300,
      slow: 500,
      verySlow: 1000,
    },
    
    // Safe Area Insets (default values, will be overridden by actual device)
    safeArea: {
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    },
  } as const;
  
  export type SpacingSize = keyof typeof Sizes.spacing;
  export type IconSize = keyof typeof Sizes.icon;
  export type ButtonSize = keyof typeof Sizes.button.height;
  export type BorderRadius = keyof typeof Sizes.borderRadius;