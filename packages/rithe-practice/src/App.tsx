import { Data, DataGrid, DataGridThemeProvider, TableHeadLayout, TableLayout } from '@rithe/data-grid';
import { Pipe } from '@rithe/plugin';
import React, { useCallback } from 'react';
import { Debugger } from './Debugger';

function App() {

  const columns = [{ field: 'string', dataTypeName: 'string', title: 'String' }, { field: 'number', dataTypeName: 'number', title: 'Number' }]
  const rows = [{ string: 'A', number: 1234.56 }, { string: 'B', number: 2345.67 }]

  const computed = useCallback((columns: any[]) => {
    return columns ? [...columns, { field: 'boolean', dataTypeName: 'boolean', title: 'Boolean' }] : columns
  }, [])

  return <DataGridThemeProvider>
    <DataGrid>
      <Data columns={columns} rows={rows} />
      <Pipe name="displayColumns" computed={computed} />
      <Debugger />
      <TableLayout>
        <TableHeadLayout />
      </TableLayout>
    </DataGrid>
  </DataGridThemeProvider>
}

export default App;
