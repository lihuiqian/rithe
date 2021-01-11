import { Plugin } from "@rithe/plugin";
import { useAnimationThrottle, useMeasure } from "@rithe/utils";
import React, { ReactNode, useCallback, useRef } from "react";
import { useDrag } from 'react-use-gesture';
import { useDataGridTheme } from "../components/DataGridTheme";
import { ColumnWidthAdjustment } from "../plugins/ColumnWidthAdjustment";
import { StatePipe } from "../StatePipe";
import DragHandler from "../types/DragHandler";

type DragHandlerMap = Map<EventTarget, { handler: DragHandler, options: { retainTarget: boolean, retainHandler: boolean } }>
type AddDragListener = (target: EventTarget, eventHandler: DragHandler, options?: { retainTarget?: boolean, retainHandler?: boolean }) => void
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
    const addDragListener = useCallback<AddDragListener>((target, eventHandler, options) => {
        ref.current.set(target, { handler: eventHandler, options: { retainTarget: options?.retainHandler ?? false, retainHandler: options?.retainHandler ?? false } })
    }, [])
    const removeDragListener = useCallback<RemoveDragListener>(target => {
        ref.current.delete(target)
    }, [])
    return [ref.current, addDragListener, removeDragListener] as [DragHandlerMap, AddDragListener, RemoveDragListener]
}

const useDragBind = (dragHandlers: DragHandlerMap) => {
    const initialRef = useRef<{ element: HTMLElement, handler: DragHandler, options: { retainTarget: boolean, retainHandler: boolean }, rect: DOMRect } | null>(null)
    const handler = useCallback((state: Omit<Parameters<DragHandler>[0], 'initialRect'>) => {
        const { down, first, event } = state
        if (first) {
            const eventTarget = findEventTarget(event, dragHandlers)
            if (eventTarget) {
                const { handler, options } = dragHandlers.get(eventTarget)!
                initialRef.current = { element: eventTarget, handler, options, rect: eventTarget.getBoundingClientRect() }
            }
        }
        const initial = initialRef.current
        if (initial) {
            const eventTarget = initial.options.retainTarget ? initial.element : findEventTarget(event, dragHandlers)
            const handler = initial.options.retainHandler ? initial.handler : eventTarget ? dragHandlers.get(eventTarget)?.handler : undefined
            handler && handler({ ...state, initialRect: initial.rect })
        }
        if (!down) {
            initialRef.current = null
        }
    }, [dragHandlers])
    const throttledHandler = useAnimationThrottle(handler)
    return useDrag(throttledHandler)
}

function findEventTarget(event: React.PointerEvent<Element> | PointerEvent, dragHandlers: DragHandlerMap) {
    const { target: inner, currentTarget: outer } = event
    let target = inner as HTMLElement | null
    while (target !== null && target !== outer && !dragHandlers.has(target)) {
        target = target.parentElement
    }
    return target
}

export { TableLayoutProps, TableLayout };

