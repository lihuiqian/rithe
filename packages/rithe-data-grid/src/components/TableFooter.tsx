import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface TableFooterProps {
    children?: ReactNode | ReactNode[]
}

export const TableFooter = (props: TableFooterProps) => {
    const { children } = props
    const { tableFootComponent: Tfoot } = useDataGridTheme()
    return <Tfoot>{children}</Tfoot>
}