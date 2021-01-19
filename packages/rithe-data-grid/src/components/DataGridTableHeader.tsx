import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridTableHeaderProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTableHeader = (props: DataGridTableHeaderProps) => {
    const { children } = props
    const { tableHeadComponent: Thead } = useDataGridTheme()
    return <Thead>{children}</Thead>
}