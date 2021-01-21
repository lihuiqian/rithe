import React, { CSSProperties, ReactNode, useMemo } from "react";

export interface DataGridToolbarContentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridToolbarContent = (props: DataGridToolbarContentProps) => {
    const { children } = props
    const style = useMemo<CSSProperties>(() => ({ flex: '1 1 auto' }), [])
    return <div style={style}>{children}</div>
}