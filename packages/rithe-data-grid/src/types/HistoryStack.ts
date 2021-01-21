import { Row } from "./Row";
import { RowId } from "./RowId";

export interface CreateHistory {
    type: 'create',
    rowId: RowId,
    row: Row,
}

export interface ModifyHistory {
    type: 'modify',
    rowId: RowId,
    from: Row,
    to: Row,
}

export interface DeleteHistory {
    type: 'delete',
    rowId: RowId,
    row: Row,
}

export interface HistoryStack {
    histories: (CreateHistory | ModifyHistory | DeleteHistory)[],
    currentIndex: number,
}