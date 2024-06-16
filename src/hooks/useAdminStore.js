import { nsApi } from '../api';
import Swal from 'sweetalert2';

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

export const useAdminStore = () => {
    
    const startSavingUser = async({ name, email, phoneNumber, subscribed, channels }) => {
        
        try {
            
            const { data } = await nsApi.post('/auth/new',{ name, email, phoneNumber, subscribed, channels });
            
            await Toast.fire({ icon: 'success', title: 'Message successfully sent.' });

        } catch (error) {
            console.log(error);
            await Toast.fire({ icon: 'error', title: 'Message could not be sent.' });

        }

    }

    return {
    //*Properties

    //*Methods
        startSavingUser
    }
}
