import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
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
    addDragListener?: (target: EventTarget, eventHandler: DragHandler, options?: { retainTarget?: boolean, retainHandler?: boolean }) => void,
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
export const DataGridTableHeaderCell = React.memo((props: DataGridTableHeaderCellProps) => {

    const draggableRef = useColumnOrder(props)
    const resizableRef = useColumnResize(props)

    const { title, align, resizingEnabled, draggingEnabled, width, colSpan, rowSpan } = props
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    const contentStyle = useMemo<CSSProperties>(() => ({
        display: 'flex',
        position: 'relative',
        width,
        flexDirection: 'row',
        justifyContent: align,
        alignItems: 'stretch',
        cursor: draggingEnabled ? 'grab' : 'default',
        userSelect: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }), [align, draggingEnabled, width])
    const resizeHandlerStype = useMemo<CSSProperties>(() => ({
        width: 4,
        height: '100%',
        background: 'blue',
        cursor: 'col-resize',
        position: 'absolute',
        right: 0,
    }), [])
    return <Th colSpan={colSpan} rowSpan={rowSpan}>
        <div ref={draggableRef} style={contentStyle}>
            {title}
            {resizingEnabled && <div ref={resizableRef} style={resizeHandlerStype}></div>}
        </div>
    </Th>
})

const useColumnOrder = (props: DataGridTableHeaderCellProps) => {
    const draggableRef = useRef<HTMLTableHeaderCellElement | null>(null)
    const { column: { field }, draggingEnabled, addDragListener, removeDragListener, onXAxisChange, onXAxisDraft, onXAxisDraftCancel } = props
    useEffect(() => {
        const draggable = draggableRef.current
        if (!draggable || !draggingEnabled) return

        addDragListener && addDragListener(draggable, ({ tap, down, xy: [x], initialRect: { left, right } }) => {
            if (tap) {
                onXAxisDraftCancel(field)
            } else if (down) {
                x < left ? onXAxisDraft(field, x - left) : x > right ? onXAxisDraft(field, x - right) : onXAxisDraft(field, 0)
            } else {
                x < left ? onXAxisChange(field, x - left) : x > right ? onXAxisChange(field, x - right) : onXAxisChange(field, 0)
                onXAxisDraftCancel(field)
            }
        }, { retainTarget: true, retainHandler: true })
        return () => {
            removeDragListener && removeDragListener(draggable)
        }
    }, [addDragListener, draggingEnabled, field, onXAxisChange, onXAxisDraft, onXAxisDraftCancel, removeDragListener])
    return draggableRef
}

const useColumnResize = (props: DataGridTableHeaderCellProps) => {
    const resizableRef = useRef<HTMLDivElement | null>(null)
    const { column: { field }, resizingEnabled, addDragListener, removeDragListener, onWidthChange, onWidthDraft, onWidthDraftCancel } = props
    useEffect(() => {
        const resizable = resizableRef.current
        if (!resizable || !resizingEnabled) return

        addDragListener && addDragListener(resizable, ({ tap, down, xy: [x], initial: [initialX] }) => {
            if (tap) {
                onWidthDraftCancel(field)
            } else if (down) {
                onWidthDraft(field, x - initialX)
            } else {
                onWidthChange(field, x - initialX)
                onWidthDraftCancel(field)
            }
        }, { retainTarget: true, retainHandler: true })
        return () => removeDragListener && removeDragListener(resizable)
    }, [addDragListener, field, onWidthChange, onWidthDraft, onWidthDraftCancel, removeDragListener, resizingEnabled])
    return resizableRef
}