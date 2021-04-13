import { makeStyles } from "@material-ui/core";
import { DragDropEvent, Droppable } from "@rithe/utils";
import React, { ReactNode } from "react";

export interface DataGridGroupingPanelProps {
    payloadType: string,
    groupingFields: string[],
    setGroupingFields: (groupingFields: string[]) => void,
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingPanel = (props: DataGridGroupingPanelProps) => {
    const { payloadType, groupingFields, setGroupingFields, children } = props

    const onDrop = (event: DragDropEvent, payload: any) => {
        if (payload.type !== payloadType) return
        const field = payload.field
        setGroupingFields([...groupingFields, field])
    }

    const styles = useStyles()
    return <Droppable
        onDrop={onDrop}
    >
        <div className={styles.root}>
            {children}
        </div>
    </Droppable>
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
}))
