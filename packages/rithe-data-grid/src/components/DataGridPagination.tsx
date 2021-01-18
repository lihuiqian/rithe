import React, { ReactNode } from "react";

export interface DataGridPaginationProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridPagination = (props: DataGridPaginationProps) => {
    const { children } = props
    return <div>{children}</div>
}