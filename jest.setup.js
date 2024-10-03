// En caso de necesitar la implementación del FetchAPI
// import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { TextEncoder } from 'node:util';
// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
require('dotenv').config({
    path: '.env.test'
});

// Realizar el mock completo de las variables de entorno
jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}));

global.TextEncoder = TextEncoder;