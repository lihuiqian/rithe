import { Plugin } from "@rithe/plugin";
import { Arrays, Sets } from "@rithe/utils";
import React, { useCallback } from "react";
import { Row, RowId } from "..";
import useMixed from "../hooks/useMixed";
import { StatePipe } from "../StatePipe";
import Toggle from "../types/Toggle";

export interface RowSelectionProps {
    // controlled
    selectedRowIds?: RowId[],
    onSelectedRowIdsChange?: (rowIds: RowId[]) => void,
    // uncontrolled
    defaultSelectedRowIds?: RowId[],
    // other
    highlightSelectedRows?: boolean,
    selectByRowClick?: boolean,
}

export const RowSelection = (props: RowSelectionProps) => {
    const [selectedRowIds, setSelectedRowIds] = useMixed(props.selectedRowIds, props.onSelectedRowIdsChange, props.defaultSelectedRowIds)
    const allSelected = useAllSelected()
    const someSelected = useSomeSelected()
    const toggleSelection = useToggleSelection(selectedRowIds, setSelectedRowIds)
    const toggleSelectAll = useToggleSelectAll(selectedRowIds, setSelectedRowIds)

    const { highlightSelectedRows, selectByRowClick } = props
    return <Plugin>
        <StatePipe name="selectionEnabled" value={true} />
        <StatePipe name="highlightSelectedRows" value={highlightSelectedRows} />
        <StatePipe name="selectByRowClick" value={selectByRowClick} />
        <StatePipe name="selectedRowIds" value={selectedRowIds} />
        <StatePipe name="allSelected" computed={allSelected} dependencyNames={['displayRows', 'getRowId']} />
        <StatePipe name="someSelected" computed={someSelected} dependencyNames={['displayRows', 'getRowId']} />
        <StatePipe name="toggleSelection" value={toggleSelection} />
        <StatePipe name="toggleSelectAll" computed={toggleSelectAll} dependencyNames={['displayRows', 'getRowId']} />
    </Plugin>
}

const useAllSelected = (selectedRowIds?: RowId[]) => {
    return useCallback((_?: boolean, displayRows?: Row[], getRowId?: (row: Row) => RowId) => {
        const allRowIds = displayRows && getRowId ? displayRows.map(getRowId) : undefined
        const all = allRowIds?.length ?? 0
        const count = selectedCount(allRowIds, selectedRowIds)
        return count > 0 && count === all
    }, [selectedRowIds])
}

const useSomeSelected = (selectedRowIds?: RowId[]) => {
    return useCallback((_?: boolean, displayRows?: Row[], getRowId?: (row: Row) => RowId) => {
        const allRowIds = displayRows && getRowId ? displayRows.map(getRowId) : undefined
        const all = allRowIds?.length ?? 0
        const count = selectedCount(allRowIds, selectedRowIds)
        return count > 0 && count < all
    }, [selectedRowIds])
}

const useToggleSelection = (selectedRowIds: RowId[] | undefined, setSelectedRowIds: (rowIds: RowId[]) => void) => {
    return useCallback((rowIds: RowId[], toggle: Toggle) => {
        if (toggle === 'on') {
            setSelectedRowIds(Arrays.from(Sets.union(Sets.from(selectedRowIds ?? []), Sets.from(rowIds))))
        } else if (toggle === 'off') {
            setSelectedRowIds(Arrays.from(Sets.difference(Sets.from(selectedRowIds ?? []), Sets.from(rowIds))))
        } else {
            setSelectedRowIds(Arrays.from(Sets.symmetricDifference(Sets.from(selectedRowIds ?? []), Sets.from(rowIds))))
        }
    }, [selectedRowIds, setSelectedRowIds])
}

const useToggleSelectAll = (selectedRowIds: RowId[] | undefined, setSelectedRowIds: (rowIds: RowId[]) => void) => {
    return useCallback((_?: (toggle: Toggle) => void, displayRows?: Row[], getRowId?: (row: Row) => RowId) => {
        const allRowIds = displayRows && getRowId ? displayRows.map(getRowId) : undefined
        return (toggle: Toggle) => {
            if (toggle === 'on') {
                setSelectedRowIds(allRowIds ?? [])
            } else if (toggle === 'off') {
                setSelectedRowIds([])
            } else {
                setSelectedRowIds(Arrays.from(Sets.symmetricDifference(Sets.from(selectedRowIds ?? []), Sets.from(allRowIds ?? []))))
            }
        }
    }, [selectedRowIds, setSelectedRowIds])
}

function selectedCount(allRowIds?: RowId[], selectedRowIds?: RowId[]) {
    if (!allRowIds || allRowIds.length === 0 || !selectedRowIds || selectedRowIds.length === 0) return 0
    return Sets.intersection(Sets.from(allRowIds), Sets.from(selectedRowIds)).size
}