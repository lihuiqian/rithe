import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableRowProps } from "../types/TemplateBaseProps";

export interface DataGridTableBodyRowProps extends TableRowProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableBodyRow = (props: DataGridTableBodyRowProps) => {
    const { children } = props
    const { tableBodyRowComponent: Tr } = useDataGridTheme()
    return <Tr>{children}</Tr>
}