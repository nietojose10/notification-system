
import nsApi from '../../src/api/nsApi';

describe('Pruebas en el nsApi', () => { 

    test('debe de tener la configuracion por defecto', () => { 
        
        // console.log(nsApi);
        // console.log(process.env);

        expect( nsApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    });

});