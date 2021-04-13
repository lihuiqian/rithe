import { Plugin } from "@rithe/plugin";
import { Records, useMixed } from "@rithe/utils";
import React, { ComponentType, RefObject, useCallback, useRef, useState } from "react";
import { DataGridColumnResizingDraggable, DataGridColumnResizingDraggableProps } from "../components/columnResizing/DataGridColumnResizingDraggable";
import { DataGridColumnResizingDroppable, DataGridColumnResizingDroppableProps } from "../components/columnResizing/DataGridColumnResizingDroppable";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { isHeaderCell } from "../utils/helpers";
import { updateTableColumn } from "../utils/updateTableColumn";

interface ColumnSetting {
    disableUserControl?: boolean
    minWidth?: number,
    maxWidth?: number,
}

export interface ColumnResizingProps {
    size?: Record<string, number>,
    onSizeChange?: (size: Record<string, number>) => void,
    defaultSize?: Record<string, number>,
    minWidth?: number,
    maxWidth?: number,
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    Draggable?: ComponentType<DataGridColumnResizingDraggableProps>,
    Droppable?: ComponentType<DataGridColumnResizingDroppableProps>,
}

export const ColumnResizing = (props: ColumnResizingProps) => {
    const {
        minWidth = 0,
        maxWidth = Number.MAX_SAFE_INTEGER,
        disableUserControl = false,
        Draggable = DataGridColumnResizingDraggable,
        Droppable = DataGridColumnResizingDroppable,
    } = props
    const [size, setSize] = useMixed(props.size, props.onSizeChange, props.defaultSize, {})
    const [draftSize, setDraftSize] = useState<Record<string, number> | undefined>()
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})
    const [draggingFields, setDraggingFields] = useState<string[] | undefined>()

    // State tableColumns
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        const currentSize = draftSize ?? size
        if (Records.size(currentSize) === 0) return tableColumns
        const result = tableColumns.map(tableColumn => {
            const width = currentSize[tableColumn.field]
            if (width === undefined) return tableColumn
            return updateTableColumn(tableColumn, {
                width,
            }, tableColumnsCacheRef.current)
        })
        return result
    }, [draftSize, size])

    // Template Draggable    
    const draggableTemplate = useCallback((templateProps: { ref?: RefObject<any> }) => {
        const dragEnabled = (fields: string[]) => !disableUserControl && fields.map(field => size[field] !== undefined && !columnSettings[field]?.disableUserControl).reduce((a, b) => a && b, true)
        const dragStart = (fields: string[]) => {
            setDraftSize(size)
            setDraggingFields(fields)
        }
        const dragEnd = () => {
            setDraftSize(undefined)
            setDraggingFields(undefined)
        }
        return <Draggable
            ref={templateProps.ref}
            dragEnabled={dragEnabled}
            dragStart={dragStart}
            dragEnd={dragEnd}
        >
            <Render />
        </Draggable>
    }, [Draggable, columnSettings, disableUserControl, size])

    // Template table
    const droppableTemplate = useCallback((templateProps: { ref?: RefObject<any> }, tableColumns: TableColumn[] = []) => {
        const enabled = draggingFields !== undefined
        const widthRecord = Records.from(tableColumns.map(({ field, width }) => [field, size[field] ?? width]))
        const calculateSize = (fields: string[], deltaWidth: number) => {
            const prevWidth = fields.map(field => widthRecord[field] ?? 0).reduce((a, b) => a + b, 0)
            const currWidth = Math.max(0, prevWidth + deltaWidth)
            const fastScale = currWidth / prevWidth
            let prevFixedWidth = 0, currFixedWidth = 0
            for (const field of fields) {
                const prevWidth = widthRecord[field] ?? 0
                const currWidth = prevWidth * fastScale
                const currMinWidth = columnSettings[field]?.minWidth ?? minWidth
                const currMaxWidth = columnSettings[field]?.maxWidth ?? maxWidth
                if (currWidth < currMinWidth) {
                    prevFixedWidth += prevWidth
                    currFixedWidth += currMinWidth
                } else if (currWidth > currMaxWidth) {
                    prevFixedWidth += prevWidth
                    currFixedWidth += currMaxWidth
                }
            }
            const scale = (currWidth - currFixedWidth) / (prevWidth - prevFixedWidth)
            return Records.concat(size, Records.from(fields.map(field => {
                const prevWidth = widthRecord[field] ?? 0
                const currWidth = prevWidth * scale
                const currMinWidth = columnSettings[field]?.minWidth ?? minWidth
                const currMaxWidth = columnSettings[field]?.maxWidth ?? maxWidth
                return [field, Math.max(currMinWidth, Math.min(currMaxWidth, currWidth))]
            })))
        }
        const onDraft = (offset: number) => enabled && setDraftSize(calculateSize(draggingFields!, offset))
        const onCommit = (offset: number) => enabled && setSize(calculateSize(draggingFields!, offset))
        const onCancel = () => enabled && setDraftSize(size)

        return <Droppable
            ref={templateProps.ref}
            onDraft={onDraft}
            onCommit={onCommit}
            onCancel={onCancel}
        >
            <Render />
        </Droppable>
    }, [Droppable, columnSettings, draggingFields, maxWidth, minWidth, setSize, size])

    // Template Resizable Cell
    const isCellResizable = useCallback((props: CellProps) => isHeaderCell(props)
        && !disableUserControl
        && props.tableColumns.map(({ field }) => size[field] !== undefined && !columnSettings[field]?.disableUserControl).reduce((a, b) => a && b, true)
        , [columnSettings, disableUserControl, size])
    const resizableCell = useCallback(() => {
        return <Render override="cell" props={{
            resizable: true
        }} />
    }, [])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="table">
            {draggableTemplate}
        </Template>
        <Template name="table" stateNames={['tableColumns']}>
            {droppableTemplate}
        </Template>
        <Template name="cell" predicate={isCellResizable}>
            {resizableCell}
        </Template>
    </Plugin>
}