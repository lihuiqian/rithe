import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { CellProps } from "../types/TemplateBaseProps";

export interface DataGridTableFooterCellProps extends CellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableFooterCell = (props: DataGridTableFooterCellProps) => {
    const { children } = props
    const { tableFootCellComponent: Th } = useDataGridTheme()
    return <Th>{children}</Th>
}