import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridTableProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTable = (props: DataGridTableProps) => {
    const { children } = props
    const { tableComponent: Table } = useDataGridTheme()
    return <Table>{children}</Table>
}