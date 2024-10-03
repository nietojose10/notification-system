import { fireEvent, render, screen } from '@testing-library/react';
import { BroadcastForm } from '../../../src/NotificationAdmin';
import { Categories } from '../../fixtures/authStates';
import { useBroadcastMessageStore } from '../../../src/hooks/useBroadcastMessageStore';

jest.mock('../../../src/hooks/useBroadcastMessageStore');
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () =>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}))

describe('Pruebas en BroadcastForm', () => {

    const mockStartLoadingCategories = jest.fn();
    const mockStartSendingMessage = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de cargar correctamente el componente', () => { 

        useBroadcastMessageStore.mockReturnValue({
            startLoadingCategories: mockStartLoadingCategories,
            categories: Categories
        });

        render( <BroadcastForm /> );

        // screen.debug();
        const btnSend = screen.getByText('Send');
        expect( btnSend.classList.toString() ).toContain('btn-custom-primary');
        expect( mockStartLoadingCategories).toHaveBeenCalled();

    });

    test('Debe de llamar la funcion startSendingMessage correctamente', () => { 

        const categoryValue = 'sports';
        const messageValue = 'Enviando este mensaje de prueba a todos los suscriptores de este canal';

        useBroadcastMessageStore.mockReturnValue({
            startSendingMessage: mockStartSendingMessage,
            startLoadingCategories: mockStartLoadingCategories,
            categories: Categories
        });

        render( <BroadcastForm /> );

        const categoryField = screen.getByTestId('category');
        fireEvent.change( categoryField, { target: { name: 'category', value: categoryValue } } );

        const messageField = screen.getByTestId('message');
        fireEvent.change( messageField, { target: { name: 'message', value: messageValue } } );

        const btnSend = screen.getByText('Send');
        fireEvent.click( btnSend );

        expect( mockStartSendingMessage ).toHaveBeenCalled();


    })

});