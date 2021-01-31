import { Plugin } from "@rithe/plugin";
import { Arrays, Maps } from "@rithe/utils";
import React, { useCallback, useMemo } from "react";
import { State } from "../State";
import { Column } from "../types/Column";
import { DataType } from "../types/DataType";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE, HEADER_TYPE } from "../utils/constants";

export interface DataProps {
    columns: Column[],
    rows: Row[],
    getRowId?: (row: Row) => RowId,

}

export const Data = (props: DataProps) => {
    const { columns, rows, getRowId } = props

    const getRowIdValue = useGetRowIdValue(rows, getRowId)
    const tableColumnsGenerated = useTableColumnsGenerated(columns)
    const tableHeaderRowsValue = useTableHeaderRowsValue(columns)
    const tableBodyRowsValue = useTableBodyRowsValue(rows, getRowIdValue)
    return <Plugin>
        <State name="columns" value={columns} />
        <State name="rows" value={rows} />
        <State name="getRowId" value={getRowIdValue} />
        <State name="displayColumns" value={columns} />
        <State name="displayRows" value={rows} />
        <State name="tableColumns" generated={tableColumnsGenerated} depNames={['dataTypes']} />
        <State name="tableHeaderRows" value={tableHeaderRowsValue} />
        <State name="tableBodyRows" value={tableBodyRowsValue} />
    </Plugin>
}

const useGetRowIdValue = (rows: Row[], getRowId?: (row: Row) => RowId) => {
    return useCallback((row: Row) => {
        return getRowId ? getRowId(row) : rows.indexOf(row)
    }, [getRowId, rows])
}

const useTableColumnsGenerated = (columns: Column[]) => {
    return useCallback((dataTypes?: DataType[]) => {
        const dataTypeMap = Maps.from((dataTypes ?? []).map(dt => [dt.name, dt]))
        return columns.map(column => ({
            key: column.field,
            type: DATA_TYPE,
            column,
            dataType: dataTypeMap.get(column.dataTypeName),
            width: column.width ?? 120,
        }))
    }, [columns])
}

const useTableHeaderRowsValue = (columns: Column[]) => {
    const rowCount = columns.filter(c => c.categories).map(c => c.categories!.length).reduce((a, b) => Math.max(a, b), 0) + 1
    return useMemo<TableRow[]>(() => Arrays.range(0, rowCount).map(i => ({
        key: `header${i}`,
        type: HEADER_TYPE,
        height: 48,
    })), [rowCount])
}

const useTableBodyRowsValue = (rows: Row[], getRowId: (row: Row) => RowId) => {
    return useMemo<TableRow[]>(() => rows.map(row => {
        const rowId = getRowId(row)
        return {
            key: `${rowId}`,
            type: DATA_TYPE,
            height: 48,
            row,
            rowId,
        }
    }), [getRowId, rows])
}