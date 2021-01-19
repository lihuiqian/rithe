import { ReactNode } from "react";
import { TableColumn } from "./TableColumn";
import { TableRow } from "./TableRow";

export interface TemplateBaseProps {
    root: RootParam,
    toolbar: ToolbarParam,
    table: TableParam,
    tableHeader: TableHeaderParam,
    tableBody: TableBodyParam,
    tableFooter: TableFooterParam,
    tableRow: TableRowParam,
    tableCell: TableCellParam,
    pagination: PaginationParam,
}

export interface RootParam {
    children?: ReactNode | ReactNode[],
}

export interface ToolbarParam {
    children?: ReactNode | ReactNode[],
}

export interface TableParam {
    children?: ReactNode | ReactNode[],
}

export interface TableHeaderParam {
    children?: ReactNode | ReactNode[],
}

export interface TableBodyParam {
    children?: ReactNode | ReactNode[],
}

export interface TableFooterParam {
    children?: ReactNode | ReactNode[],
}

export interface TableRowParam {
    tableRow: TableRow,
    children?: ReactNode | ReactNode[],
}

export interface TableCellParam {
    tableColumn: TableColumn,
    tableRow: TableRow,
    colSpan?: number,
    rowSpan?: number,
}

export interface PaginationParam {
    children?: ReactNode | ReactNode[],
}