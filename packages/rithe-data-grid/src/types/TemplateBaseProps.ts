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
    tableRow: TableRowProps,
    tableCell: TableCellProps,
    pagination: undefined,
    formatter: FormatterProps,
    editor: EditorProps,
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