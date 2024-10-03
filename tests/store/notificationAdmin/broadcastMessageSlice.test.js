import { broadcastMessageSlice, onAddMessage, onClearSaving, onLoadCategories, onLoadLogHistory, onSavingNotification } from '../../../src/store';
import { categoriesState, initialState, messageStates, notificationWithLog } from '../../fixtures/notificationStates';

describe('Pruebas en broadcastMessageSlice', () => { 

    test('debe de regresar el estado por defecto', () => { 
       
        const state = broadcastMessageSlice.getInitialState();
        expect( state ).toEqual( initialState );
        
    });

    test('debe de cargar las categorias correctamente', () => { 

        const state = broadcastMessageSlice.reducer( initialState, onLoadCategories( categoriesState ));
        expect( state ).toEqual({
            ...state,
            categories: categoriesState
        });

    });

    test('Debe de cargar los mensajes correctamente', () => { 

        const state = broadcastMessageSlice.reducer( initialState, onAddMessage( messageStates ) );
        expect( state ).toEqual({
            ...state,
            logHistory: messageStates
        });

    });

    test('Debe de cargar los mensajes al historial correctamente', () => { 
        
        const state = broadcastMessageSlice.reducer( notificationWithLog, onLoadLogHistory( messageStates ) );
        expect( state ).toEqual({
            ...state,
            logHistory: messageStates
        });

    });

    test('Debe de funcionar isSaving correctamente', () => { 
        
        const state = broadcastMessageSlice.reducer( initialState, onSavingNotification());
        expect( state.isSaving ).toBeTruthy();

        const newState = broadcastMessageSlice.reducer( initialState, onClearSaving());
        expect( newState.isSaving ).toBeFalsy();


    })

})