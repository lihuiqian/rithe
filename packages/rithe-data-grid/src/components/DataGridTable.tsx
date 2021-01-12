import { useAnimationThrottle } from "@rithe/utils";
import React, { CSSProperties, ReactNode, useCallback, useMemo, useRef } from "react";
import { useGesture } from "react-use-gesture";
import BindOptions from "../types/BindOptions";
import DragState from "../types/DragState";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableProps {
    dragHandlerMap: Map<EventTarget, { handler: (state: DragState) => void, options: BindOptions }>,
    children?: ReactNode | ReactNode[],
}

export const DataGridTable = ({ dragHandlerMap, children }: DataGridTableProps) => {
    const bind = useBind(dragHandlerMap)

    const style = useMemo<CSSProperties>(() => ({ borderCollapse: 'collapse' }), [])
    const { tableComponent: Table } = useDataGridTheme()
    return <Table {...bind()} style={style}>{children}</Table>
}

const useBind = (dragHandlerMap: Map<EventTarget, { handler: (state: DragState) => void, options: BindOptions }>) => {
    const dragHandler = useDragHandler(dragHandlerMap)
    return useGesture({
        onDrag: dragHandler,
    })
}

const useDragHandler = (dragHandlerMap: Map<EventTarget, { handler: (state: DragState) => void, options: BindOptions }>) => {
    const initialRef = useRef<{ target: HTMLElement, handler: (state: DragState) => void, options: BindOptions, rect: DOMRect } | null>(null)
    const dragHandler = useCallback((state: Omit<DragState, 'rect' | 'initialRect'>) => {
        const { down, first, event } = state
        if (first) {
            const eventTarget = findEventTarget(event, dragHandlerMap)
            if (eventTarget) {
                const { handler, options } = dragHandlerMap.get(eventTarget)!
                initialRef.current = { target: eventTarget, handler, options, rect: eventTarget.getBoundingClientRect() }
            }
        }
        const initial = initialRef.current
        if (initial) {
            const { target, handler, options, rect } = initial
            const currentTarget = options.retainTarget ? target : findEventTarget(event, dragHandlerMap)
            const currentHandler = options.retainHandler ? handler : dragHandlerMap.get(currentTarget!)?.handler
            currentHandler && currentHandler({ ...state, rect: currentTarget?.getBoundingClientRect(), initialRect: rect })
        }
        if (!down) {
            initialRef.current = null
        }
    }, [dragHandlerMap])
    return useAnimationThrottle(dragHandler)
}

function findEventTarget(event: React.PointerEvent<Element> | PointerEvent, handlerMap: Map<EventTarget, unknown>) {
    const { target: inner, currentTarget: outer } = event
    let target = inner as HTMLElement | null
    while (target !== null && target !== outer && !handlerMap.has(target)) {
        target = target.parentElement
    }
    return target
}