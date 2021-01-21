import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridGroupingPanelProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingPanel = (props: DataGridGroupingPanelProps) => {
    const { children } = props
    const style = useMemo<CSSProperties>(() => ({ flexBasis: '100%' }), [])
    return <div style={style}>{children}</div>
}