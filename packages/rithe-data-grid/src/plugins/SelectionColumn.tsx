import { Plugin } from "@rithe/plugin"
import { Sets } from "@rithe/utils"
import React, { ComponentType, useCallback, useMemo } from "react"
import { useDataType } from ".."
import { DataGridFormatter, DataGridFormatterProps } from "../components/DataGridFormatter"
import { DataGridTitle, DataGridTitleProps } from "../components/DataGridTitle"
import { StatePipe } from "../StatePipe"
import Column from "../types/Column"
import Row from "../types/Row"
import RowId from "../types/RowId"
import { DataTypeProvider } from "./DataTypeProvider"

const SELECTION = '__selection__'

export interface SelectionColumnProps {
    hideSelectAll?: boolean,
    width?: number,
    titleComponent?: ComponentType<DataGridTitleProps>,
    formatterComponent?: ComponentType<DataGridFormatterProps>,
}

export const SelectionColumn = (props: SelectionColumnProps) => {
    const { hideSelectAll, width = 40, titleComponent, formatterComponent } = props

    const dataTypes = useDataTypes(hideSelectAll, titleComponent, formatterComponent)
    const displayColumns = useDisplayColumns(width)
    const displayRows = useDisplayRows()

    return <Plugin>
        <DataTypeProvider dataTypes={dataTypes} />
        <StatePipe name="displayColumns" computed={displayColumns} />
        <StatePipe name="displayRows" computed={displayRows} dependencyNames={['getRowId', 'selectedRowIds']} />
    </Plugin>
}

const useDataTypes = (hideSelectAll?: boolean, titleComponent?: ComponentType<DataGridTitleProps>, formatterComponent?: ComponentType<DataGridFormatterProps>) => {
    const dataType = useDataType('action', SELECTION, {
        align: 'center',
        formatter: (value?: boolean) => value ? 'Selected' : 'Not Selected',
        titleComponent: titleComponent ?? DataGridTitle,// TODO
        formatterComponent: formatterComponent ?? DataGridFormatter, // TODO
    })
    return useMemo(() => [dataType], [dataType])
}

const useDisplayColumns = (width: number) => {
    const column = useMemo<Column>(() => ({
        field: SELECTION,
        dataTypeName: SELECTION,
        title: '',
        width,
        getCellValue: (row: Row) => row[SELECTION]
    }), [width])
    return useCallback((displayColumns?: Column[]) => {
        if (!displayColumns) return displayColumns
        return [column, ...displayColumns]
    }, [column])
}

const useDisplayRows = () => {
    return useCallback((displayRows?: Row[], getRowId?: (row: Row) => RowId, selectedRowIds?: RowId[]) => {
        if (!displayRows || !getRowId) return displayRows
        const selectedRowIdSet = Sets.from(selectedRowIds ?? [])
        return displayRows.map(row => {
            const rowId = getRowId(row)
            return { ...row, [SELECTION]: selectedRowIdSet.has(rowId) }
        })
    }, [])
}
