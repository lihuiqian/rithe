/* eslint-disable react/prop-types */
import { DragDropEvent, Droppable } from "@rithe/utils";
import React, { ReactElement } from "react";

export interface DataGridColumnResizingDroppableProps {
    onDraft: (deltaX: number) => void,
    onCommit: (deltaX: number) => void,
    onCancel: () => void,
    children: ReactElement,
}

export const DataGridColumnResizingDroppable = React.forwardRef<any, DataGridColumnResizingDroppableProps>((props, ref) => {
    const {
        onDraft,
        onCommit,
        onCancel,
        children
    } = props

    const onOver = (event: DragDropEvent) => onDraft(event.deltaX)
    const onEnter = (event: DragDropEvent) => onDraft(event.deltaX)
    const onLeave = () => onCancel()
    const onDrop = (event: DragDropEvent) => onCommit(event.deltaX)

    return <Droppable
        ref={ref}
        onOver={onOver}
        onEnter={onEnter}
        onLeave={onLeave}
        onDrop={onDrop}
    >
        {children}
    </Droppable>
})
DataGridColumnResizingDroppable.displayName = 'DataGridColumnResizingDroppable'