// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.layout.statusBarHeight,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Layout Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Padding Styles
  padding: {
    padding: theme.spacing.lg,
  },
  
  paddingHorizontal: {
    paddingHorizontal: theme.spacing.lg,
  },
  
  paddingVertical: {
    paddingVertical: theme.spacing.lg,
  },
  
  paddingSmall: {
    padding: theme.spacing.sm,
  },
  
  paddingMedium: {
    padding: theme.spacing.md,
  },
  
  paddingLarge: {
    padding: theme.spacing.xl,
  },
  
  // Margin Styles
  margin: {
    margin: theme.spacing.lg,
  },
  
  marginHorizontal: {
    marginHorizontal: theme.spacing.lg,
  },
  
  marginVertical: {
    marginVertical: theme.spacing.lg,
  },
  
  marginSmall: {
    margin: theme.spacing.sm,
  },
  
  marginMedium: {
    margin: theme.spacing.md,
  },
  
  marginLarge: {
    margin: theme.spacing.xl,
  },
  
  // Text Styles
  textPrimary: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.normal,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.md * theme.fonts.lineHeights.normal,
  },
  
  textSecondary: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.normal,
    color: theme.colors.textSecondary,
    lineHeight: theme.fonts.sizes.sm * theme.fonts.lineHeights.normal,
  },
  
  textTertiary: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.normal,
    color: theme.colors.textTertiary,
    lineHeight: theme.fonts.sizes.xs * theme.fonts.lineHeights.normal,
  },
  
  // Heading Styles
  heading1: {
    fontSize: theme.fonts.sizes.display,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.display * theme.fonts.lineHeights.tight,
  },
  
  heading2: {
    fontSize: theme.fonts.sizes.title,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.title * theme.fonts.lineHeights.tight,
  },
  
  heading3: {
    fontSize: theme.fonts.sizes.heading,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.heading * theme.fonts.lineHeights.tight,
  },
  
  heading4: {
    fontSize: theme.fonts.sizes.xxxl,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.xxxl * theme.fonts.lineHeights.tight,
  },
  
  heading5: {
    fontSize: theme.fonts.sizes.xxl,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.xxl * theme.fonts.lineHeights.tight,
  },
  
  heading6: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.xl * theme.fonts.lineHeights.tight,
  },
  
  // Caption and Label Styles
  caption: {
    fontSize: theme.fonts.sizes.xs,
    fontWeight: theme.fonts.weights.normal,
    color: theme.colors.textSecondary,
    lineHeight: theme.fonts.sizes.xs * theme.fonts.lineHeights.normal,
  },
  
  label: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.sm * theme.fonts.lineHeights.normal,
  },
  
  // Financial Text Styles
  currencyText: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.lg * theme.fonts.lineHeights.tight,
  },
  
  currencyLarge: {
    fontSize: theme.fonts.sizes.heading,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textPrimary,
    lineHeight: theme.fonts.sizes.heading * theme.fonts.lineHeights.tight,
  },
  
  incomeText: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.income,
    lineHeight: theme.fonts.sizes.lg * theme.fonts.lineHeights.tight,
  },
  
  expenseText: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.expense,
    lineHeight: theme.fonts.sizes.lg * theme.fonts.lineHeights.tight,
  },
  
  // Button Styles
  button: {
    height: theme.components.button.height,
    borderRadius: theme.components.button.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.components.button.minWidth,
  },
  
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  
  buttonText: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.surface,
  },
  
  buttonTextOutline: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.primary,
  },
  
  // Card Styles
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.components.card.borderRadius,
    padding: theme.components.card.padding,
    ...theme.shadows.sm,
  },
  
  cardElevated: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.components.card.borderRadius,
    padding: theme.components.card.padding,
    ...theme.shadows.md,
  },
  
  cardHighlight: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.components.card.borderRadius,
    padding: theme.components.card.padding,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  
  // Input Styles
  input: {
    height: theme.components.input.height,
    borderRadius: theme.components.input.borderRadius,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textPrimary,
  },
  
  inputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  
  // Divider Styles
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  
  dividerThick: {
    height: 2,
    backgroundColor: theme.colors.borderDark,
    marginVertical: theme.spacing.lg,
  },
  
  // Loading Styles
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.components.modal.borderRadius,
    padding: theme.components.modal.padding,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    ...theme.shadows.xl,
  },
  
  // Status Styles
  statusSuccess: {
    backgroundColor: theme.colors.success,
  },
  
  statusWarning: {
    backgroundColor: theme.colors.warning,
  },
  
  statusError: {
    backgroundColor: theme.colors.error,
  },
  
  statusInfo: {
    backgroundColor: theme.colors.info,
  },
  
  // Utility Styles
  flex1: {
    flex: 1,
  },
  
  flex2: {
    flex: 2,
  },
  
  flex3: {
    flex: 3,
  },
  
  hidden: {
    display: 'none',
  },
  
  visible: {
    display: 'flex',
  },
  
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  zIndex1: {
    zIndex: 1,
  },
  
  zIndex2: {
    zIndex: 2,
  },
  
  zIndex3: {
    zIndex: 3,
  },
  
  // Border Styles
  border: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
  },
  
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  
  // Rounded Styles
  rounded: {
    borderRadius: theme.radius.md,
  },
  
  roundedSmall: {
    borderRadius: theme.radius.sm,
  },
  
  roundedLarge: {
    borderRadius: theme.radius.lg,
  },
  
  roundedFull: {
    borderRadius: theme.radius.round,
  },
});