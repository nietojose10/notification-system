import { configureStore } from '@reduxjs/toolkit';
import { broadcastMessageSlice } from './';

export const store = configureStore({
    reducer: {
        broadcastMessage: broadcastMessageSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});