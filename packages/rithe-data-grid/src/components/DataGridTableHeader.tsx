import React, { ReactNode } from "react";

export interface DataGridTableHeaderProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTableHeader = (props: DataGridTableHeaderProps) => {
    const { children } = props
    return <thead>{children}</thead>
}