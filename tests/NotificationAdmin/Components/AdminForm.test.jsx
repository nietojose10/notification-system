import { fireEvent, render, screen } from '@testing-library/react';
import { AdminForm } from '../../../src/NotificationAdmin';
import { useAdminStore } from '../../../src/hooks/useAdminStore';
import { Categories, Channels } from '../../fixtures/authStates';

jest.mock('../../../src/hooks/useAdminStore');

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
 
describe('Pruebas en AdminForm component', () => { 

    const mockStartSavingUser = jest.fn();
    const mockStartLoadingCategories = jest.fn();
    const mockStartLoadingChannels = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => { 

        useAdminStore.mockReturnValue({
            startLoadingCategories: mockStartLoadingCategories,
            categories: Categories,
            startLoadingChannels: mockStartLoadingChannels,
            channels: Channels
        });

        render( <AdminForm /> );

        const btnSave = screen.getByLabelText('btn-save');
        expect( btnSave.classList ).toContain('btn-custom-primary');
        expect( mockStartLoadingCategories ).toHaveBeenCalled();
        expect( mockStartLoadingChannels ).toHaveBeenCalled();
        
    });

    test('Debe llamar a la funcion startSavingUser cuando se le de click al boton de Save', () => { 

        const usernameValue = 'Jose Nieto';
        const emailValue = 'josenieto@prueba.com';
        const phoneNumberValue = '33224456';
        const messageTypeValue = 'Sports';
        const notificationTypeValue = 'SMS';

        useAdminStore.mockReturnValue({
            startSavingUser: mockStartSavingUser,
            startLoadingCategories: mockStartLoadingCategories,
            categories: Categories,
            startLoadingChannels: mockStartLoadingChannels,
            channels: Channels
        });

        render( <AdminForm /> );

        const usernameField = screen.getByTestId('username');
        fireEvent.change( usernameField, { target: { name: 'username', value: usernameValue } } );
        const emailField = screen.getByTestId('email');
        fireEvent.change( emailField, { target: { name: 'email', value: emailValue } } );
        const phoneNumberField = screen.getByTestId('phoneNumber');
        fireEvent.change( phoneNumberField, { target: { name: 'phoneNumber', value: phoneNumberValue } } );
        const messageTypeField = screen.getByLabelText('categories');
        fireEvent.change( messageTypeField, { target: { name: 'categories', value: messageTypeValue } } );
        const notificationTypeField = screen.getByLabelText('channels');
        fireEvent.change( notificationTypeField, { target: { name: 'channels', value: notificationTypeValue } } );


        // console.log(notificationTypeField);
        // screen.debug();

        const btnSave = screen.getByLabelText('btn-save');
        fireEvent.click( btnSave );

        expect( mockStartSavingUser ).toHaveBeenCalled();
        
    });

})