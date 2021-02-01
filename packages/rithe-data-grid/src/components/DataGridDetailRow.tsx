import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridDetailRowProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridDetailRow = (props: DataGridDetailRowProps) => {
    const { children } = props
    const { tableBodyRowComponent: Tr } = useDataGridTheme()
    return <Tr>{children}</Tr>
}