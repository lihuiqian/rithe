import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableCellProps } from "../types/TemplateBaseProps";

export interface DataGridTableFooterCellProps extends TableCellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableFooterCell = (props: DataGridTableFooterCellProps) => {
    const { children } = props
    const { tableFootCellComponent: Th } = useDataGridTheme()
    return <Th>{children}</Th>
}