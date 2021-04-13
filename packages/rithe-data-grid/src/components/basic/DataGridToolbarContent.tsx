import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridToolbarContentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridToolbarContent = (props: DataGridToolbarContentProps) => {
    const { children } = props
    const styles = useStyles()
    return <div style={styles.root}>{children}</div>
}

const useStyles = () => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
        }
    }), [])
}