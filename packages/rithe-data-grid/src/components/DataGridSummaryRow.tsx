import React, { ReactNode } from "react";

export interface DataGridSummaryRowProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSummaryRow = (props: DataGridSummaryRowProps) => {
    const { children } = props
    return <div>{children}</div>
}