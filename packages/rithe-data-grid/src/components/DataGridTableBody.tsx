import React, { ReactNode } from "react";

export interface DataGridTableBodyProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTableBody = (props: DataGridTableBodyProps) => {
    const { children } = props
    return <thead>{children}</thead>
}