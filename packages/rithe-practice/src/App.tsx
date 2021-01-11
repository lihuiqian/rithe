import { ColumnOrdering, ColumnResizing, Data, DataGrid, TableBodyLayout, TableHeadLayout, TableLayout } from '@rithe/data-grid';
import React, { useMemo } from 'react';
import { Arrays } from '../../rithe-data-grid/node_modules/@rithe/utils/dist';
import { Debugger } from './Debugger';

function App() {

  const columns = useMemo(() => [{ field: 'string', dataTypeName: 'string', title: 'String', categories: ['CATEGORY A', 'CATEGORY B'] },
  { field: 'number', dataTypeName: 'number', title: 'Number', categories: ['CATEGORY A'] },
  { field: 'boolean', dataTypeName: 'boolean', title: 'Boolean' }], [])
  const rows = useMemo(() => Arrays.range(0, 2000).map(index => ({ string: index + 'Str', number: index, boolean: index % 2 === 0 })), [])

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
