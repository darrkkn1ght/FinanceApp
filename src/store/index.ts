export { store } from './store';
export type { RootState, AppDispatch } from './store';

// Re-export all slices
export { default as authSlice } from './slices/authSlice';
export { default as transactionSlice } from './slices/transactionSlice';
export { default as investmentSlice } from './slices/investmentSlice';
export { default as budgetSlice } from './slices/budgetSlice';

// Re-export auth actions and thunks
export {
  login,
  register,
  logout,
  refreshToken,
  updateProfile,
  changePassword,
  resetPassword,
  verifyEmail,
  clearAuthError,
  setAuthLoading,
  clearAuthData,
  setTokens,
  updateUserData,
} from './slices/authSlice';

// Re-export transaction actions and thunks
export {
  fetchTransactions,
  fetchTransactionById,
  fetchTransactionCategories,
  fetchTransactionSummary,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDeleteTransactions,
  searchTransactions,
  clearTransactionError,
  setTransactionLoading,
  clearTransactionData,
  setTransactionFilters,
  clearTransactionFilters,
  updateTransactionFilter,
  addTransactionToList,
  updateTransactionInList,
  removeTransactionFromList,
  setTransactionPage,
  resetTransactionPagination,
} from './slices/transactionSlice';

// Re-export investment actions and thunks
export {
  fetchInvestments,
  fetchPortfolio,
  fetchPerformance,
  addInvestment,
  updateInvestment,
  deleteInvestment,
  clearInvestmentError,
  updateInvestmentPrice,
  refreshInvestmentData,
} from './slices/investmentSlice';

// Re-export budget actions and thunks
export {
  fetchBudgets,
  fetchCurrentBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  addCategory,
  updateCategory,
  deleteCategory,
  clearBudgetError,
  setCurrentBudget,
  updateCategorySpending,
  recalculateBudgetTotals,
} from './slices/budgetSlice';

// Typed hooks for React components
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;