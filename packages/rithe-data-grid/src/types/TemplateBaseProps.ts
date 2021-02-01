import { KeyboardEvent } from "react";
import { Align } from "./Align";
import { Freeze } from "./Freeze";
import { TableColumn } from "./TableColumn";
import { TableRow } from "./TableRow";

export interface TemplateBaseProps {
    root: undefined,
    toolbar: undefined,
    toolbarContent: undefined,
    table: undefined,

    tableHeader: undefined,
    tableBody: undefined,
    tableFooter: undefined,
    row: RowProps,
    cell: CellProps,
    content: ContentProps,
    title: TitleProps,
    menu: MenuProps,
    menuItems: MenuItemsProps,
    formatter: FormatterProps,
    editor: EditorProps,

    pagination: undefined,
}

export interface RowProps {
    height: number,
    tableRow: TableRow,
}

export interface CellProps {
    width: number,
    colSpan: number,
    rowSpan: number,
    freeze: Freeze,
    left: number,
    right: number,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
}

export interface ContentProps {
    align: Align,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
}

export interface TitleProps {
    title: string,
    tableColumn: TableColumn,
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
    tableRows: TableRow[],
}

export interface EditorProps {
    value: any,
    onValueChange: (newValue: any) => void,
    onFocus: (event: FocusEvent) => void,
    onBlur: (event: FocusEvent) => void,
    onKeyDown: (event: KeyboardEvent) => void,
    tableColumn: TableColumn,
    tableRows: TableRow[],
}