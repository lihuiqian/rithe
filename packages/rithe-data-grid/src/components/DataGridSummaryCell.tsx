import React, { ReactNode } from "react";

export interface DataGridSummaryCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSummaryCell = (props: DataGridSummaryCellProps) => {
    const { children } = props
    return <div>{children}</div>
}