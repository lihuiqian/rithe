import { Plugin } from "@rithe/plugin";
import { ArrayMultimap, ArrayMultimaps, Arrays, Comparators, Maps } from "@rithe/utils";
import React, { useCallback } from "react";
import { State } from "../State";
import { RowId } from "../types/RowId";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE } from "../utils/constants";
import { updateTableRow } from "../utils/updateTableRow";

export interface TreeProps {
    getParentRowId: (rowId: RowId) => RowId | null,
}

export const Tree = (props: TreeProps) => {
    const {
        getParentRowId,
    } = props

    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = []) => {
        const c2pMap = Maps.from(tableBodyRows.filter(tableRow => tableRow.type === DATA_TYPE)
            .map(({ rowId }) => [rowId!, getParentRowId(rowId!)]))
        const p2cMultimap = ArrayMultimaps.invertFrom(c2pMap)

        const treedRowRecord: Record<RowId, TableRow> = {}
        const rootRows: TableRow[] = []
        for (const tableRow of sort(tableBodyRows, c2pMap, p2cMultimap)) {
            if (tableRow.type !== DATA_TYPE) {
                rootRows.push(tableRow)
                continue
            }
            const rowId = tableRow.rowId!
            const childRowIds = p2cMultimap.get(rowId)
            const currentRow = updateTableRow(tableRow, {
                childRows: childRowIds ? [...(tableRow.childRows ?? [])] : tableRow.childRows,
            }, {})
            const parentRowId = c2pMap.get(rowId)
            const parentRow = parentRowId === null || parentRowId === undefined ? null : treedRowRecord[parentRowId]
            treedRowRecord[rowId] = currentRow
            parentRow ? parentRow.childRows?.push(currentRow) : rootRows.push(currentRow)
        }
        return rootRows
    }, [getParentRowId])

    return <Plugin>
        <State name="tableBodyRows" computed={tableBodyRowsComputed} depNames={['getRowId']} />
    </Plugin>
}

function sort(tableRows: TableRow[], c2pMap: Map<RowId, RowId | null>, p2cMultimap: ArrayMultimap<RowId | null, RowId>) {
    const rootRows = tableRows.filter(tableRow => tableRow.type !== DATA_TYPE || c2pMap.get(tableRow.rowId!) === null)

    const rowIdOrder = dfs(p2cMultimap)
    const comparator = Comparators.compare<TableRow, RowId>(tableRow => tableRow.rowId!, Comparators.explicit(...rowIdOrder))
    const restTableRows = Arrays.sort(Arrays.difference(tableRows, rootRows), comparator)

    return Arrays.concat(rootRows, restTableRows)
}

function dfs(p2cMultimap: ArrayMultimap<RowId | null, RowId>) {
    const result: RowId[] = []
    const stack: (RowId | null)[] = [null]
    while (stack.length > 0) {
        const currentRowId = stack.pop()!
        currentRowId !== null && result.push(currentRowId)
        const childRowIds = p2cMultimap.get(currentRowId)
        childRowIds && stack.push(...Arrays.reverse(childRowIds))
    }
    return result
}