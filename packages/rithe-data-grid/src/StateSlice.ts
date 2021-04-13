import { Column } from "./types/Column";
import { Direction } from "./types/Direction";
import { FilterExpression } from "./types/FilterExpression";
import { FilterPredicate } from "./types/FilterPredicate";
import { Row } from "./types/Row";
import { RowId } from "./types/RowId";
import { TableColumn } from "./types/TableColumn";
import { TableRow } from "./types/TableRow";

export interface StateSlice {
    columns: Column[],
    rows: Row[],
    getRowId: (row: Row) => RowId,
    tableColumns: TableColumn[],
    tableHeaderRows: TableRow[],
    tableBodyRows: TableRow[],
    tableFooterRows: TableRow[],
    filters: Record<string, FilterExpression | FilterPredicate>,
    sortings: { field: string, direction: Direction }[],
    totalCount: number,
    inlineEditing: boolean,
}