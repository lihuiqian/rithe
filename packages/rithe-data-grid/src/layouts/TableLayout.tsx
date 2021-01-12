import { Plugin } from "@rithe/plugin";
import { useMeasure } from "@rithe/utils";
import React, { ComponentType, ReactNode, useCallback, useRef } from "react";
import { DataGridTable, DataGridTableProps } from "../components/DataGridTable";
import { ColumnWidthAdjustment } from "../plugins/ColumnWidthAdjustment";
import { StatePipe } from "../StatePipe";
import BindOptions from "../types/BindOptions";
import DragState from "../types/DragState";

type DragHandlerMap = Map<EventTarget, { handler: (state: DragState) => void, options: BindOptions }>
type AddDragListener = (target: EventTarget, eventHandler: (state: DragState) => void, options?: Partial<BindOptions>) => void
type RemoveDragListener = (target: EventTarget) => void
interface TableLayoutProps {
    tableComponent?: ComponentType<DataGridTableProps>,
    children: ReactNode | ReactNode[],
}

const TableLayout = ({
    tableComponent: Table = DataGridTable,
    children
}: TableLayoutProps) => {
    const [dragHandlerMap, addDragListener, removeDragListener] = useDragHandlers()
    const [measureRef, rect] = useMeasure<HTMLDivElement>()
    return <Plugin>
        <ColumnWidthAdjustment tableWidth={rect?.width} />
        <StatePipe name="addDragListener" value={addDragListener} />
        <StatePipe name="removeDragListener" value={removeDragListener} />
        <div ref={measureRef}>
            <Table dragHandlerMap={dragHandlerMap}>
                {children}
            </Table>
        </div>
    </Plugin>
}

const useDragHandlers = () => {
    const ref = useRef<DragHandlerMap>(new Map())
    const addDragListener = useCallback<AddDragListener>((target, eventHandler, options) => {
        ref.current.set(target, { handler: eventHandler, options: { retainTarget: options?.retainHandler ?? false, retainHandler: options?.retainHandler ?? false } })
    }, [])
    const removeDragListener = useCallback<RemoveDragListener>(target => {
        ref.current.delete(target)
    }, [])
    return [ref.current, addDragListener, removeDragListener] as [DragHandlerMap, AddDragListener, RemoveDragListener]
}

export { TableLayoutProps, TableLayout };

