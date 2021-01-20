import { BindOptions } from "./BindOptions";
import { Column } from "./Column";
import { DataType } from "./DataType";
import { DragState } from "./DragState";
import { Row } from "./Row";
import { RowId } from "./RowId";
import { TableColumn } from "./TableColumn";
import { TableRow } from "./TableRow";
import { Toggle } from "./Toggle";

export interface StateSlice {
    // DataTypeProvider
    dataTypes: DataType<any>[],
    // Data
    columns: Column[],
    rows: Row[],
    displayColumns: Column[],
    displayRows: Row[],
    getRowId: (row: Row) => RowId,
    tableColumns: TableColumn[],
    tableHeaderRows: TableRow[],
    tableBodyRows: TableRow[],
    tableFooterRows: TableRow[],
    // ColumnResizing
    columnResizingEnabled: boolean,
    columnResizingExcludes: string[],
    columnResizingDraft: boolean,
    changeColumnWidth: (fields: string[], delta: number) => void,
    draftColumnWidth: (fields: string[], delta: number) => void,
    cancelColumnWidthDraft: (fields: string[]) => void,
    // ColumnOrdering
    columnDraggingEnabled: boolean,
    columnDraggingExcludes: string[],
    columnDraggingDraft: boolean,
    changeColumnOrder: (fields: string[], delta: number) => void,
    draftColumnOrder: (fields: string[], delta: number) => void,
    cancelColumnOrderDraft: (fields: string[]) => void,
    // Selection
    selectionEnabled: boolean,
    highlightSelectedRows: boolean,
    selectByRowClick: boolean,
    selectedRowIds: RowId[],
    allSelected: boolean,
    someSelected: boolean,
    toggleSelection: (rowIds: RowId[], toggle: Toggle) => void,
    toggleSelectAll: (toggle: Toggle) => void,
    // TableLayout
    addDragListener: (target: EventTarget, eventHandler: (state: DragState) => void, options?: Partial<BindOptions>) => void,
    removeDragListener: (target: EventTarget) => void,
}