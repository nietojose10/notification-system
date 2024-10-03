import { createSlice } from '@reduxjs/toolkit';
export const broadcastMessageSlice = createSlice({
    name: 'broadcastMessage',
    initialState: {
        isSaving: false,
        logHistory: [],
        categories: []
    },
    reducers: {
        onSavingNotification: ( state ) => {
            state.isSaving = true;
        },
        onLoadCategories: ( state, { payload }) => {
            state.categories = payload;
        },
        onAddMessage: ( state, { payload } ) => {
            state.logHistory.push( ...payload );
        },
        onLoadLogHistory: ( state, { payload }) => {
            payload.map( message => {
                const exists = state.logHistory.some( dbMessage => dbMessage._id === message._id );
                if( !exists ) state.logHistory.push( message );
            });
        },
        onClearSaving: ( state ) => {
            state.isSaving = false;
        },
    }
});
export const { onSavingNotification, onLoadCategories, onLoadLogHistory, onClearSaving, onAddMessage } = broadcastMessageSlice.actions;