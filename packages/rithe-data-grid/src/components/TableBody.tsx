import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface TableBodyProps {
    children?: ReactNode | ReactNode[]
}

export const TableBody = (props: TableBodyProps) => {
    const { children } = props
    const { tableBodyComponent: Tbody } = useDataGridTheme()
    return <Tbody>{children}</Tbody>
}