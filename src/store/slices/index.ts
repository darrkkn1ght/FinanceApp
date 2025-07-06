// src/store/slices/index.ts
export { default as authSlice } from './authSlice';
export { default as transactionSlice } from './transactionSlice';
export { default as investmentSlice } from './investmentSlice';
export { default as budgetSlice } from './budgetSlice';

// Export action creators
export * from './authSlice';
export * from './transactionSlice';
export * from './investmentSlice';
export * from './budgetSlice';