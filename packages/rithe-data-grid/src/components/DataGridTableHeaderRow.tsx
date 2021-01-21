import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { RowProps } from "../types/TemplateBaseProps";

export interface DataGridTableHeaderRowProps extends RowProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableHeaderRow = (props: DataGridTableHeaderRowProps) => {
    const { children } = props
    const { tableHeadRowComponent: Tr } = useDataGridTheme()
    return <Tr>{children}</Tr>
}