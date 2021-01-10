import React, { ReactNode } from "react";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableHeaderProps {
    children: ReactNode | ReactNode[],
}

export const DataGridTableHeader = ({ children }: DataGridTableHeaderProps) => {
    const { tableHeadComponent: Thead } = useDataGridTheme()
    return <Thead>{children}</Thead>
}