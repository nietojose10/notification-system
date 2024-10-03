import { render, screen } from '@testing-library/react';
import { MessagesReport } from '../../../src/NotificationAdmin';
import { useLogHistoryStore } from '../../../src/hooks/useLogHistoryStore';
import { messageStates } from '../../fixtures/notificationStates';

jest.mock('../../../src/hooks/useLogHistoryStore');

describe('Pruebas en MessageReport component', () => { 

    const mockStartLoadginLogHistory = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('Debe de cargar el component correctamente', () => { 

        useLogHistoryStore.mockReturnValue({
            logHistory: messageStates,
            startLoadingLogHistory: mockStartLoadginLogHistory
        });

        render( <MessagesReport /> );

        screen.debug();

        const aggridContainer = screen.getByTestId('ctn-aggrid-react');
        // console.log(aggridContainer);
        expect( mockStartLoadginLogHistory ).toHaveBeenCalled();
        expect( aggridContainer.classList.toString() ).toContain('ctn-log-history-table');

    })

})