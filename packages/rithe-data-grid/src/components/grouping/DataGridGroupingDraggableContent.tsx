import { makeStyles, Paper, Typography } from "@material-ui/core";
import { DragDropEvent, Draggable } from "@rithe/utils";
import React, { ReactNode, useCallback, useState } from "react";

export interface DataGridGroupingDraggableContentProps {
    payload: any,
    title: string,
    children?: ReactNode | ReactNode[],
}

export const DataGridGroupingDraggableContent = (props: DataGridGroupingDraggableContentProps) => {
    const { payload, title, children } = props
    const [clientPosition, setClientPosition] = useState<{ x: number, y: number } | undefined>()

    const onMove = useCallback((event: DragDropEvent) => {
        setClientPosition({ x: event.clientX, y: event.clientY })
    }, [])
    const onEnd = useCallback(() => {
        setClientPosition(undefined)
    }, [])

    const styles = useStyles()
    return <>
        <Draggable
            payload={payload}
            onMove={onMove}
            onEnd={onEnd}
        >
            <div>
                {children}
            </div>
        </Draggable>
        {clientPosition && <Paper
            className={styles.root}
            style={{ left: clientPosition.x, top: clientPosition.y }}
        >
            <Typography variant="body2">
                {title}
            </Typography>
        </Paper>}
    </>
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.divider}`,
    }
}))