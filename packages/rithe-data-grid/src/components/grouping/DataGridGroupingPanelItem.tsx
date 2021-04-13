import React, { ReactNode } from "react";

export interface DataGridGroupingPanelItemProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingPanelItem = (props: DataGridGroupingPanelItemProps) => {
    const { children } = props
    return <div>{children}</div>
}