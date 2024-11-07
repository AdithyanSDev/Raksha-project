  import { configureStore, combineReducers } from '@reduxjs/toolkit';
  import { persistStore, persistReducer } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import authReducer from '../features/auth/authSlice'; // Auth slice
  import userReducer from '../features/user/userSlice'; // User slice
  import adminReducer from '../features/auth/adminSlice'; // Admin slice
  import chatReducer from "../features/chat/chatSlice";
  import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import { volunteerRegisterReducer } from './reducers/volunteerReducer';


  // Configuration for redux-persist
const persistConfig = { 
  key: 'root',
  storage,
};



// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  admin: adminReducer, 
  volunteerRegister: volunteerRegisterReducer,
  chat: chatReducer,  
});

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;