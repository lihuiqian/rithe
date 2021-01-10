import { Plugin } from '@rithe/plugin'
import { iter, Maps, Sets } from '@rithe/utils'
import React, { Dispatch, SetStateAction, useCallback, useState } from "react"
import useMixed from '../hooks/useMixed'
import { StatePipe } from '../StatePipe'
import Column from '../types/Column'

export type ColumnWidth = { field: string, width: number }
export type DraftColumnWidthDelta = { fields: string[], delta: number }

export interface ColumnResizingProps {
    // controlled
    columnWidths?: ColumnWidth[]
    onColumnWidthsChange?: (nextColumnWidths: ColumnWidth[]) => void,
    // uncontrolled
    defaultColumnWidths?: ColumnWidth[]
}

export const ColumnResizing = (props: ColumnResizingProps) => {
    const [columnWidths, setColumnWidths] = useMixed(props.columnWidths, props.onColumnWidthsChange, props.defaultColumnWidths)
    const excludes = useExcludes(columnWidths)
    const [draftColumnDelta, setDraftColumnDelta] = useState<DraftColumnWidthDelta | undefined>()
    const changeColumnWidth = useChangeColumnWidth(columnWidths, setColumnWidths)
    const draftColumnWidth = useDraftColumnWidth(setDraftColumnDelta)
    const cancelColumnWidthDraft = useCancelColumnWidthDraft(setDraftColumnDelta)
    const displayColumns = useDisplayColumns(columnWidths, draftColumnDelta)

    return <Plugin>
        <StatePipe name="columnResizingEnabled" value={true} />
        <StatePipe name="columnResizingExcludes" computed={excludes} dependencyNames={['columns']} />
        <StatePipe name="columnResizingDraft" value={draftColumnDelta !== undefined} />
        <StatePipe name="changeColumnWidth" value={changeColumnWidth} />
        <StatePipe name="draftColumnWidth" value={draftColumnWidth} />
        <StatePipe name="cancelColumnWidthDraft" value={cancelColumnWidthDraft} />
        <StatePipe name="displayColumns" computed={displayColumns} />
    </Plugin>
}

const useExcludes = (columnWidths?: ColumnWidth[]) => {
    return useCallback((_?: string[], columns?: Column[]) => {
        if (!columns) return undefined
        if (!columnWidths) return columns.map(c => c.field)
        const allFields = Sets.from(columns.map(c => c.field))
        const includes = Sets.from(columnWidths.map(c => c.field))
        return iter(allFields).difference(includes).asArray().value
    }, [columnWidths])
}

const useChangeColumnWidth = (columnWidths: ColumnWidth[] | undefined, setColumnWidths: (columnWidths: ColumnWidth[]) => void) => {
    return useCallback((fields: string[], delta: number) => {
        if (!columnWidths || fields.length === 0 || delta === 0) return

        setColumnWidths(patchDeltaToWidth(columnWidths, fields, delta))
    }, [columnWidths, setColumnWidths])
}

const useDraftColumnWidth = (setDraftColumnDelta: Dispatch<SetStateAction<DraftColumnWidthDelta | undefined>>) => {
    return useCallback((fields: string[], delta: number) => {
        setDraftColumnDelta({ fields, delta })
    }, [setDraftColumnDelta])
}

const useCancelColumnWidthDraft = (setDraftColumnDeltas: Dispatch<SetStateAction<DraftColumnWidthDelta | undefined>>) => {
    return useCallback(() => {
        setDraftColumnDeltas(undefined)
    }, [setDraftColumnDeltas])
}

const useDisplayColumns = (columnWidths?: ColumnWidth[], draftColumnDelta?: DraftColumnWidthDelta) => {
    return useCallback((displayColumns?: Column[]) => {
        if (!displayColumns) return undefined
        if (!columnWidths) return displayColumns

        const patched = patchDeltaToWidth(columnWidths, draftColumnDelta?.fields ?? [], draftColumnDelta?.delta ?? 0)
        const map = Maps.from(patched.map(({ field, width }) => [field, width]))

        return displayColumns.map(dc => !map.has(dc.field) ? dc : { ...dc, width: map.get(dc.field) })
    }, [columnWidths, draftColumnDelta?.delta, draftColumnDelta?.fields])
}

function patchDeltaToWidth(columnWidths: ColumnWidth[], fields: string[], delta: number) {
    const affected = columnWidths.filter(cw => fields.indexOf(cw.field) >= 0)
    const denominator = affected.map(cw => cw.width).reduce((a, b) => a + b, 0)
    return denominator === 0 ? columnWidths : columnWidths.map(cw => affected.indexOf(cw) < 0 ? cw : { field: cw.field, width: cw.width + delta * cw.width / denominator })
}