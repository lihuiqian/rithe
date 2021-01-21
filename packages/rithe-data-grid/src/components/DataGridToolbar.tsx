import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridToolbarProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridToolbar = (props: DataGridToolbarProps) => {
    const { children } = props
    const style = useMemo<CSSProperties>(() => ({ display: 'flex', alignItems: 'center' }), [])
    return <div style={style}>{children}</div>
}