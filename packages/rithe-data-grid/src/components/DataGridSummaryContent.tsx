import React, { ReactNode } from "react";

export interface DataGridSummaryContentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSummaryContent = (props: DataGridSummaryContentProps) => {
    const { children } = props
    return <div>{children}</div>
}