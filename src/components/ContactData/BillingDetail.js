import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Faker from 'faker';


const BillingDetail = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
        {
          field: 'amount',
          headerName: 'Amount',
          type: 'number',
          width: 90,
        },
        { field: 'type', headerName: 'type', width: 130 }
      ];
      
     const getRows = () => {
          const rows = []
          var index = 1
          for (var i=1;i<10;i++){
              
              const transObj = Faker.helpers.createTransaction()
              transObj.id = index
              transObj.description = transObj.name
              transObj.date = transObj.date
              transObj.amount = transObj.amount
              transObj.type =  transObj.type
              rows.push(transObj)
              index++
          }    
          
          return rows;
          
      }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={getRows()} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}

export default BillingDetail;