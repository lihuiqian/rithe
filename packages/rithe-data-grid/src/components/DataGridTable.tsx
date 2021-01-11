import { useAnimationThrottle } from "@rithe/utils";
import React, { CSSProperties, ReactNode, useCallback, useMemo, useRef } from "react";
import { useDrag } from "react-use-gesture";
import DragHandler from "../types/DragHandler";
import { useDataGridTheme } from "./DataGridTheme";

type DragHandlerMap = Map<EventTarget, { handler: DragHandler, options: { retainTarget: boolean, retainHandler: boolean } }>

export interface DataGridTableProps {
    dragHandlerMap: Map<EventTarget, { handler: DragHandler, options: { retainTarget: boolean, retainHandler: boolean } }>,
    children?: ReactNode | ReactNode[],
}

export const DataGridTable = ({ dragHandlerMap, children }: DataGridTableProps) => {
    const bind = useDragBind(dragHandlerMap)

    const style = useMemo<CSSProperties>(() => ({ borderCollapse: 'collapse' }), [])
    const { tableComponent: Table } = useDataGridTheme()
    return <Table {...bind()} style={style}>{children}</Table>
}

const useDragBind = (dragHandlers: Map<EventTarget, { handler: DragHandler, options: { retainTarget: boolean, retainHandler: boolean } }>) => {
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