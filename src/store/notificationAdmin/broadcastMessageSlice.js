import { createSlice } from '@reduxjs/toolkit';
export const broadcastMessageSlice = createSlice({
    name: 'broadcastMessage',
    initialState: {
        isSaving: false,
        logHistory: [],
        categories: [],
        channels: []
    },
    reducers: {
        onSavingNotification: ( state ) => {
            state.isSaving = true;
        },
        onLoadCategories: ( state, { payload }) => {
            state.categories = payload;
        },
        onLoadChannels: ( state, { payload } ) => {
            state.channels = payload;
        },
        onAddMessage: ( state, { payload } ) => {
            state.logHistory.push( payload );
        },
        onLoadLogHistory: ( state, { payload }) => {
            payload.map( message => {
                const exists = state.logHistory.some( dbMessage => dbMessage._id === message._id );
                if( !exists ) state.logHistory.push( message );
            });
        },
        onClearSaving: ( state ) => {
            state.isSaving = false;
        }
    }
});
export const { onSavingNotification, onLoadCategories, onLoadChannels, onLoadLogHistory, onClearSaving, onAddMessage } = broadcastMessageSlice.actions;