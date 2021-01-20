import React, { ReactNode } from "react";

export interface DataGridTreeCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTreeCell = (props: DataGridTreeCellProps) => {
    const { children } = props
    return <div>{children}</div>
}