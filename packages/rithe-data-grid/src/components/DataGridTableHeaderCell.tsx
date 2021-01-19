import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableCellProps } from "../types/TemplateBaseProps";

export interface DataGridTableHeaderCellProps extends TableCellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableHeaderCell = (props: DataGridTableHeaderCellProps) => {
    const { children } = props
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    return <Th>{children}</Th>
}