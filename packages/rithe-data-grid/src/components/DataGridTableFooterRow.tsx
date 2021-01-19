import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableRowProps } from "../types/TemplateBaseProps";

export interface DataGridTableFooterRowProps extends TableRowProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableFooterRow = (props: DataGridTableFooterRowProps) => {
    const { children } = props
    const { tableFootRowComponent: Tr } = useDataGridTheme()
    return <Tr>{children}</Tr>
}