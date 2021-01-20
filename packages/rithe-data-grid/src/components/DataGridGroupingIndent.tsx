import React, { ReactNode } from "react";

export interface DataGridGroupingCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingIndent = (props: DataGridGroupingCellProps) => {
    const { children } = props
    return <div>{children}</div>
}