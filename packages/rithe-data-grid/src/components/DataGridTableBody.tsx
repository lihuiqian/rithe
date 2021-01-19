import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridTableBodyProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTableBody = (props: DataGridTableBodyProps) => {
    const { children } = props
    const { tableBodyComponent: Tbody } = useDataGridTheme()
    return <Tbody>{children}</Tbody>
}