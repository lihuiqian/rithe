import React, { ReactNode } from "react";

export interface DataGridColumnFreezeCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnFreezeCell = (props: DataGridColumnFreezeCellProps) => {
    const { children } = props
    return <div>{children}</div>
}