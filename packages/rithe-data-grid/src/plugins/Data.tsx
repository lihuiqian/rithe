import { Plugin } from "@rithe/plugin";
import { Arrays } from "@rithe/utils";
import React, { useCallback, useMemo, useRef } from "react";
import { State } from "../State";
import { Column } from "../types/Column";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { CATEGORY_TYPE, DATA_TYPE, DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT, HEADER_TYPE } from "../utils/constants";
import { updateTableColumn } from "../utils/updateTableColumn";
import { updateTableRow } from "../utils/updateTableRow";

export interface DataProps {
    columns: Column[],
    rows: Row[],
    getRowId?: (row: Row) => RowId,
}

export const Data = (props: DataProps) => {
    const { columns, rows, getRowId } = props

    const getRowIdValue = useCallback((row: Row) => {
        return getRowId ? getRowId(row) : rows.indexOf(row)
    }, [getRowId, rows])

    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsGenerated = useCallback(() => {
        return columns.map(column => {
            return updateTableColumn(undefined, {
                type: DATA_TYPE,
                column,
                field: column.field,
                width: column.width ?? DEFAULT_COLUMN_WIDTH,
            }, tableColumnsCacheRef.current)
        })
    }, [columns])

    const tableHeaderRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableHeaderRowsValue = useMemo<TableRow[]>(() => {
        const rowCount = columns.map(c => c.categories?.length ?? 0).reduce((a, b) => Math.max(a, b), 0) + 1
        return Arrays.range(0, rowCount).map(i => {
            return updateTableRow(undefined, {
                type: i === rowCount - 1 ? HEADER_TYPE : CATEGORY_TYPE,
                rowId: `header${i}`,
                height: DEFAULT_ROW_HEIGHT,
            }, tableHeaderRowsCacheRef.current)
        })
    }, [columns])

    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsValue = useMemo<TableRow[]>(() => rows.map(row => {
        const rowId = getRowIdValue(row)
        return updateTableRow(undefined, {
            type: DATA_TYPE,
            height: DEFAULT_ROW_HEIGHT,
            row,
            rowId,
        }, tableBodyRowsCacheRef.current)
    }), [getRowIdValue, rows])

    return <Plugin>
        <State name="columns" value={columns} />
        <State name="rows" value={rows} />
        <State name="getRowId" value={getRowIdValue} />
        <State name="tableColumns" generated={tableColumnsGenerated} />
        <State name="tableHeaderRows" value={tableHeaderRowsValue} />
        <State name="tableBodyRows" value={tableBodyRowsValue} />
    </Plugin>
}
