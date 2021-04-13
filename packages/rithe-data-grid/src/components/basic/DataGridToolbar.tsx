import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridToolbarProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridToolbar = (props: DataGridToolbarProps) => {
    const { children } = props
    const styles = useStyles()
    return <div style={styles.root}>{children}</div>
}

const useStyles = () => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
        },
    }), [])
}