import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridDetailCellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridDetailCell = (props: DataGridDetailCellProps) => {
    const { children } = props
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td colSpan={Number.MAX_SAFE_INTEGER}>
        {children}
    </Td>
}