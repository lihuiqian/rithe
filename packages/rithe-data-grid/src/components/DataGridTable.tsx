import React, { ReactNode } from "react";

export interface DataGridTableProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTable = (props: DataGridTableProps) => {
    const { children } = props
    return <table>{children}</table>
}