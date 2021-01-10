import { Plugin } from '@rithe/plugin';
import { Arrays, Comparators, iter, Sets } from '@rithe/utils';
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { StatePipe } from "..";
import useMixed from '../hooks/useMixed';
import Column from '../types/Column';

export type DraftColumnOrderDelta = { fields: string[], delta: number }

export interface ColumnOrderingProps {
    // controlled
    columnOrder?: string[],
    onColumnOrderChange?: (columnOrders: string[]) => void,
    // uncontrolled
    defaultColumnOrder?: string[]
}

export const ColumnOrdering = (props: ColumnOrderingProps) => {
    const [columnOrder, setColumnOrder] = useMixed(props.columnOrder, props.onColumnOrderChange, props.defaultColumnOrder)
    const excludes = useExcludes(columnOrder)
    const [draftColumnDelta, setDraftColumnDelta] = useState<DraftColumnOrderDelta | undefined>()
    const changeColumnOrder = useChangeColumnOrder(columnOrder, setColumnOrder, setDraftColumnDelta)
    const draftColumnOrder = useDraftColumnOrder(setDraftColumnDelta)
    const cancelColumnOrderDraft = useCancelColumnOrderDraft(setDraftColumnDelta)
    const displayColumns = useDisplayColumns(columnOrder, draftColumnDelta)

    return <Plugin>
        <StatePipe name="columnDraggingEnabled" value={true} />
        <StatePipe name="columnDraggingExcludes" computed={excludes} dependencyNames={['columns']} />
        <StatePipe name="columnDraggingDraft" value={draftColumnDelta !== undefined} />
        <StatePipe name="changeColumnOrder" value={changeColumnOrder} />
        <StatePipe name="draftColumnOrder" value={draftColumnOrder} />
        <StatePipe name="cancelColumnOrderDraft" value={cancelColumnOrderDraft} />
        <StatePipe name="displayColumns" computed={displayColumns} />
    </Plugin>
}

const useExcludes = (columnOrder?: string[]) => {
    return useCallback((_?: string[], columns?: Column[]) => {
        if (!columns) return undefined
        if (!columnOrder) return columns.map(c => c.field)
        const allFields = Sets.from(columns.map(c => c.field))
        const includes = Sets.from(columnOrder)
        return iter(allFields).difference(includes).asArray().value
    }, [columnOrder])
}

const useChangeColumnOrder = (columnOrder: string[] | undefined, setColumnOrder: (columnOrder: string[]) => void, setDraftColumnDeltas: Dispatch<SetStateAction<DraftColumnOrderDelta | undefined>>) => {
    return useCallback((fields: string[], delta: number) => {
        if (!columnOrder || fields.length === 0 || delta === 0) return
        console.log('change', fields, delta)
        setColumnOrder(patchDeltaToOrder(columnOrder, fields, delta))
        setDraftColumnDeltas(undefined)
    }, [columnOrder, setColumnOrder, setDraftColumnDeltas])
}

const useDraftColumnOrder = (setDraftColumnDelta: Dispatch<SetStateAction<DraftColumnOrderDelta | undefined>>) => {
    return useCallback((fields: string[], delta: number) => {
        console.log('draft', fields, delta)
        setDraftColumnDelta({ fields, delta })
    }, [setDraftColumnDelta])
}

const useCancelColumnOrderDraft = (setDraftColumnDeltas: Dispatch<SetStateAction<DraftColumnOrderDelta | undefined>>) => {
    return useCallback(() => {
        console.log('cancel')
        setDraftColumnDeltas(undefined)
    }, [setDraftColumnDeltas])
}

const useDisplayColumns = (columnOrder?: string[], draftColumnDelta?: DraftColumnOrderDelta) => {
    return useCallback((displayColumns?: Column[]) => {
        if (!displayColumns) return undefined
        if (!columnOrder) return displayColumns

        const patched = patchDeltaToOrder(columnOrder, draftColumnDelta?.fields ?? [], draftColumnDelta?.delta ?? 0)

        console.log(columnOrder, draftColumnDelta, patched)
        return Arrays.sort(displayColumns, Comparators.compare(c => patched.indexOf(c.field), Comparators.natualOrder()))
    }, [columnOrder, draftColumnDelta])
}

function patchDeltaToOrder(columnOrder: string[], fields: string[], delta: number) {
    if (delta === 0) return columnOrder
    const newOrder = columnOrder.slice()
    if (delta > 0) {
        let moved = 0
        for (let i = columnOrder.length - 1; i >= 0; i--) {
            const field = columnOrder[i]
            if (fields.indexOf(field) < 0) continue
            const available = columnOrder.length - i - 1 - moved
            newOrder.splice(i, 1)
            newOrder.splice(i + Math.min(delta, available), 0, field)
            moved++
        }
    } else {
        let moved = 0
        for (let i = 0; i < columnOrder.length; i++) {
            const field = columnOrder[i]
            if (fields.indexOf(field) < 0) continue
            const available = i - moved
            newOrder.splice(i, 1)
            newOrder.splice(i + Math.max(delta, -available), 0, field)
            moved++
        }
    }
    return newOrder
}