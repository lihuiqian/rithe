import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { BodyCellProps } from "../types/TemplateBaseProps";

export interface DataGridGroupingExpandCellProps extends BodyCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingExpandCell = (props: DataGridGroupingExpandCellProps) => {
    const {
        colSpan, rowSpan,
        children } = props
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td colSpan={colSpan} rowSpan={rowSpan} >
        {children}
    </Td>
}