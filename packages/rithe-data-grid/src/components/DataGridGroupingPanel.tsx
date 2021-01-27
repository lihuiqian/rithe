import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridGroupingPanelProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingPanel = (props: DataGridGroupingPanelProps) => {
    const { children } = props
    const styles = useStyles()
    return <div style={styles.root}>{children}</div>
}

const useStyles = () => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            flexBasis: '100%',
        },
    }), [])
}