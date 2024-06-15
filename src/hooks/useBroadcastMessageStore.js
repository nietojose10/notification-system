import { nsApi } from "../api";

export const useBroadcastMessageStore = () => {
  
    const startSendingMessage = async({ category, message }) => {

        try {
            // console.log(messageData);
            const { data } = await nsApi.post('/broadcast/sendMessage', { category, message } );
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }

    }

    return {
        //*Properties

        //*Methods
        startSendingMessage
    }
}
