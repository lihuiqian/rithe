/* eslint-disable react/prop-types */
import React, { ReactElement, useEffect, useRef } from "react"
import { DragDropEvent, DragDropType, useDragDropObserver } from "./DragDropContext"

export interface DroppableProps {
    onEnter?: (event: DragDropEvent, payload: any) => void,
    onOver?: (event: DragDropEvent, payload: any) => void,
    onLeave?: (event: DragDropEvent, payload: any) => void,
    onDrop?: (event: DragDropEvent, payload: any) => void,
    children: ReactElement,
}

export const Droppable = React.forwardRef<HTMLElement, DroppableProps>((props, forwardRef) => {
    const { onEnter, onOver, onLeave, onDrop, children } = props

    const dragDropObserver = useDragDropObserver()
    const ref = useRef<HTMLElement | null>(null)

    const overRef = useRef(false)

    // over
    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (!(element instanceof HTMLElement)) return
        const next = (type: DragDropType, event: DragDropEvent, payload: any) => {
            const { top, bottom, left, right } = element.getBoundingClientRect()
            const { clientX, clientY } = event
            const over = top <= clientY && clientY <= bottom && left <= clientX && clientX <= right
            if (type === 'drag' && over) {
                onOver && onOver(event, payload)
            } else if (type === 'move') {
                if (!overRef.current && over) {
                    onEnter && onEnter(event, payload)
                } else if (overRef.current && over) {
                    onOver && onOver(event, payload)
                } else if (overRef.current && !over) {
                    onLeave && onLeave(event, payload)
                }
            } else if (type === 'drop' && over) {
                onDrop && onDrop(event, payload)
            }
            overRef.current = over
        }
        dragDropObserver.subscribe(next)
        return () => {
            dragDropObserver.unsubscribe(next)
        }
    }, [dragDropObserver, onDrop, onEnter, onLeave, onOver])

    return React.cloneElement(children, {
        ref: (instance: HTMLElement | null) => {
            ref.current = instance
            if (typeof forwardRef === 'function') {
                forwardRef(ref.current)
            } else if (forwardRef !== null) {
                forwardRef.current = ref.current
            }
        }
    })
})
Droppable.displayName = 'Droppable'