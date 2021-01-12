import { Plugin } from "@rithe/plugin";
import { iter } from "@rithe/utils";
import React, { ComponentType, useCallback, useMemo } from "react";
import { DataGridTableBody, DataGridTableBodyProps } from "../components/DataGridTableBody";
import { DataGridTableBodyCell, DataGridTableBodyCellProps } from "../components/DataGridTableBodyCell";
import { DataGridTableBodyRow, DataGridTableBodyRowProps } from "../components/DataGridTableBodyRow";
import useUnknownDataType from "../hooks/useUnknownDataType";
import DataType from "../types/DataType";
import useStateSlice from "../useStateSlice";

export interface TableBodyLayoutProps {
    bodyComponent?: ComponentType<DataGridTableBodyProps>,
    rowComponent?: ComponentType<DataGridTableBodyRowProps>,
    cellComponent?: ComponentType<DataGridTableBodyCellProps>,
}

export const TableBodyLayout = ({
    bodyComponent: Body = DataGridTableBody,
    rowComponent: Row = DataGridTableBodyRow,
    cellComponent: Cell = DataGridTableBodyCell,
}: TableBodyLayoutProps) => {
    const {
        dataTypes, displayColumns, displayRows, getRowId,
    } = useStateSlice(
        'dataTypes', 'displayColumns', 'displayRows', 'getRowId',
    )

    const unknownDataType = useUnknownDataType()
    const dataTypeMap = useMemo(() => iter(dataTypes ?? []).asMap((dataType: DataType<any>) => [dataType.name, dataType]).value, [dataTypes])
    const getDataType = useCallback((field: string) => {
        return dataTypeMap.get(field) ?? unknownDataType
    }, [dataTypeMap, unknownDataType])
    return <Plugin>
        <Body>
            {displayRows?.map((row, rowIndex) => {
                const rowId = getRowId ? getRowId(row) : rowIndex
                return <Row key={rowIndex} rowId={rowId} row={row}>
                    {displayColumns?.map(column => {
                        const { field, dataTypeName, width, getCellValue } = column
                        const value = getCellValue ? getCellValue(row) : row[field]
                        const dataType = getDataType(dataTypeName)
                        const { align, formatter } = dataType
                        const formattedValue = formatter(value, dataType, column, rowId, row)
                        return <Cell key={field} value={value} align={align} formattedValue={formattedValue}
                            dataType={dataType} column={column}
                            rowId={rowId} row={row}
                            width={width}
                        />
                    })}
                </Row>
            })}
        </Body>
    </Plugin>
}