import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface TableProps {
    children?: ReactNode | ReactNode[]
}

export const Table = (props: TableProps) => {
    const { children } = props
    const { tableComponent: Table } = useDataGridTheme()
    return <Table>{children}</Table>
}