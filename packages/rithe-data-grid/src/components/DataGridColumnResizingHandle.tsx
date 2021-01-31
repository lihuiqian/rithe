import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridColumnResizingHandleProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnResizingHandle = (props: DataGridColumnResizingHandleProps) => {
    const { children } = props
    const styles = useStyles()
    return <div style={styles.root}>{children}</div>
}

const useStyles = () => useMemo<Record<string, CSSProperties>>(() => ({
    root: {
        width: 4,
        height: '100%',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderColor: 'cyan',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        marginRight: -2,
    }
}), [])