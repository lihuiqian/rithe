import React, { ReactNode } from "react";

export interface DataGridTreeHeaderCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTreeHeaderCell = (props: DataGridTreeHeaderCellProps) => {
    const { children } = props
    return <div>{children}</div>
}