import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useLogHistoryStore } from '../../hooks';
import { format } from 'date-fns';

export const MessagesReport = () => {

    const { startLoadingLogHistory, logHistory } = useLogHistoryStore();
    let logHistoryData = [];
    const [rowData, setRowData] = useState(logHistoryData);
    

    const [columnDefs] = useState([
        { field: 'id', hide: true },
        { field: "Message Type", flex: 1, minWidth: 100, filter: true },
        { field: "Notification Type", flex: 1, minWidth: 200, filter: true, editable: true, cellEditor: "agSelectCellEditor",},
        { field: "Dispatch Date", flex: 1, minWidth: 200, filter: true },
        { field: "User Name", flex: 1, minWidth: 200, filter: true },
        { field: "Email", flex: 1, minWidth: 250, filter: true },
        { field: "Phone Number", flex: 1, minWidth: 100, filter: true },
      ]);

      useEffect(() => {
        startLoadingLogHistory();
      }, []);

      useEffect(() => {

        logHistoryData = logHistory.map( data => {
            return { id: data._id, 'Message Type': data.typeMessage, 'Notification Type': data.channel, 
                    'Dispatch Date': format( data.creationDate, 'dd/MM/yyyy HH:mm:ss' ), 'User Name': data.user.name, Email: data.user.email,
                    'Phone Number': data.user.phoneNumber }
        });

        setRowData( logHistoryData );
        
      }, [logHistory])
      
      
  return (
    <div data-testid="ctn-aggrid-react" className="ctn-log-history-table ag-theme-alpine" style={{ height: 580 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
            style={{ width: '100%', height: '100%' }}
          />
    </div>
  )
}
