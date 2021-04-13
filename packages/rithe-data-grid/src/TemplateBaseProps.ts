import { MouseEvent } from "react";
import { FilterExpression } from "./types/FilterExpression";
import { FilterPredicate } from "./types/FilterPredicate";
import { FreezePosition } from "./types/FreezePosition";
import { TableColumn } from "./types/TableColumn";
import { TableRow } from "./types/TableRow";

export interface TemplateBaseProps {
    root: undefined,
    // root
    toolbar: undefined,
    table: undefined,
    pagination: undefined,
    // toolbar
    toolbarContent: undefined,
    toolbarItem: undefined,
    toolbarAction: undefined,
    // table
    header: undefined,
    body: undefined,
    footer: undefined,
    row: RowProps,
    cell: CellProps,
    data: DataProps,
    rowAction: RowActionProps,
    columnAction: ColumnActionProps,
    columnFilter: ColumnFilterProps,
    // pagination
    pageInfo: undefined,
    pageSelect: undefined,
    pageSizeSelect: undefined,
}

export interface RowProps {
    height: number,
    tableRow: TableRow,
}

export interface CellProps {
    width: number,
    colSpan: number,
    rowSpan: number,
    freezePosition?: FreezePosition,
    freezeOffset?: number,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
    resizable?: boolean,
    onClick?: (e: MouseEvent<HTMLTableCellElement>) => void,
}

export interface DataProps {
    type: 'formatter' | 'editor' | 'inlineEditor',
    value: any,
    setValue: (value: any) => void,
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export interface RowActionProps {
    actionName: string,
    tableRow: TableRow,
}

export interface ColumnActionProps {
    actionName: string,
    tableColumn: TableColumn,
    onClose: () => void,
}

export interface ColumnFilterProps {
    display: boolean,
    filter?: FilterExpression | FilterPredicate,
    setFilter: (filter?: FilterExpression | FilterPredicate) => void,
    tableColumn: TableColumn,
    onClose: () => void,
}