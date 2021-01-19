import Row from "./Row";
import RowId from "./RowId";

export interface TableRow {
    key: string,
    type: symbol,
    row?: Row,
    rowId?: RowId,
    height?: number,
}