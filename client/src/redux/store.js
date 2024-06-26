import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice.js";
import tripReducer from "./trip/tripSlice.js";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({ user: userReducer, trip: tripReducer });

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// persist done
// might go for google oauth or the next section