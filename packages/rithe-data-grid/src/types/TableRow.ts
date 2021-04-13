import { Row } from "./Row";
import { RowId } from "./RowId";

export interface TableRow {
    type: symbol,
    row?: Row,
    rowId: RowId,
    height: number,
    actions?: string[],
    selected?: boolean,
    level?: number,
    expanded?: boolean,
    childRows?: TableRow[],
}