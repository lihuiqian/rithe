/* eslint-disable react/prop-types */
import { DragDropEvent, Droppable } from "@rithe/utils";
import React, { ReactElement } from "react";

export interface DataGridColumnOrderingDroppableProps {
    dragOffset: (clientX: number) => number,
    onDraft: (offset: number) => void,
    onCommit: (offset: number) => void,
    onCancel: () => void,
    children: ReactElement,
}

export const DataGridColumnOrderingDroppable = React.forwardRef<any, DataGridColumnOrderingDroppableProps>((props, ref) => {
    const {
        dragOffset,
        onDraft,
        onCommit,
        onCancel,
        children
    } = props

    const onOver = (event: DragDropEvent) => onDraft(dragOffset(event.clientX))
    const onEnter = (event: DragDropEvent) => onDraft(dragOffset(event.clientX))
    const onLeave = () => onCancel()
    const onDrop = (event: DragDropEvent) => onCommit(dragOffset(event.clientX))

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
DataGridColumnOrderingDroppable.displayName = 'DataGridColumnOrderingDroppable'