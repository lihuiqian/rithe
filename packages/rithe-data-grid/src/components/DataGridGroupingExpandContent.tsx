import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridGroupingExpandContentProps {
    level?: number,
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingExpandContent = React.memo((props: DataGridGroupingExpandContentProps) => {
    const { level, children } = props
    const styles = useStyles(level ?? 0)
    return <div style={styles.root}>{children}</div>
})
DataGridGroupingExpandContent.displayName = 'DataGridGroupingExpandContent'

const useStyles = (level: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            paddingLeft: `${level * 24}px`
        }
    }), [level])
}