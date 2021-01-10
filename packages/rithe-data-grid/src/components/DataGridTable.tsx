import React, { ReactNode } from "react";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTable = ({ children }: DataGridTableProps) => {
    const { tableComponent: Table } = useDataGridTheme()
    return <Table>{children}</Table>
}