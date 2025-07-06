// Global declarations
declare const __DEV__: boolean;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import transactionSlice from './slices/transactionSlice';
import investmentSlice from './slices/investmentSlice';
import budgetSlice from './slices/budgetSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authSlice,
  transactions: transactionSlice,
  investments: investmentSlice,
  budget: budgetSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'meta.arg.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['some.path.to.ignore'],
      },
      // Disable thunk middleware warnings in development
      immutableCheck: {
        warnAfter: 128,
      },
    }),
  devTools: __DEV__,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the root reducer type for potential use in testing or other contexts
export type RootReducer = typeof rootReducer;

export default store;
