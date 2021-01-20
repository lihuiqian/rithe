import React, { ReactNode } from "react";

export interface DataGridGroupingPanelProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingPanel = (props: DataGridGroupingPanelProps) => {
    const { children } = props
    return <div>{children}</div>
}