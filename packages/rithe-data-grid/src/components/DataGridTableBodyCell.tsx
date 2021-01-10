import React, { ReactNode } from "react";
import { Align, Column, Row, RowId } from "..";
import DataType from "../types/DataType";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableBodyCellProps {
    // data
    value: any,
    formattedValue: string,
    align: Align,
    dataType: DataType<any>,
    column: Column,
    rowId: RowId,
    row: Row,
    // cell
    colSpan?: number,
    rowSpan?: number,
    children: ReactNode | ReactNode[],
}

// eslint-disable-next-line react/display-name
export const DataGridTableBodyCell = React.memo(({ children }: DataGridTableBodyCellProps) => {
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    return <Th>{children}</Th>
})