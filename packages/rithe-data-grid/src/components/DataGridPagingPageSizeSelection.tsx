import React, { ReactNode } from "react";

export interface DataGridPagingPageSizeSelectionProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridPagingPageSizeSelection = (props: DataGridPagingPageSizeSelectionProps) => {
    const { children } = props
    return <div>{children}</div>
}