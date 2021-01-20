import React, { ReactNode } from "react";

export interface DataGridGroupingRowProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingRow = (props: DataGridGroupingRowProps) => {
    const { children } = props
    return <div>{children}</div>
}