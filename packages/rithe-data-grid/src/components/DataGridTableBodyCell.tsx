import React from "react";
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
}

// eslint-disable-next-line react/display-name
export const DataGridTableBodyCell = React.memo((props: DataGridTableBodyCellProps) => {
    const { formattedValue } = props
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    return <Th>{formattedValue}</Th>
})