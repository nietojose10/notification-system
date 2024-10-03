import { useDispatch, useSelector } from 'react-redux';
import { nsApi } from '../api';
import Swal from 'sweetalert2';
import { onClearSaving, onLoadCategories, onSavingNotification, onAddMessage } from '../store';

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
    const { isSaving, categories, logHistory } = useSelector( state => state.broadcastMessage );

    const startSendingMessage = async({ category, message }) => {

        try {
            dispatch( onSavingNotification() );
            const { data } = await nsApi.post('/broadcast/sendMessage', { category, message } );      
            await Toast.fire({ icon: 'success', title: 'Message successfully sent.' });
            dispatch( onAddMessage(data.messagesSent) );
            dispatch( onClearSaving() );

        } catch (error) {
            console.log(error);
            await Toast.fire({ icon: 'error', title: 'Message could not be sent.' });
            dispatch( onClearSaving() );
        }

    }

    const startLoadingCategories = async() => {
        try {
            
            const { data } = await nsApi.get('/admin/getMessageTypes');
            dispatch( onLoadCategories( data.messageTypes ) ); 

        } catch (error) {
            console.log(error);
        }
    }

    return {
        //*Properties
            isSaving,
            categories,
            logHistory,
        //*Methods
            startSendingMessage,
            startLoadingCategories
    }
}
