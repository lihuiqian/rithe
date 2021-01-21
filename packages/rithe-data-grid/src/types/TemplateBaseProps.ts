import { KeyboardEvent } from "react";
import { TableColumn } from "./TableColumn";
import { TableRow } from "./TableRow";

export interface TemplateBaseProps {
    root: undefined,
    toolbar: undefined,
    table: undefined,
    tableHeader: undefined,
    tableBody: undefined,
    tableFooter: undefined,
    row: RowProps,
    cell: CellProps,
    cellContent: CellContentProps,
    pagination: undefined,
    title: TitleProps,
    menu: MenuProps,
    menuItems: MenuItemsProps,
    formatter: FormatterProps,
    editor: EditorProps,
}

export interface RowProps {
    tableRow: TableRow,
}

export interface CellProps {
    tableColumn: TableColumn,
    tableRow: TableRow,
    colSpan?: number,
    rowSpan?: number,
}

export interface CellContentProps {
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export interface TitleProps {
    title: string,
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export interface MenuProps {
    tableColumn: TableColumn,
}

export interface MenuItemsProps {
    tableColumn: TableColumn,
}

export interface FormatterProps {
    value: any,
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export interface EditorProps {
    readonly: boolean,
    disabled: boolean,
    value: any,
    onValueChange: (newValue: any) => void,
    onFocus: (event: FocusEvent) => void,
    onBlur: (event: FocusEvent) => void,
    onKeyDown: (event: KeyboardEvent) => void,
    tableColumn: TableColumn,
    tableRow: TableRow,
}