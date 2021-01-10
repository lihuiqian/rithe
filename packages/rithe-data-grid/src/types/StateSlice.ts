import Column from "./Column";
import DataType from "./DataType";
import DragHandler from "./DragHandler";
import Row from "./Row";
import RowId from "./RowId";

interface StateSlice {
    // DataTypeProvider
    dataTypes: DataType<any>[],
    // Data
    columns: Column[],
    rows: Row[],
    displayColumns: Column[],
    displayRows: Row[],
    getRowId: (row: Row) => RowId,
    getCellValue: (column: Column, row: Row) => any,
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
    // TableLayout
    addDragListener: (target: EventTarget, eventHandler: DragHandler) => void,
    removeDragListener: (target: EventTarget) => void,
}

export default StateSlice