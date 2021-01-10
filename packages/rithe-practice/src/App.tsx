import { ColumnOrdering, ColumnResizing, Data, DataGrid, TableHeadLayout, TableLayout } from '@rithe/data-grid';
import { Pipe } from '@rithe/plugin';
import React, { useCallback, useMemo } from 'react';
import { Debugger } from './Debugger';

function App() {

  const columns = useMemo(() => [{ field: 'string', dataTypeName: 'string', title: 'String', categories: ['CATEGORY A', 'CATEGORY B'] },
  { field: 'number', dataTypeName: 'number', title: 'Number', categories: ['CATEGORY A'] }], [])
  const rows = useMemo(() => [{ string: 'A', number: 1234.56 }, { string: 'B', number: 2345.67 }], [])

  const computed = useCallback((columns: any[]) => {
    return columns ? [...columns, { field: 'boolean', dataTypeName: 'boolean', title: 'Boolean' }] : columns
  }, [])

  return <DataGrid>
    <Data columns={columns} rows={rows} />
    <Pipe name="displayColumns" computed={computed} />
    <Debugger />
    <ColumnResizing defaultColumnWidths={[{ field: 'string', width: 150 }]} />
    <ColumnOrdering defaultColumnOrder={['number', 'string', 'boolean']} />
    <TableLayout>
      <TableHeadLayout />
    </TableLayout>
  </DataGrid>
}

export default App;
