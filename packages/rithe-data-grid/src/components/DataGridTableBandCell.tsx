import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { Align, Column } from "..";
import DataType from "../types/DataType";
import DragHandler from "../types/DragHandler";
import { DataGridBand } from "./DataGridBand";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableBandCellProps {
    // data
    title: string,
    align: Align,
    dataTypes: DataType<any>[],
    columns: Column[],
    // resizing
    resizingEnabled: boolean,
    onWidthChange: (fields: string[], delta: number) => void,
    onWidthDraft: (fields: string[], delta: number) => void,
    onWidthDraftCancel: (fields: string[]) => void,
    // dragging
    draggingEnabled: boolean,
    onXAxisChange: (fields: string[], delta: number) => void,
    onXAxisDraft: (fields: string[], delta: number) => void,
    onXAxisDraftCancel: (fields: string[]) => void,
    // event
    addDragListener?: (target: EventTarget, eventHandler: DragHandler, options?: { retainTarget?: boolean, retainHandler?: boolean }) => void,
    removeDragListener?: (target: EventTarget) => void,
    // cell
    width?: number,
    colSpan?: number,
    rowSpan?: number,
}

// eslint-disable-next-line react/display-name
export const DataGridTableBandCell = React.memo((props: DataGridTableBandCellProps) => {

    const draggableRef = useColumnOrder(props)
    const resizableRef = useColumnResize(props)

    const { title, align, dataTypes, columns, resizingEnabled, draggingEnabled, width, colSpan, rowSpan } = props
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    const cellStyle = useMemo<CSSProperties>(() => ({
        boxSizing: 'border-box',
        width,
        maxWidth: width,
        minWidth: width,
    }), [width])
    const contentStyle = useMemo<CSSProperties>(() => ({
        display: 'flex',
        justifyContent: align === 'center' ? 'center' : `flex-${align}`,
        alignItems: 'stretch',
        position: 'relative',
        cursor: draggingEnabled ? 'grab' : 'default',
        userSelect: 'none',
    }), [align, draggingEnabled])
    const resizeHandlerStype = useMemo<CSSProperties>(() => ({
        width: 4,
        height: '100%',
        background: 'blue',
        cursor: 'col-resize',
        position: 'absolute',
        right: 0,
    }), [])
    return <Th colSpan={colSpan} rowSpan={rowSpan} style={cellStyle}>
        <div ref={draggableRef} style={contentStyle}>
            <DataGridBand title={title} dataTypes={dataTypes} columns={columns} />
            {resizingEnabled && <div ref={resizableRef} style={resizeHandlerStype}></div>}
        </div>
    </Th>
})

const useColumnOrder = (props: DataGridTableBandCellProps) => {
    const draggableRef = useRef<HTMLTableHeaderCellElement | null>(null)
    const { columns, draggingEnabled, addDragListener, removeDragListener, onXAxisChange, onXAxisDraft, onXAxisDraftCancel } = props
    const fields = useMemo(() => columns.map(c => c.field), [columns])
    useEffect(() => {
        const draggable = draggableRef.current
        if (!draggable || !draggingEnabled) return

        addDragListener && addDragListener(draggable, ({ tap, down, xy: [x], initialRect: { left, right } }) => {
            if (tap) {
                onXAxisDraftCancel(fields)
            } else if (down) {
                x < left ? onXAxisDraft(fields, x - left) : x > right ? onXAxisDraft(fields, x - right) : onXAxisDraft(fields, 0)
            } else {
                x < left ? onXAxisChange(fields, x - left) : x > right ? onXAxisChange(fields, x - right) : onXAxisChange(fields, 0)
                onXAxisDraftCancel(fields)
            }
        }, { retainTarget: true, retainHandler: true })
        return () => {
            removeDragListener && removeDragListener(draggable)
        }
    }, [addDragListener, draggingEnabled, fields, onXAxisChange, onXAxisDraft, onXAxisDraftCancel, removeDragListener])
    return draggableRef
}

const useColumnResize = (props: DataGridTableBandCellProps) => {
    const resizableRef = useRef<HTMLDivElement | null>(null)
    const { columns, resizingEnabled, addDragListener, removeDragListener, onWidthChange, onWidthDraft, onWidthDraftCancel } = props
    const fields = useMemo(() => columns.map(c => c.field), [columns])
    useEffect(() => {
        const resizable = resizableRef.current
        if (!resizable || !resizingEnabled) return

        addDragListener && addDragListener(resizable, ({ tap, down, xy: [x], initial: [initialX] }) => {
            if (tap) {
                onWidthDraftCancel(fields)
            } else if (down) {
                onWidthDraft(fields, x - initialX)
            } else {
                onWidthChange(fields, x - initialX)
                onWidthDraftCancel(fields)
            }
        }, { retainTarget: true, retainHandler: true })
        return () => removeDragListener && removeDragListener(resizable)
    }, [addDragListener, fields, onWidthChange, onWidthDraft, onWidthDraftCancel, removeDragListener, resizingEnabled])
    return resizableRef
}