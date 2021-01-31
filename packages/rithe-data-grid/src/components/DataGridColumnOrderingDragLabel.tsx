import React, { CSSProperties, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridColumnOrderingDragLabelProps {
    clientX: number,
    clientY: number,
    title: string,
}

export const DataGridColumnOrderingDragLabel = (props: DataGridColumnOrderingDragLabelProps) => {
    const { clientX, clientY, title } = props
    const styles = useStyles(clientX, clientY)
    const { typographyComponent: Typography } = useDataGridTheme()
    return <div style={styles.root}><Typography>{title}</Typography></div>
}

const useStyles = (clientX: number, clientY: number) => useMemo<Record<string, CSSProperties>>(() => ({
    root: {
        position: 'fixed',
        left: clientX,
        top: clientY,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
    }
}), [clientX, clientY])