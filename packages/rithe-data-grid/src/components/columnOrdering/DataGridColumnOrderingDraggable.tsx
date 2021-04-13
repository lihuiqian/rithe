/* eslint-disable react/prop-types */
import { makeStyles, Paper, Portal, Typography } from "@material-ui/core";
import { DragDropEvent, Draggable } from "@rithe/utils";
import React, { ReactElement, useCallback, useState } from "react";
import { RowId } from "../../types/RowId";
import { COLUMN_ORDERING_PAYLOAD_TYPE } from "../../utils/constants";

export interface DataGridColumnOrderingDraggableProps {
    dragEnabled: (fields: string[]) => boolean,
    dragTitle: (fields: string[], rowIds: RowId[]) => string,
    dragStart: (fields: string[], rect: DOMRect) => void,
    dragEnd: () => void,
    children: ReactElement,
}

export const DataGridColumnOrderingDraggable = React.forwardRef<any, DataGridColumnOrderingDraggableProps>((props, ref) => {
    const {
        dragEnabled,
        dragTitle,
        dragStart,
        dragEnd,
        children
    } = props
    const [title, setTitle] = useState('')
    const [clientPosition, setClientPosition] = useState<{ x: number, y: number } | undefined>()
    const dragging = clientPosition !== undefined

    const onStart = useCallback((event: DragDropEvent) => {
        const data = getData(event.sourceTarget as HTMLElement | null)
        if (data && dragEnabled(data.fields)) {
            setTitle(dragTitle(data.fields, data.rowIds))
            setClientPosition({ x: event.clientX, y: event.clientY })
            dragStart(data.fields, data.rect)
        }
    }, [dragEnabled, dragStart, dragTitle])
    const onMove = useCallback((event: DragDropEvent) => {
        if (dragging) {
            setClientPosition({ x: event.clientX, y: event.clientY })
        }
    }, [dragging])
    const onEnd = useCallback(() => {
        if (dragging) {
            setTitle('')
            setClientPosition(undefined)
            dragEnd()
        }
    }, [dragging, dragEnd])

    const styles = useStyles()
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
        <Portal>
            {dragging && <Paper
                className={styles.paper}
                style={{ left: clientPosition!.x, top: clientPosition!.y }}
            >
                <Typography variant="body2">
                    {title}
                </Typography>
            </Paper>}
        </Portal>
    </>
})
DataGridColumnOrderingDraggable.displayName = 'DataGridColumnOrderingDraggable'

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'fixed',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.divider}`,
        zIndex: 1000,
    },
}))

function getData(target: HTMLElement | null) {
    let draggableElement: HTMLElement | null = target
    while (draggableElement && !draggableElement.dataset['draggable']) {
        draggableElement = draggableElement.parentElement
    }
    if (!draggableElement || draggableElement.dataset['draggable'] !== COLUMN_ORDERING_PAYLOAD_TYPE) return undefined
    const fields = JSON.parse(draggableElement.dataset['fields']!)
    const rowIds = JSON.parse(draggableElement.dataset['rowids']!)
    const rect = draggableElement.getBoundingClientRect()
    return { fields, rowIds, rect }
}