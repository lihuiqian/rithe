import React from "react";
import { Align, Column } from "..";
import DataType from "../types/DataType";
import DragHandler from "../types/DragHandler";
import Frozen from "../types/Frozen";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableHeaderCellProps {
    // data
    title: string,
    align: Align,
    frozen?: Frozen,
    dataType: DataType<any>,
    column: Column,
    // event
    addDragListener?: (target: EventTarget, eventHandler: DragHandler) => void,
    removeDragListener?: (target: EventTarget) => void,
    // resizing
    resizingEnabled: boolean,
    onWidthChange: (field: string, delta: number) => void,
    onWidthDraft: (field: string, delta: number) => void,
    onWidthDraftCancel: (field: string) => void,
    // dragging
    draggingEnabled: boolean,
    onXAxisChange: (field: string, delta: number) => void,
    onXAxisDraft: (field: string, delta: number) => void,
    onXAxisDraftCancel: (field: string) => void,
    // cell
    width?: number,
    colSpan?: number,
    rowSpan?: number,
}

// eslint-disable-next-line react/display-name
export const DataGridTableHeaderCell = React.memo(({ title, column, addDragListener, removeDragListener, onWidthChange, onXAxisChange, width, colSpan, rowSpan }: DataGridTableHeaderCellProps) => {
    const { tableHeadCellComponent: Th } = useDataGridTheme()

    return <Th colSpan={colSpan} rowSpan={rowSpan} style={{ width }} >{title}</Th>
})