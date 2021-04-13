/* eslint-disable react/prop-types */
import { DragDropEvent, Draggable } from "@rithe/utils";
import React, { ReactElement, useCallback, useState } from "react";
import { COLUMN_RESIZING_PAYLOAD_TYPE } from "../../utils/constants";

export interface DataGridColumnResizingDraggableProps {
    dragEnabled: (fields: string[]) => boolean,
    dragStart: (fields: string[]) => void,
    dragEnd: () => void,
    children: ReactElement,
}

export const DataGridColumnResizingDraggable = React.forwardRef<any, DataGridColumnResizingDraggableProps>((props, ref) => {
    const {
        dragEnabled,
        dragStart,
        dragEnd,
        children
    } = props
    const [clientX, setClientX] = useState<number | undefined>()
    const dragging = clientX !== undefined

    const onStart = useCallback((event: DragDropEvent) => {
        const data = getData(event.sourceTarget as HTMLElement | null)
        if (data && dragEnabled(data.fields)) {
            setClientX(event.clientX)
            document.body.style.cursor = 'e-resize'
            dragStart(data.fields)
        }
    }, [dragEnabled, dragStart])
    const onMove = useCallback((event: DragDropEvent) => {
        if (dragging) {
            setClientX(event.clientX)
        }
    }, [dragging])
    const onEnd = useCallback(() => {
        if (dragging) {
            setClientX(undefined)
            document.body.style.cursor = ''
            dragEnd()
        }
    }, [dragEnd, dragging])

    // const styles = useStyles()
    return <>
        <Draggable
            ref={ref}
            payload={undefined}
            onStart={onStart}
            onMove={onMove}
            onEnd={onEnd}
        >
            {children}
        </Draggable>
        {/* {dragging && <div
            className={styles.dashed}
            style={{ left: clientX }}
        />} */}
    </>
})
DataGridColumnResizingDraggable.displayName = 'DataGridColumnResizingDraggable'

// const useStyles = makeStyles(theme => ({
//     dashed: {
//         position: 'fixed',
//         top: 0,
//         width: 0,
//         height: '100%',
//         border: `0.5px dashed ${theme.palette.divider}`,
//         zIndex: 1000,
//     },
// }))

function getData(target: HTMLElement | null) {
    let draggableElement: HTMLElement | null = target
    while (draggableElement && !draggableElement.dataset['draggable']) {
        draggableElement = draggableElement.parentElement
    }
    if (!draggableElement || draggableElement.dataset['draggable'] !== COLUMN_RESIZING_PAYLOAD_TYPE) return undefined
    const fields = JSON.parse(draggableElement.dataset['fields']!)
    return { fields }
}