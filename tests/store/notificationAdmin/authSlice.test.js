import { authSlice, onClearSavingUser, onLoadCategoriesUser, onLoadChannelsUser, onSavingUser } from "../../../src/store";
import { Categories, Channels, initialState } from "../../fixtures/authStates";

describe('Pruebas en authSlice', () => { 

    test('Debe de regresar el estado por defecto', () => { 

        // console.log(authSlice.getInitialState());
        expect( authSlice.getInitialState() ).toEqual(initialState);

    });

    test('Debe de cambiar el estado de isSaving correctamente', () => { 

        let state = authSlice.getInitialState();
        state = authSlice.reducer( state, onSavingUser() );
        expect( state.isSaving ).toBeTruthy();

        state = authSlice.reducer( state, onClearSavingUser() );
        expect( state.isSaving ).toBeFalsy();

    });

    test('Debe de cargar las categorias correctamente', () => { 

        const state = authSlice.reducer( initialState, onLoadCategoriesUser(Categories));
        console.log(state);
        expect( state ).toEqual({
            ...state,
            categories: Categories
        });
    });

    test('Debe de cargar los canales correctamente', () => { 

        const state = authSlice.reducer( initialState, onLoadChannelsUser(Channels));
        console.log(state);
        expect( state ).toEqual({
            ...state,
            channels: Channels
        });
    });

});