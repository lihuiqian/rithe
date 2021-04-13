import { Action, ColumnFreeze, ColumnOrdering, ColumnResizing, ColumnVisibility, Data, DataGrid, DataTypePreset, Detail, Editing, Expanding, Grouping, KeysTypeProvider, KeyTypeProvider, Numbering, PaginationLayout, Paging, Searching, Selection, Sorting, Summary, TableBodyLayout, TableFooterLayout, TableHeaderLayout, TableLayout, ToolbarLayout, Tree } from '@rithe/data-grid';
import { TableRow } from '@rithe/data-grid/dist/types/TableRow';
import { Arrays } from '@rithe/utils';
import React, { useCallback, useState } from 'react';

const options = [1, 2, 3, 4]
const formatter = {
  format: (value: number) => String.fromCharCode('A'.charCodeAt(0) + value - 1) + '-' + value,
  group: (value: number) => Math.ceil(value / 2) + '',
}
const columns = [{
  field: 'index', dataTypeName: 'string', title: 'INDEX',
}, {
  field: 'a', dataTypeName: 'string', title: 'A', categories: [{ value: 'grouping', key: '1' }],
}, {
  field: 'b', dataTypeName: 'number', title: 'B', categories: [{ value: 'grouping', key: '1' }],
}, {
  field: 'c', dataTypeName: 'bigint', title: 'C', categories: [{ value: 'grouping', key: '2' }],
}, {
  field: 'd', dataTypeName: 'date', title: 'D',
}, {
  field: 'e', dataTypeName: 'time', title: 'E',
}, {
  field: 'f', dataTypeName: 'datetime', title: 'F', width: 240,
}, {
  field: 'g', dataTypeName: 'key', title: 'G',
}, {
  field: 'h', dataTypeName: 'keys', title: 'H', width: 320,
},]

function App() {
  const [rows, setRows] = useState(() => {
    return Arrays.range(0, 10).map(i => ({ index: i, a: `string-${i}`, b: i % 5, c: BigInt(i % 3), d: new Date(), e: new Date(), f: new Date(), g: options[i % 4], h: [options[i % 4], options[(i + 1) % 4]] }))
  })

  const [addingRows, setAddingRows] = useState<TableRow[]>([])
  const [editingRows, setEditingRows] = useState<TableRow[]>([])

  const onEditingCellCommit = useCallback((column, editingRow) => {
    setRows(rows => rows.map(row => row.index === editingRow.index ? editingRow as any : row))
    return true
  }, [])

  return <>
    {/* <Button onClick={() => setFixed(f => !f)}>Fix</Button> */}
    {/* <DragDropProvider>
      <Draggable payload={"ABC"}>
        <div>Draggable</div>
      </Draggable>
      <Droppable
        onOver={(event) => setValue(Records.delete(event as any, 'target'))}
        onDrop={(_, payload) => setValue(payload)}>
        <div style={{ width: 100, height: 100, border: '1px solid red', position: 'relative', }}>
          {JSON.stringify(value)}
        </div>
      </Droppable>
    </DragDropProvider> */}
    <DataGrid>
      <ToolbarLayout />
      <TableLayout>
        <TableHeaderLayout sticky />
        <TableBodyLayout />
        <TableFooterLayout sticky />
      </TableLayout>
      <PaginationLayout />
      <DataTypePreset />
      <KeyTypeProvider name="key" formatter={formatter} options={options} align="end" />
      <KeysTypeProvider name="keys" formatter={formatter} options={options} />
      <Data
        columns={columns}
        rows={rows} />
      <ColumnFreeze />
      <ColumnOrdering defaultOrder={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']} />
      <ColumnResizing defaultSize={{ a: 80, b: 80, c: 80, d: 80, e: 80, f: 80, g: 80, h: 80 }} maxWidth={400} minWidth={20} />
      <ColumnVisibility columnSettings={{ 'index': { disableUserControl: true } }} />
      <Detail />
      <Tree getParentRowId={rowId => rowId === 0 || rowId === 1 ? null : rowId as number % 2} />
      <Grouping defaultGroupingFields={['a']} />
      <Editing showAddAction showEditAction showDeleteAction
        enableInlineEdit
        addingRows={addingRows}
        editingRows={editingRows}
        onAddingRowsChange={setAddingRows}
        onEditingRowsChange={setEditingRows}
        onEditingCellCommit={onEditingCellCommit} />
      <Numbering />
      <Selection showSelectAll highlightSelectedRow selectByRowClick />
      <Expanding showExpandAll expandByRowClick />
      {/* <Filtering /> */}
      <Paging />
      <Searching ignoreCase columnSettings={{ g: { valueToString: formatter.format } }} />
      <Sorting defaultSortings={[{ field: 'a', direction: 'desc' }, { field: 'b', direction: 'desc' }]} />
      <Summary columnSettings={{ a: { summaryFunction: 'count' }, b: { summaryFunction: 'count' } }} />
      <Action width={150} />
    </DataGrid>
  </>
}

export default App;