import React, { ReactNode } from "react";

export interface DataGridPagingPaginationProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridPagingPagination = (props: DataGridPagingPaginationProps) => {
    const { children } = props
    return <div>{children}</div>
}