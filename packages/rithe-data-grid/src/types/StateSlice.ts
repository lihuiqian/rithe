import { BindOptions } from "./BindOptions";
import { Column } from "./Column";
import { DataType } from "./DataType";
import { Direction } from "./Direction";
import { DragState } from "./DragState";
import { FilterExpression } from "./FilterExpression";
import { FilterPredicate } from "./FilterPredicate";
import { Row } from "./Row";
import { RowId } from "./RowId";
import { TableColumn } from "./TableColumn";
import { TableRow } from "./TableRow";
import { Toggle } from "./Toggle";

export interface StateSlice {
    // DataTypeProvider
    dataTypes: DataType[],
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
    // Filtering
    filters: { field: string, filter: FilterExpression | FilterPredicate }[],
    // Sorting
    sortings: { field: string, direction: Direction }[],
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