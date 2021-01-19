import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableCellProps } from "../types/TemplateBaseProps";

export interface DataGridTableBodyCellProps extends TableCellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableBodyCell = (props: DataGridTableBodyCellProps) => {
    const { children } = props
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td>{children}</Td>
}