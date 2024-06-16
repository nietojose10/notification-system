import { useDispatch, useSelector } from 'react-redux';
import { nsApi } from '../api';
import Swal from 'sweetalert2';
import { onClearSaving, onSavingNotification } from '../store';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

export const useBroadcastMessageStore = () => {
    const dispatch = useDispatch();
    const { isSaving } = useSelector( state => state.broadcastMessage );

    const startSendingMessage = async({ category, message }) => {

        try {
            dispatch( onSavingNotification() );
            const { data } = await nsApi.post('/broadcast/sendMessage', { category, message } );            
            await Toast.fire({ icon: 'success', title: 'Message successfully sent.' });
            dispatch( onClearSaving() );

        } catch (error) {
            console.log(error);
            await Toast.fire({ icon: 'error', title: 'Message could not be sent.' });
        }

    }

    return {
        //*Properties
            isSaving,
        //*Methods
            startSendingMessage
    }
}
