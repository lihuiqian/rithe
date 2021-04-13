import { Objects, shallowEquals } from "@rithe/utils";
import { RowId } from "../types/RowId";
import { TableRow } from "../types/TableRow";

export function updateTableRow(
    tableRow: TableRow | undefined,
    updatedData: Partial<TableRow>,
    cacheRecord: Record<RowId, TableRow>
): TableRow {
    const rowId = tableRow?.rowId ?? updatedData.rowId!
    const cache = cacheRecord[rowId]
    const updated = Objects.concat(tableRow ?? {}, updatedData) as unknown as TableRow
    if (cache
        && cache.type === updated.type
        && cache.row === updated.row
        && cache.rowId === updated.rowId
        && cache.height === updated.height
        && shallowEquals(cache.actions, updated.actions)
        && cache.selected === updated.selected
        && cache.level === updated.level
        && cache.expanded === updated.expanded
        && shallowEquals(cache.childRows, updated.childRows))
        return cache
    cacheRecord[rowId] = updated
    return updated
}