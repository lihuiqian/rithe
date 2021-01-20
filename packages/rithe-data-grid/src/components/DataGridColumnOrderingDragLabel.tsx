import React, { ReactNode } from "react";

export interface DataGridColumnOrderingDragLabelProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnOrderingDragLabel = (props: DataGridColumnOrderingDragLabelProps) => {
    const { children } = props
    return <div>{children}</div>
}