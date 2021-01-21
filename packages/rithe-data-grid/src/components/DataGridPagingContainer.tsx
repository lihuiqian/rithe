import React, { ReactNode } from "react";

export interface DataGridPagingContainerProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridPagingContainer = (props: DataGridPagingContainerProps) => {
    const { children } = props
    return <div>{children}</div>
}