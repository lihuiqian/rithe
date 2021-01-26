import React, { ReactElement, useEffect, useRef } from "react"
import { DragDropCoordinate, DragDropType, useDragDropObserver } from "./DragDropContext"

export interface DroppableProps {
    onEnter?: (coordinate: DragDropCoordinate, payload: any) => void,
    onOver?: (coordinate: DragDropCoordinate, payload: any) => void,
    onLeave?: (coordinate: DragDropCoordinate, payload: any) => void,
    onDrop?: (coordinate: DragDropCoordinate, payload: any) => void,
    children: ReactElement,
}

export const Droppable = (props: DroppableProps) => {
    const { onEnter, onOver, onLeave, onDrop, children } = props

    const dragDropObserver = useDragDropObserver()
    const ref = useRef<HTMLElement>()

    const overRef = useRef(false)

    // over
    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (!(element instanceof HTMLElement)) return
        const next = (type: DragDropType, coordinate: DragDropCoordinate, payload: any) => {
            const { top, bottom, left, right } = element.getBoundingClientRect()
            const { clientX, clientY } = coordinate
            const over = top <= clientY && clientY <= bottom && left <= clientX && clientX <= right
            if (type === 'drag' && over) {
                onOver && onOver(coordinate, payload)
            } else if (type === 'move') {
                if (!overRef.current && over) {
                    onEnter && onEnter(coordinate, payload)
                } else if (overRef.current && over) {
                    onOver && onOver(coordinate, payload)
                } else if (overRef.current && !over) {
                    onLeave && onLeave(coordinate, payload)
                }
            } else if (type === 'drop' && over) {
                onDrop && onDrop(coordinate, payload)
            }
            overRef.current = over
        }
        dragDropObserver.subscribe(next)
        return () => {
            dragDropObserver.unsubscribe(next)
        }
    }, [dragDropObserver, onDrop, onEnter, onLeave, onOver])

    return React.cloneElement(children, { ref: ref })
}