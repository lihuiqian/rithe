import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { Align, Column } from "..";
import DataType from "../types/DataType";
import DragHandler from "../types/DragHandler";
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
    addDragListener?: (target: EventTarget, eventHandler: DragHandler) => void,
    removeDragListener?: (target: EventTarget) => void,
    // cell
    colSpan?: number,
    rowSpan?: number,
}

export const DataGridTableBandCell = (props: DataGridTableBandCellProps) => {
    const { tableHeadCellComponent: Th } = useDataGridTheme()

    const { title, align, dataTypes, columns } = props
    const fields = useMemo(() => columns.map(c => c.field), [columns])

    const draggableRef = useRef<HTMLTableHeaderCellElement | null>(null)
    useEffect(() => {
        const draggable = draggableRef.current
        if (!draggable || !props.draggingEnabled) return

        const { addDragListener, removeDragListener, onXAxisChange, onXAxisDraft, onXAxisDraftCancel } = props
        addDragListener && addDragListener(draggable, ({ tap, down, xy: [x], initialRect: { left, right } }) => {
            console.log(tap, down, x, left, right)
            if (tap) return
            if (down) {
                x < left ? onXAxisDraft(fields, x - left) : x > right ? onXAxisDraft(fields, x - right) : onXAxisDraft(fields, 0)
            } else {
                onXAxisDraftCancel(fields)
                x < left ? onXAxisChange(fields, x - left) : x > right ? onXAxisChange(fields, x - right) : onXAxisChange(fields, 0)
            }
        })

        return () => removeDragListener && removeDragListener(draggable)
    }, [fields, props])

    const alignStyle = useMemo<CSSProperties>(() => ({ display: 'flex', flexDirection: 'row', justifyContent: props.align, alignItems: 'center' }), [props.align])
    return <Th colSpan={props.colSpan} rowSpan={props.rowSpan}>
        <div ref={draggableRef} style={alignStyle}>
            {props.title}
        </div>
    </Th>
}