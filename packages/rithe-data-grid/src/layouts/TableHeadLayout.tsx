import { Plugin } from "@rithe/plugin";
import { Arrays, Comparators, iter } from "@rithe/utils";
import React, { ComponentType, useCallback, useMemo, useRef } from "react";
import { DataGridTableBandCell, DataGridTableBandCellProps } from "../components/DataGridTableBandCell";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/DataGridTableHeader";
import { DataGridTableHeaderCell, DataGridTableHeaderCellProps } from "../components/DataGridTableHeaderCell";
import { DataGridTableHeaderRow, DataGridTableHeaderRowProps } from "../components/DataGridTableHeaderRow";
import useUnknownDataType from "../hooks/useUnknownDataType";
import Column from "../types/Column";
import DataType from "../types/DataType";
import useStateSlice from "../useStateSlice";

export interface TableHeadLayoutProps {
    headComponent?: ComponentType<DataGridTableHeaderProps>,
    rowComponent?: ComponentType<DataGridTableHeaderRowProps>,
    cellComponent?: ComponentType<DataGridTableHeaderCellProps>,
    bandComponent?: ComponentType<DataGridTableBandCellProps>,
}

export const TableHeadLayout = ({
    headComponent: Head = DataGridTableHeader,
    rowComponent: Row = DataGridTableHeaderRow,
    cellComponent: Cell = DataGridTableHeaderCell,
    bandComponent: Band = DataGridTableBandCell,
}: TableHeadLayoutProps) => {
    const {
        dataTypes, displayColumns,
        columnResizingEnabled, columnResizingExcludes, columnResizingDraft, changeColumnWidth, draftColumnWidth, cancelColumnWidthDraft,
        columnDraggingEnabled, columnDraggingExcludes, columnDraggingDraft, changeColumnOrder, draftColumnOrder, cancelColumnOrderDraft,
        addDragListener, removeDragListener,
    } = useStateSlice(
        'dataTypes', 'displayColumns',
        'columnResizingEnabled', 'columnResizingExcludes', 'columnResizingDraft', 'changeColumnWidth', 'draftColumnWidth', 'cancelColumnWidthDraft',
        'columnDraggingEnabled', 'columnDraggingExcludes', 'columnDraggingDraft', 'changeColumnOrder', 'draftColumnOrder', 'cancelColumnOrderDraft',
        'addDragListener', 'removeDragListener',
    )

    const rowCol = useMemo<([colIndex: number, catIndex: number, colSpan: number, rowSpan: number] | undefined)[][]>(() => {
        if (!displayColumns) return []
        const rowCount = 1 + (Arrays.max(displayColumns.map(dc => dc.categories?.length ?? 0), Comparators.natualOrder()) ?? 0)
        const colRow = displayColumns.map((col, colIndex) => {
            const categories = col.categories ?? []
            return [
                ...categories.map((category, catIndex) => {
                    const leftCategory = getCategory(displayColumns, colIndex - 1, catIndex)
                    if (leftCategory === category) return undefined
                    let rightCategory: string | undefined = category, span = 0
                    while (rightCategory === category) rightCategory = getCategory(displayColumns, colIndex + ++span, catIndex)
                    return [colIndex, catIndex, span, 1]
                }),
                [colIndex, -1, 1, rowCount - categories.length]
            ]
        })
        return Arrays.range(0, rowCount).map(rowIndex => colRow.map(cells => cells[rowIndex])) as ([number, number, number, number] | undefined)[][]
    }, [displayColumns])

    const unknownDataType = useUnknownDataType()
    const dataTypeMap = useMemo(() => iter(dataTypes ?? []).asMap((dataType: DataType<any>) => [dataType.name, dataType]).value, [dataTypes])
    const getDataType = useCallback((field: string) => {
        return dataTypeMap.get(field) ?? unknownDataType
    }, [dataTypeMap, unknownDataType])
    const realDisplayColumns = useRealDisplayColumns(displayColumns, !!columnResizingDraft || !!columnDraggingDraft)
    const cellWidthChange = useCallback((field: string, delta: number) => changeColumnWidth && changeColumnWidth([field], delta), [changeColumnWidth])
    const cellWidthDraft = useCallback((field: string, delta: number) => draftColumnWidth && draftColumnWidth([field], delta), [draftColumnWidth])
    const cellWidthDraftCancel = useCallback((field: string) => cancelColumnWidthDraft && cancelColumnWidthDraft([field]), [cancelColumnWidthDraft])
    const bandWidthChange = useCallback((fields: string[], delta: number) => changeColumnWidth && changeColumnWidth(fields, delta), [changeColumnWidth])
    const bandWidthDraft = useCallback((fields: string[], delta: number) => draftColumnWidth && draftColumnWidth(fields, delta), [draftColumnWidth])
    const bandWidthDraftCancel = useCallback((fields: string[]) => cancelColumnWidthDraft && cancelColumnWidthDraft(fields), [cancelColumnWidthDraft])
    const cellXAxisChange = useCallback((field: string, delta: number) => changeColumnOrder && changeColumnOrder([field], getDeltaOrder(realDisplayColumns, [field], delta)), [changeColumnOrder, realDisplayColumns])
    const cellXAxisDraft = useCallback((field: string, delta: number) => draftColumnOrder && draftColumnOrder([field], getDeltaOrder(realDisplayColumns, [field], delta)), [realDisplayColumns, draftColumnOrder])
    const cellXAxisDraftCancel = useCallback((field: string) => cancelColumnOrderDraft && cancelColumnOrderDraft([field]), [cancelColumnOrderDraft])
    const bandXAxisChange = useCallback((fields: string[], delta: number) => changeColumnOrder && changeColumnOrder(fields, getDeltaOrder(realDisplayColumns, fields, delta)), [changeColumnOrder, realDisplayColumns])
    const bandXAxisDraft = useCallback((fields: string[], delta: number) => draftColumnOrder && draftColumnOrder(fields, getDeltaOrder(realDisplayColumns, fields, delta)), [realDisplayColumns, draftColumnOrder])
    const bandXAxisDraftCancel = useCallback((fields: string[]) => cancelColumnOrderDraft && cancelColumnOrderDraft(fields), [cancelColumnOrderDraft])

    return <Plugin>
        <Head>
            {rowCol.map((cells, rowIndex) => {
                return <Row key={rowIndex}>
                    {cells.map(cell => {
                        if (!cell) return null
                        const [colIndex, catIndex, colSpan, rowSpan] = cell
                        if (catIndex >= 0) {
                            const columns = Arrays.range(colIndex, colSpan).map(index => displayColumns![index])
                            const dataTypes = columns.map(({ field }) => getDataType(field))
                            const title = columns[0].categories![catIndex], align = 'center'
                            const width = columns.map(c => c.width ?? 0).reduce((a, b) => a + b, 0)
                            const resizingEnabled = !!columnResizingEnabled && columns.map(({ field }) => (columnResizingExcludes?.indexOf(field) ?? -1) < 0).reduce((a, b) => a || b, false)
                            const draggingEnabled = !!columnDraggingEnabled && columns.map(({ field }) => (columnDraggingExcludes?.indexOf(field) ?? -1) < 0).reduce((a, b) => a && b, true)
                            return <Band key={columns[0].field} title={title} align={align} dataTypes={dataTypes} columns={columns}
                                addDragListener={addDragListener} removeDragListener={removeDragListener}
                                resizingEnabled={resizingEnabled} onWidthChange={bandWidthChange} onWidthDraft={bandWidthDraft} onWidthDraftCancel={bandWidthDraftCancel}
                                draggingEnabled={draggingEnabled} onXAxisChange={bandXAxisChange} onXAxisDraft={bandXAxisDraft} onXAxisDraftCancel={bandXAxisDraftCancel}
                                width={width} colSpan={colSpan} rowSpan={rowSpan} />
                        } else {
                            const column = displayColumns![colIndex]
                            const { field, title, width } = column, align = 'center'
                            const dataType = getDataType(field)
                            const resizingEnabled = !!columnResizingEnabled && (columnResizingExcludes?.indexOf(column.field) ?? -1) < 0
                            const draggingEnabled = !!columnDraggingEnabled && (columnDraggingExcludes?.indexOf(column.field) ?? -1) < 0
                            return <Cell key={field} title={title} align={align} frozen={undefined} dataType={dataType} column={column}
                                addDragListener={addDragListener} removeDragListener={removeDragListener}
                                resizingEnabled={resizingEnabled} onWidthChange={cellWidthChange} onWidthDraft={cellWidthDraft} onWidthDraftCancel={cellWidthDraftCancel}
                                draggingEnabled={draggingEnabled} onXAxisChange={cellXAxisChange} onXAxisDraft={cellXAxisDraft} onXAxisDraftCancel={cellXAxisDraftCancel}
                                width={width} colSpan={colSpan} rowSpan={rowSpan} />
                        }
                    })}
                </Row>
            })}
        </Head>
    </Plugin>
}

const useRealDisplayColumns = (displayColumns: Column[] | undefined, draft: boolean) => {
    const ref = useRef(displayColumns)
    draft || (ref.current = displayColumns)
    return ref.current
}

function getCategory(displayColumns: Column[] | undefined, colIndex: number, catIndex: number) {
    if (!displayColumns) return undefined

    const column = displayColumns[colIndex]
    if (!column) return undefined

    return column.categories ? column.categories[catIndex] : undefined
}

function getDeltaOrder(displayColumns: Column[] | undefined, fields: string[], deltaX: number) {
    if (!displayColumns || deltaX === 0) return 0

    let on = false, acc = 0, delta = 0
    if (deltaX > 0) {
        for (let i = 0; i < displayColumns.length; i++) {
            const { field, width = 0 } = displayColumns[i]
            if (fields.indexOf(field) >= 0) {
                on = true, acc = 0, delta = 0
            } else if (on) {
                acc += width, delta++
                deltaX <= acc && (on = false)
            }
        }
    } else {
        for (let i = displayColumns.length - 1; i >= 0; i--) {
            const { field, width = 0 } = displayColumns[i]
            if (fields.indexOf(field) >= 0) {
                on = true, acc = 0, delta = 0
            } else if (on) {
                acc -= width, delta--
                deltaX >= acc && (on = false)
            }
        }
    }
    return delta
}