import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface TableHeaderProps {
    children?: ReactNode | ReactNode[]
}

export const TableHeader = (props: TableHeaderProps) => {
    const { children } = props
    const { tableHeadComponent: Thead } = useDataGridTheme()
    return <Thead>{children}</Thead>
}