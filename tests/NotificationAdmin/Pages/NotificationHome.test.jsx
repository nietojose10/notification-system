import { render, screen } from '@testing-library/react';
import { NotificationHome } from '../../../src/NotificationAdmin';

describe('Pruebas en Notification Home Page', () => { 

    test('Debe de mostrar el menu principal de la app', () => { 

        render( <NotificationHome /> );

        const broadCastMessageCard = screen.getByLabelText('Broadcast Message');
        console.log(broadCastMessageCard);

    })

})