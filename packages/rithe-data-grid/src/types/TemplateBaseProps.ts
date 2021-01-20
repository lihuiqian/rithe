import { TableColumn } from "./TableColumn";
import { TableRow } from "./TableRow";

export interface TemplateBaseProps {
    root: undefined,
    toolbar: undefined,
    table: undefined,
    tableHeader: undefined,
    tableBody: undefined,
    tableFooter: undefined,
    tableRow: TableRowProps,
    tableCell: TableCellProps,
    pagination: undefined,
}

export interface TableRowProps {
    tableRow: TableRow,
}

export interface TableCellProps {
    tableColumn: TableColumn,
    tableRow: TableRow,
    colSpan?: number,
    rowSpan?: number,
}