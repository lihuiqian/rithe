import React, { ReactNode } from "react";

export interface DataGridGroupingCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingCell = (props: DataGridGroupingCellProps) => {
    const { children } = props
    return <div>{children}</div>
}