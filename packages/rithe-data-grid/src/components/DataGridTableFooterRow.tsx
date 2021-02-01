import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { FooterRowProps } from "../types/TemplateBaseProps";

export interface DataGridTableFooterRowProps extends FooterRowProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableFooterRow = (props: DataGridTableFooterRowProps) => {
    const { children } = props
    const { tableFootRowComponent: Tr } = useDataGridTheme()
    return <Tr>{children}</Tr>
}