import { KeyboardEvent } from "react";
import { Align } from "./Align";
import { Column } from "./Column";
import { DataType } from "./DataType";
import { Freeze } from "./Freeze";
import { Row } from "./Row";
import { RowId } from "./RowId";

export interface TemplateBaseProps {
    root: undefined,
    toolbar: undefined,
    toolbarContent: undefined,
    table: undefined,

    tableHeader: undefined,
    headerRow: HeaderRowProps,
    headerCell: HeaderCellProps,
    headerContent: HeaderContentProps,
    title: TitleProps,
    menu: MenuProps,
    menuItems: MenuItemsProps,

    tableBody: undefined,
    bodyRow: BodyRowProps,
    bodyCell: BodyCellProps,
    bodyContent: BodyContentProps,
    formatter: FormatterProps,
    editor: EditorProps,

    tableFooter: undefined,
    footerRow: FooterRowProps,
    footerCell: FooterCellProps,
    footerContent: FooterContentProps,

    pagination: undefined,
}

export interface HeaderRowProps {
    index: number,
    top: number,
    height: number,

    rowType: symbol,
}

export interface BodyRowProps {
    height: number,

    rowType: symbol,

    row?: Row,
    rowId?: RowId,
}

export interface FooterRowProps {
    index: number,
    height: number,

    rowType: symbol,
}

export interface HeaderCellProps {
    title: string,
    width: number,
    colSpan: number,
    rowSpan: number,
    freeze?: Freeze,
    freezePosition?: number,

    colType: symbol,
    rowType: symbol,

    columns?: Column[],
    dataTypes?: DataType[],
}

export interface BodyCellProps {
    colSpan: number,
    rowSpan: number,

    colType: symbol,
    rowType: symbol,

    row?: Row,
    rowId?: RowId,

    column?: Column,
    dataType?: DataType,
}

export interface FooterCellProps {
    colSpan: number,
    rowSpan: number,

    colType: symbol,
    rowType: symbol,

    column?: Column,
    dataType?: DataType,
}

export interface HeaderContentProps {
    title: string,
    align: Align,

    colType: symbol,
    rowType: symbol,

    columns?: Column[],
    dataTypes?: DataType[],
}

export interface BodyContentProps {
    align: Align,

    colType: symbol,
    rowType: symbol,

    row?: Row,
    rowId?: RowId,

    column?: Column,
    dataType?: DataType,
}

export interface FooterContentProps {
    align: Align,

    colType: symbol,
    rowType: symbol,

    column?: Column,
    dataType?: DataType,
}

export interface TitleProps {
    title: string,

    colType: symbol,
    rowType: symbol,
}

export interface MenuProps {
    column: Column,
    dataType: DataType,

    colType: symbol,
    rowType: symbol,
}

export interface MenuItemsProps {
    column: Column,
    dataType: DataType,

    colType: symbol,
    rowType: symbol,
}

export interface FormatterProps {
    value: any,

    colType: symbol,
    rowType: symbol,

    row: Row,
    rowId: RowId,

    column: Column,
    dataType: DataType,
}

export interface EditorProps {
    readonly: boolean,
    disabled: boolean,
    value: any,
    onValueChange: (newValue: any) => void,
    onFocus: (event: FocusEvent) => void,
    onBlur: (event: FocusEvent) => void,
    onKeyDown: (event: KeyboardEvent) => void,
    row: Row,
    rowId: RowId,
    column: Column,
    dataType: DataType,
}