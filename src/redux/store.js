import { configureStore } from '@reduxjs/toolkit';
import { userValidationSlice } from './auth/slice';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'authorisation',
  storage,
  whitelist: ['token'],
};

const persistAuthReducer = persistReducer(persistConfig, userValidationSlice.reducer);

export const store = configureStore({
  reducer: {
    authorisation: persistAuthReducer,
  },
    
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});
export const persistor = persistStore(store);
