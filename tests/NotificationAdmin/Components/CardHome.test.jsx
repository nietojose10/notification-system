import { render, screen } from '@testing-library/react';
import { CardHome } from '../../../src/NotificationAdmin';
import { useNavigate } from 'react-router-dom';
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en CardHome', () => { 

    test('Debe de cargar el componente correctamente', () => { 
        
        

        render(
            <CardHome
                title="Broadcast Message" 
                icon={faTowerBroadcast} 
                navigateRoute="/broadcastMessage"
                description="Enter this option to send a message to every user who is subscribed to each available channel"
            />
        );

        screen.debug();
        const cardHome = screen.getByTestId('id-card-notification-home');
        const cardTitle = screen.getByText('Broadcast Message');
        // console.log(cardTitle)
        // console.log(cardHome);
        expect( cardHome.classList.toString() ).toContain('card-notification-home card');
        expect( cardTitle ).toBeTruthy();

    });


})