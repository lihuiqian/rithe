import { ColumnOrdering, ColumnResizing, Data, DataGrid, TableBodyLayout, TableHeadLayout, TableLayout } from '@rithe/data-grid';
import React, { useMemo } from 'react';
import { Debugger } from './Debugger';

function App() {

  const columns = useMemo(() => [{ field: 'string', dataTypeName: 'string', title: 'String', categories: ['CATEGORY A', 'CATEGORY B'] },
  { field: 'number', dataTypeName: 'number', title: 'Number', categories: ['CATEGORY A'] },
  { field: 'boolean', dataTypeName: 'boolean', title: 'Boolean' }], [])
  const rows = useMemo(() => [{ string: 'A', number: 1234.56 }, { string: 'B', number: 2345.67 }], [])

  return <DataGrid>
    <Data columns={columns} rows={rows} />
    <Debugger />
    <ColumnResizing defaultColumnWidths={[{ field: 'string', width: 150 }]} />
    <ColumnOrdering defaultColumnOrder={['number', 'string', 'boolean']} />
    <TableLayout>
      <TableHeadLayout />
      <TableBodyLayout />
    </TableLayout>
  </DataGrid>
}

export default App;
