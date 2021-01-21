import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { CellProps } from "../types/TemplateBaseProps";

export interface DataGridTableBodyCellProps extends CellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableBodyCell = (props: DataGridTableBodyCellProps) => {
    const { children } = props
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td>{children}</Td>
}