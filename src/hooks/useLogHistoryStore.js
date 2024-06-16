import { nsApi } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { onLoadLogHistory } from '../store';

export const useLogHistoryStore = () => {

    const dispatch = useDispatch();
    const { logHistory } = useSelector( state => state.broadcastMessage );

    const startLoadingLogHistory = async() => {
        
        try {
            
            const { data } = await nsApi.get('/LogHistory/getLogHistory');
            const { messages } = data;
            dispatch( onLoadLogHistory(messages) );

        } catch (error) {
            console.log(error);
        }

    }

  return {
    //*Properties
    logHistory,

    //*Methods
    startLoadingLogHistory
  }
}
