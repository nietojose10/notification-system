import { act, renderHook } from '@testing-library/react';
import { useAdminStore } from '../../src/hooks/useAdminStore';
import { authSlice, store } from '../../src/store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { initialState, testUser } from '../fixtures/authStates';
import { nsApi } from '../../src/api';

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en el useAdminStore', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({
            isSaving: false,
            categories: [],
            channels: [],
        });
        
        const { result } = renderHook( () => useAdminStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        expect(result.current).toEqual({
            isSaving: false,
            categories: [],
            channels: [],
            startSavingUser: expect.any(Function),
            startLoadingCategories: expect.any(Function),
            startLoadingChannels: expect.any(Function)
          });

    });

    test('Debe de funcionar startSavingUser correctamente', async() => { 

        const mockStore = getMockStore({...initialState});
        const { result } = renderHook( () => useAdminStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        const spy = jest.spyOn( nsApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '12343534',
                name: 'Jose Pablo'
            }
        });
        
        await act( async()=> {
            await result.current.startSavingUser( testUser );
        });
        
        expect( spy ).toHaveBeenCalledWith('/auth/new', testUser );

        spy.mockRestore();
    });

    test('Debe de funcionar startLoadingCategories correctamente', async() => { 

        const mockStore = getMockStore({...initialState});
        const { result } = renderHook( () => useAdminStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        await act( async()=> {
            await result.current.startLoadingCategories();
        });

        expect( result.current.categories.length ).toBeGreaterThan(0);
    });

    test('Debe de funcionar startLoadingChannels correctamente', async() => { 

        const mockStore = getMockStore({...initialState});
        const { result } = renderHook( () => useAdminStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider> 
        });

        await act( async()=> {
            await result.current.startLoadingChannels();
        });

        expect( result.current.channels.length ).toBeGreaterThan(0);
    });

});