import { Plugin } from "@rithe/plugin";
import { Arrays, Comparators, iter, Records, useMixed } from "@rithe/utils";
import React, { ComponentType, RefObject, useCallback, useState } from "react";
import { DataGridColumnOrderingDraggable, DataGridColumnOrderingDraggableProps } from "../components/columnOrdering/DataGridColumnOrderingDraggable";
import { DataGridColumnOrderingDroppable, DataGridColumnOrderingDroppableProps } from "../components/columnOrdering/DataGridColumnOrderingDroppable";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { RowId } from "../types/RowId";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";

interface ColumnSetting {
    disableUserControl?: boolean,
}

export interface ColumnOrderingProps {
    order?: string[],
    onOrderChange?: (order: string[]) => void,
    defaultOrder?: string[],
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    Droppable?: ComponentType<DataGridColumnOrderingDroppableProps>,
    Draggable?: ComponentType<DataGridColumnOrderingDraggableProps>,
}

export const ColumnOrdering = (props: ColumnOrderingProps) => {
    const {
        disableUserControl = false,
        Droppable = DataGridColumnOrderingDroppable,
        Draggable = DataGridColumnOrderingDraggable,
    } = props
    const [order, setOrder] = useMixed(props.order, props.onOrderChange, props.defaultOrder, [])
    const [draftOrder, setDraftOrder] = useState<string[] | undefined>()
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})
    const [draggingFields, setDraggingFields] = useState<string[] | undefined>()
    const [draggingRect, setDraggingRect] = useState<DOMRect | undefined>()

    // State tableColumns
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        const currentOrder = draftOrder ?? order
        if (currentOrder.length === 0) return tableColumns
        return Arrays.sort(tableColumns, Comparators.compare(tc => currentOrder.indexOf(tc.field), Comparators.natualOrder()))
    }, [draftOrder, order])

    // Template Draggable
    const draggableTemplate = useCallback((templateProps: { ref?: RefObject<any> }, tableColumns: TableColumn[] = [], tableHeaderRows: TableRow[] = []) => {
        const dragEnabled = (fields: string[]) => !disableUserControl && fields.map(field => order.indexOf(field) >= 0 && !columnSettings[field]?.disableUserControl).reduce((a, b) => a && b, true)
        const dragTitle = (fields: string[], rowIds: RowId[]) => {
            const column = tableColumns.find(({ field }) => field === fields[0])?.column
            const rowIndex = tableHeaderRows.findIndex(({ rowId }) => rowId === rowIds[0])
            if (!column) return ''
            return (column.categories ?? [])[rowIndex]?.value ?? column.title
        }
        const dragStart = (fields: string[], rect: DOMRect) => {
            setDraftOrder(order)
            setDraggingFields(fields)
            setDraggingRect(rect)
        }
        const dragEnd = () => {
            setDraftOrder(undefined)
            setDraggingFields(undefined)
            setDraggingRect(undefined)
        }
        return <Draggable
            ref={templateProps.ref}
            dragEnabled={dragEnabled}
            dragTitle={dragTitle}
            dragStart={dragStart}
            dragEnd={dragEnd}
        >
            <Render />
        </Draggable>
    }, [Draggable, columnSettings, disableUserControl, order])

    // Template Droppable
    const droppableTemplate = useCallback((templateProps: { ref?: RefObject<any> }, tableColumns: TableColumn[] = []) => {
        const enabled = draggingRect !== undefined && draggingFields !== undefined
        const dragOffset = enabled ? generateDragOffset(tableColumns, draggingRect!, draggingFields!, order) : (() => 0)
        const onDraft = (offset: number) => enabled && setDraftOrder(calculateOrder(draggingFields!, order, offset))
        const onCommit = (offset: number) => enabled && setOrder(calculateOrder(draggingFields!, order, offset))
        const onCancel = () => enabled && setDraftOrder(order)
        return <Droppable
            ref={templateProps.ref}
            dragOffset={dragOffset}
            onDraft={onDraft}
            onCommit={onCommit}
            onCancel={onCancel}
        >
            <Render />
        </Droppable>
    }, [Droppable, draggingFields, draggingRect, order, setOrder])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="table" stateNames={['tableColumns', 'tableHeaderRows']}>
            {draggableTemplate}
        </Template>
        <Template name="table" stateNames={['tableColumns']}>
            {droppableTemplate}
        </Template>
    </Plugin>
}

function generateDragOffset(tableColumns: TableColumn[], draggingRect: DOMRect, draggingFields: string[], order: string[]) {
    const { left, right } = draggingRect
    const widthRecord = Records.from(tableColumns.map(({ field, width }) => [field, width]))
    const indexes = draggingFields.map(field => order.indexOf(field)).sort()
    const leftIndex = indexes[0], rightIndex = indexes[indexes.length - 1]
    const leftPoints = iter(order.slice(0, leftIndex))
        .reverse()
        .map(field => widthRecord[field] ?? 0)
        .scan((acc, value) => acc - value, 0)
        .value
    leftPoints.length > 0 && leftPoints.splice(leftPoints.length - 1, 1, Number.MIN_SAFE_INTEGER)
    const rightPoints = iter(order.slice(rightIndex + 1))
        .map(field => widthRecord[field] ?? 0)
        .scan((acc, value) => acc + value, 0)
        .value
    rightPoints.length > 0 && rightPoints.splice(rightPoints.length - 1, 1, Number.MAX_SAFE_INTEGER)
    return (clientX: number) => {
        const offsetX = clientX < left ? clientX - left : clientX > right ? clientX - right : 0
        if (offsetX < 0) {
            return -leftPoints.findIndex(point => offsetX >= point) - 1
        } else if (offsetX > 0) {
            return rightPoints.findIndex(point => offsetX <= point) + 1
        } else {
            return 0
        }
    }
}

function calculateOrder(draggingFields: string[], order: string[], offset: number) {
    if (draggingFields.length === 0 || offset === 0) return order
    const result = order.slice()
    const comparator = offset > 0 ? Comparators.reverse(Comparators.explicit(...order)) : Comparators.explicit(...order)
    Arrays.sort(draggingFields, comparator)
        .forEach(draggingField => {
            const index = result.indexOf(draggingField)
            result.splice(index, 1)
            result.splice(index + offset, 0, draggingField)
        })
    return result
}