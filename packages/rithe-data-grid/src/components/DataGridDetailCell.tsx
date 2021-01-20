import React, { ReactNode } from "react";

export interface DataGridDetailCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridDetailCell = (props: DataGridDetailCellProps) => {
    const { children } = props
    return <div>{children}</div>
}