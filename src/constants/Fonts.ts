// src/constants/Fonts.ts
export const Fonts = {
    // Font Families
    family: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    
    // Font Weights
    weight: {
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
    
    // Font Sizes
    size: {
      // Headings
      h1: 32,
      h2: 28,
      h3: 24,
      h4: 20,
      h5: 18,
      h6: 16,
      
      // Body Text
      body: 16,
      bodySmall: 14,
      caption: 12,
      overline: 10,
      
      // UI Elements
      button: 16,
      buttonSmall: 14,
      buttonLarge: 18,
      input: 16,
      label: 14,
      
      // Financial Display
      currency: 24,
      currencyLarge: 28,
      currencySmall: 16,
      percentage: 14,
      
      // Navigation
      tabLabel: 12,
      headerTitle: 18,
      
      // Special
      logo: 32,
      splash: 48,
    },
    
    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },
    
    // Letter Spacing
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1,
    },
    
    // Predefined Text Styles
    styles: {
      // Headings
      h1: {
        fontSize: 32,
        fontWeight: '700' as const,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: 28,
        fontWeight: '700' as const,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h3: {
        fontSize: 24,
        fontWeight: '600' as const,
        lineHeight: 1.3,
        letterSpacing: 0,
      },
      h4: {
        fontSize: 20,
        fontWeight: '600' as const,
        lineHeight: 1.4,
        letterSpacing: 0,
      },
      h5: {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 1.4,
        letterSpacing: 0,
      },
      h6: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 1.4,
        letterSpacing: 0,
      },
      
      // Body Text
      body: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 1.5,
        letterSpacing: 0,
      },
      bodySmall: {
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 1.4,
        letterSpacing: 0,
      },
      caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        lineHeight: 1.3,
        letterSpacing: 0.5,
      },
      overline: {
        fontSize: 10,
        fontWeight: '500' as const,
        lineHeight: 1.2,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
      },
      
      // UI Elements
      button: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 1.2,
        letterSpacing: 0.5,
      },
      buttonSmall: {
        fontSize: 14,
        fontWeight: '600' as const,
        lineHeight: 1.2,
        letterSpacing: 0.5,
      },
      buttonLarge: {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 1.2,
        letterSpacing: 0.5,
      },
      input: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 1.4,
        letterSpacing: 0,
      },
      label: {
        fontSize: 14,
        fontWeight: '500' as const,
        lineHeight: 1.3,
        letterSpacing: 0.5,
      },
      
      // Financial Display
      currency: {
        fontSize: 24,
        fontWeight: '700' as const,
        lineHeight: 1.2,
        letterSpacing: 0,
      },
      currencyLarge: {
        fontSize: 28,
        fontWeight: '700' as const,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      currencySmall: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 1.2,
        letterSpacing: 0,
      },
      percentage: {
        fontSize: 14,
        fontWeight: '600' as const,
        lineHeight: 1.2,
        letterSpacing: 0,
      },
      
      // Navigation
      tabLabel: {
        fontSize: 12,
        fontWeight: '500' as const,
        lineHeight: 1.2,
        letterSpacing: 0.5,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 1.2,
        letterSpacing: 0,
      },
      
      // Special
      logo: {
        fontSize: 32,
        fontWeight: '700' as const,
        lineHeight: 1,
        letterSpacing: -0.5,
      },
      splash: {
        fontSize: 48,
        fontWeight: '700' as const,
        lineHeight: 1,
        letterSpacing: -1,
      },
    },
  } as const;
  
  export type FontSize = keyof typeof Fonts.size;
  export type FontWeight = keyof typeof Fonts.weight;
  export type FontStyle = keyof typeof Fonts.styles;