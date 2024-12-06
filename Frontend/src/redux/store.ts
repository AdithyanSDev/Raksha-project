import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/auth/adminSlice';
import chatReducer from '../features/chat/chatSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { volunteerRegisterReducer } from './reducers/volunteerReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  volunteerRegister: volunteerRegisterReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
