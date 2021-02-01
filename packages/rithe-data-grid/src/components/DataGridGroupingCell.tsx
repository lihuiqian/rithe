import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { BodyCellProps } from "../types/TemplateBaseProps";

export interface DataGridGroupingCellProps extends BodyCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingCell = React.memo((props: DataGridGroupingCellProps) => {
    const {
        colSpan, rowSpan,
        children } = props
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td colSpan={colSpan} rowSpan={rowSpan} >
        {children}
    </Td>
})
DataGridGroupingCell.displayName = 'DataGridGroupingCell'