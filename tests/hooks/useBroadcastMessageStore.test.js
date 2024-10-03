import { act, renderHook } from '@testing-library/react';
import { useBroadcastMessageStore } from '../../src/hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { broadcastMessageSlice } from '../../src/store';
import { nsApi } from '../../src/api';
import { sendMessageState } from '../fixtures/notificationStates';

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            broadcastMessage: broadcastMessageSlice.reducer,
        },
        preloadedState: {
            broadcastMessage: { ...initialState }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

describe('Pruebas en el useBroadcastMessageStore', () => { 

    test('Debe de regresar los valores por defecto', () => { 

        const mockStore = getMockStore({
                isSaving: false,
                logHistory: [],
                categories: []
            });

        const { result } = renderHook( ()=> useBroadcastMessageStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        expect( result.current ).toEqual({
            isSaving: false,
            categories: [],
            logHistory: [],
            startSendingMessage: expect.any( Function ),
            startLoadingCategories: expect.any( Function )
          });

    });

    test('Debe de funcionar startSendingMessage correctamente', async() => { 
        
        const mockStore = getMockStore({
            isSaving: false,
            logHistory: [],
            categories: []
        });

        const { result } = renderHook( ()=> useBroadcastMessageStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        const spy = jest.spyOn( nsApi, 'post').mockReturnValue({
            data: {
                ok: true,
                messagesSent: [
                    {message: 'AC Milan won the derby!', typeMessage: 'sports', channel: 'sms', user: '666d2cf5860e48279275ad41', creationDate: new Date('2024-10-13 20:00:00'), _id: 1},
                    {message: 'AC Milan won the derby!', typeMessage: 'sports', channel: 'push notification', user: '666d20693819c898f4f2a441', creationDate: new Date('2024-10-13 20:00:00'), _id: 2},
                ]
            }
        });

        await act( async() => {
            await result.current.startSendingMessage(sendMessageState);
        });

        
        const { logHistory } = result.current;
        expect( logHistory ).toEqual(
            [
                {
                  message: 'AC Milan won the derby!',
                  typeMessage: 'sports',
                  channel: 'sms',
                  user: '666d2cf5860e48279275ad41',
                  creationDate: new Date('2024-10-14T02:00:00.000Z'),
                  _id: 1
                },
                {
                  message: 'AC Milan won the derby!',
                  typeMessage: 'sports',
                  channel: 'push notification',
                  user: '666d20693819c898f4f2a441',
                  creationDate: new Date('2024-10-14T02:00:00.000Z'),
                  _id: 2
                }
              ]
        );

    });


    test('Debe de funcionar startLoadingCategories correctamente ', async() => { 

        const mockStore = getMockStore({
            isSaving: false,
            logHistory: [],
            categories: []
        });

        const { result } = renderHook( ()=> useBroadcastMessageStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act( async() => {
            await result.current.startLoadingCategories();
        });

        console.log(result.current.categories.length);
        expect( result.current.categories.length ).toBeGreaterThan(0)

    });

});