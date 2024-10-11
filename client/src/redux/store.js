import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)
import userReducer from './slice/userSlice.js';
import contestReducer from './slice/contestSlice.js';
import problemsReducer from './slice/problemsSlice.js';
import leetCodeReducer from './slice/leetCodeSlice.js';
import codeChefReducer from './slice/codeChefSlice.js';


// Persist configuration for user slice
const userPersistConfig = {
    key: 'user',
    storage,
};

// Persist configuration for contest slice
const contestPersistConfig = {
    key: 'contest',
    storage,
};

// Persist configuration for problems slice
const problemsPersistConfig = {
    key: 'problems',
    storage,
};

// Persist configuration for leetCode slice
const leetCodePersistConfig = {
    key: 'leetCode',
    storage,
};

const codeChefPersistConfig = {
    key: 'codeChef',
    storage,
};

// Create persisted reducers for each slice
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedContestReducer = persistReducer(contestPersistConfig, contestReducer);
const persistedProblemsReducer = persistReducer(problemsPersistConfig, problemsReducer);
const persistedLeetCodeReducer = persistReducer(leetCodePersistConfig, leetCodeReducer);
const persistedCodeChefReducer = persistReducer(codeChefPersistConfig, codeChefReducer);

// Configure store with the persisted reducers and middleware
export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        contest: persistedContestReducer,
        problems: persistedProblemsReducer,
        leetCode: persistedLeetCodeReducer,
        codeChef: persistedCodeChefReducer,

    },
    
});

export const persistor = persistStore(store);
