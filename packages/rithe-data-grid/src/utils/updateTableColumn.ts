import { Objects, shallowEquals } from "@rithe/utils";
import { TableColumn } from "../types/TableColumn";

export function updateTableColumn(
    tableColumn: TableColumn | undefined,
    updatedData: Partial<TableColumn>,
    cacheRecord: Record<string, TableColumn>
): TableColumn {
    const field = tableColumn?.field ?? updatedData.field!
    const cache = cacheRecord[field]
    const updated = Objects.concat(tableColumn ?? {}, updatedData) as unknown as TableColumn
    if (cache
        && cache.type === updated.type
        && cache.column === updated.column
        && cache.field === updated.field
        && cache.width === updated.width
        && cache.freezePosition === updated.freezePosition
        && cache.freezeOffset === updated.freezeOffset
        && shallowEquals(cache.actions, updated.actions))
        return cache
    cacheRecord[field] = updated
    return updated
}