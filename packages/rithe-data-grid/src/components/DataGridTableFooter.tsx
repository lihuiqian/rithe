import React, { ReactNode } from "react";

export interface DataGridTableFooterProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTableFooter = (props: DataGridTableFooterProps) => {
    const { children } = props
    return <thead>{children}</thead>
}