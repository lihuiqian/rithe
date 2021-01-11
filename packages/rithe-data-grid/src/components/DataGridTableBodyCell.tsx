import React, { CSSProperties, useMemo } from "react";
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
    width?: number,
    colSpan?: number,
    rowSpan?: number,
}

// eslint-disable-next-line react/display-name
export const DataGridTableBodyCell = React.memo((props: DataGridTableBodyCellProps) => {
    const { value, formattedValue, align, dataType, column, rowId, row, width, colSpan, rowSpan } = props
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    const Formatter = dataType.formatterComponent
    const cellStyle = useMemo<CSSProperties>(() => ({
        boxSizing: 'border-box',
        width,
        maxWidth: width,
        minWidth: width,
    }), [width])
    const contentStyle = useMemo<CSSProperties>(() => ({
        display: 'flex',
        justifyContent: align === 'center' ? 'center' : `flex-${align}`,
        alignItems: 'stretch',
    }), [align])
    return <Td rowSpan={rowSpan} colSpan={colSpan} style={cellStyle}>
        <div style={contentStyle}>
            <Formatter value={value} formattedValue={formattedValue} dataType={dataType} column={column} rowId={rowId} row={row} />
        </div>
    </Td>
})