/* eslint-disable react/prop-types */
import React, { ReactElement, useEffect, useRef } from "react"
import useShallow from "../../hooks/useShallow"
import { DragDropEvent, useDragDropObserver } from "./DragDropContext"

export interface DraggableProps {
    payload: any,
    deadzone?: number,
    onStart?: (event: DragDropEvent) => void,
    onMove?: (event: DragDropEvent) => void,
    onEnd?: (event: DragDropEvent) => void,
    children: ReactElement,
}

export const Draggable = React.forwardRef<HTMLElement, DraggableProps>((props, forwardRef) => {
    const { deadzone = 5, onStart, onMove, onEnd, children } = props
    const payload = useShallow(props.payload)

    const dragDropObserver = useDragDropObserver()
    const ref = useRef<HTMLElement | null>(null)

    const downRef = useRef<[number, number] | null>(null)
    const targetRef = useRef<EventTarget | null>(null)
    const rectRef = useRef<DOMRect | null>(null)
    const draggingRef = useRef(false)

    // start
    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (!(element instanceof HTMLElement)) return
        const listener = (e: MouseEvent | TouchEvent) => {
            const event = createEvent(e)
            if (deadzone === 0) {
                dragDropObserver.start(event, payload)
                onStart && onStart(event)
                draggingRef.current = true
            }
            downRef.current = [event.clientX, event.clientY]
            targetRef.current = e.target
            rectRef.current = event.sourceRect
        }
        const mouseListener = (e: MouseEvent) => listener(e)
        const touchListener = (e: TouchEvent) => listener(e)
        element.addEventListener('mousedown', mouseListener, { passive: true })
        element.addEventListener('touchstart', touchListener, { passive: true })
        return () => {
            element.removeEventListener('mousedown', mouseListener)
            element.removeEventListener('touchstart', touchListener)
        }
    }, [deadzone, dragDropObserver, onStart, payload])

    // move
    useEffect(() => {
        const listener = (e: MouseEvent | TouchEvent) => {
            if (!downRef.current || !rectRef.current) return
            window.getSelection()?.empty()
            const event = createEvent(e, downRef.current, targetRef.current, rectRef.current)
            if (!draggingRef.current) {
                if (Math.pow(event.deltaX, 2) + Math.pow(event.deltaY, 2) > Math.pow(deadzone, 2)) {
                    dragDropObserver.start(event, payload)
                    onStart && onStart(event)
                    draggingRef.current = true
                }
            } else {
                dragDropObserver.move(event)
                onMove && onMove(event)
            }
        }
        const mouseListener = (e: MouseEvent) => listener(e)
        const touchListener = (e: TouchEvent) => listener(e)
        window.addEventListener('mousemove', mouseListener, { passive: true })
        window.addEventListener('touchmove', touchListener, { passive: true })

        return () => {
            window.removeEventListener('mousemove', mouseListener)
            window.removeEventListener('touchmove', touchListener)
        }
    }, [deadzone, dragDropObserver, onMove, onStart, payload])

    // end
    useEffect(() => {
        const listener = (e: MouseEvent | TouchEvent) => {
            if (!downRef.current || !rectRef.current) return
            if (draggingRef.current) {
                const event = createEvent(e, downRef.current, targetRef.current, rectRef.current)
                dragDropObserver.end(event)
                onEnd && onEnd(event)
                draggingRef.current = false
            }
            downRef.current = null
            rectRef.current = null
        }
        const mouseListener = (e: MouseEvent) => listener(e)
        const touchListener = (e: TouchEvent) => listener(e)
        window.addEventListener('mouseup', mouseListener, { passive: true })
        window.addEventListener('touchend', touchListener, { passive: true })
        window.addEventListener('touchcancel', touchListener, { passive: true })

        return () => {
            window.removeEventListener('mouseup', mouseListener)
            window.removeEventListener('touchend', touchListener)
            window.removeEventListener('touchcancel', touchListener)
        }
    }, [dragDropObserver, onEnd])

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
Draggable.displayName = 'Draggable'

function createEvent(e: MouseEvent | TouchEvent): DragDropEvent
function createEvent(e: MouseEvent | TouchEvent, initClient: [number, number], source: EventTarget | null, rect: DOMRect): DragDropEvent
function createEvent(e: MouseEvent | TouchEvent, initClient?: [number, number], source?: EventTarget | null, rect?: DOMRect): DragDropEvent {
    const { clientX, clientY, pageX, pageY, screenX, screenY } = (e as TouchEvent).touches ? (e as TouchEvent).targetTouches[0] : e as MouseEvent
    const { altKey, ctrlKey, metaKey, shiftKey } = e
    const deltaX = initClient ? clientX - initClient[0] : 0
    const deltaY = initClient ? clientY - initClient[1] : 0
    const sourceTarget = source ?? null
    const sourceRect = rect ?? (e.currentTarget as HTMLElement).getBoundingClientRect()
    return {
        clientX, clientY,
        pageX, pageY,
        screenX, screenY,
        deltaX, deltaY,
        altKey, ctrlKey, metaKey, shiftKey,
        target: e.target,
        sourceTarget,
        sourceRect,
    }
}