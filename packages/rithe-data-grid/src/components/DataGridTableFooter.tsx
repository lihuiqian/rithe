import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridTableFooterProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTableFooter = (props: DataGridTableFooterProps) => {
    const { children } = props
    const { tableFootComponent: Tfoot } = useDataGridTheme()
    return <Tfoot>{children}</Tfoot>
}