import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import userReducer from './slice/userSlice.js';

const persistConfig = {
    key: 'user', // Key for the persisted state
    storage, // Storage method
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        contest: persistedReducer,

    },
});

export const persistor = persistStore(store);
