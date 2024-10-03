const { renderHook, act } = require("@testing-library/react")
const { useLogHistoryStore } = require("../../src/hooks");
const { initialState } = require("../fixtures/notificationStates");
const { configureStore } = require("@reduxjs/toolkit");
const { broadcastMessageSlice } = require("../../src/store");
const { Provider } = require("react-redux");

const getMockStore = ( intialState ) => {
    return configureStore({
        reducer: {
            broadcastMessage: broadcastMessageSlice.reducer,
        },
        preloadedState: {
            broadcastMessage: { ...initialState }
        }
    })
};

describe('Pruebas en useLogHistoryStore', () => { 

    test('Debe de regresar los valores por defecto', () => { 

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook( () => useLogHistoryStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect( result.current ).toEqual({
            logHistory: [],
            startLoadingLogHistory: expect.any(Function)
          });

    });

    test('Debe de funcionar startLoadingLogHistory correctamente', async() => { 

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook( () => useLogHistoryStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async() => {
            await result.current.startLoadingLogHistory();
        });

        expect( result.current.logHistory.length ).toBeGreaterThan(0);

    });

})