import { Plugin } from "@rithe/plugin";
import { useAnimationThrottle, useMeasure } from "@rithe/utils";
import React, { ReactNode, useCallback, useRef } from "react";
import { useDrag } from 'react-use-gesture';
import { useDataGridTheme } from "../components/DataGridTheme";
import { ColumnWidthAdjustment } from "../plugins/ColumnWidthAdjustment";
import { StatePipe } from "../StatePipe";
import DragHandler from "../types/DragHandler";

type DragHandlerMap = Map<EventTarget, DragHandler>
type AddDragListener = (target: EventTarget, eventHandler: DragHandler) => void
type RemoveDragListener = (target: EventTarget) => void

interface TableLayoutProps {
    children: ReactNode | ReactNode[],
}

const TableLayout = ({ children }: TableLayoutProps) => {
    const { tableComponent: Table } = useDataGridTheme()

    const [dragHandlers, addDragListener, removeDragListener] = useDragHandlers()
    const bind = useDragBind(dragHandlers)
    const [measureRef, rect] = useMeasure<HTMLDivElement>()
    return <Plugin>
        <ColumnWidthAdjustment tableWidth={rect?.width} />
        <StatePipe name="addDragListener" value={addDragListener} />
        <StatePipe name="removeDragListener" value={removeDragListener} />
        <div ref={measureRef}>
            <Table {...bind()}>
                {children}
            </Table>
        </div>
    </Plugin>
}

const useDragHandlers = () => {
    const ref = useRef<DragHandlerMap>(new Map())
    const addDragListener = useCallback<AddDragListener>((target, eventHandler) => {
        ref.current.set(target, eventHandler)
    }, [])
    const removeDragListener = useCallback<RemoveDragListener>(target => {
        ref.current.delete(target)
    }, [])
    return [ref.current, addDragListener, removeDragListener] as [DragHandlerMap, AddDragListener, RemoveDragListener]
}

const useDragBind = (dragHandlers: DragHandlerMap) => {
    const targetRef = useRef<{ element: HTMLElement, initialRect: DOMRect } | null>(null)
    const handler = useCallback((state: Omit<Parameters<DragHandler>[0], 'initialRect'>) => {
        const { down, first, event } = state
        if (first) {
            const { target: inner, currentTarget: outer } = event
            let target = inner as HTMLElement | null
            while (target !== null && target !== outer && !dragHandlers.has(target)) {
                target = target.parentElement
            }
            target && (targetRef.current = { element: target, initialRect: target?.getBoundingClientRect() })
        }
        const target = targetRef.current
        if (target) {
            const handler = dragHandlers.get(target.element)
            handler && handler({ ...state, initialRect: target.initialRect })
        }
        if (!down) {
            targetRef.current = null
        }
    }, [dragHandlers])
    const throttledHandler = useAnimationThrottle(handler)
    return useDrag(throttledHandler)
}

export { TableLayoutProps, TableLayout };

