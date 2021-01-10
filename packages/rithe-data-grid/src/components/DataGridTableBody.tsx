import React, { ReactNode } from "react";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableBodyProps {
    children: ReactNode | ReactNode[],
}

export const DataGridTableBody = ({ children }: DataGridTableBodyProps) => {
    const { tableBodyComponent: TBody } = useDataGridTheme()
    return <TBody>{children}</TBody>
}