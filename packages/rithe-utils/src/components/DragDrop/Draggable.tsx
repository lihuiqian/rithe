import React, { ReactElement, useEffect, useRef } from "react"
import useShallow from "../../hooks/useShallow"
import { DragDropCoordinate, useDragDropObserver } from "./DragDropContext"

export interface DraggableProps {
    payload: any,
    deadzone?: number,
    onStart?: (coordinate: DragDropCoordinate) => void,
    onMove?: (coordinate: DragDropCoordinate) => void,
    onEnd?: (coordinate: DragDropCoordinate) => void,
    children: ReactElement,
}

export const Draggable = (props: DraggableProps) => {
    const { deadzone = 5, onStart, onMove, onEnd, children } = props
    const payload = useShallow(props.payload)

    const dragDropObserver = useDragDropObserver()
    const ref = useRef<HTMLElement>()

    const downRef = useRef<[number, number] | null>(null)
    const draggingRef = useRef(false)

    // start
    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (!(element instanceof HTMLElement)) return
        const listener = ({ clientX, clientY, pageX, pageY, screenX, screenY }: DragDropCoordinate) => {
            if (deadzone === 0) {
                dragDropObserver.start({ clientX, clientY, pageX, pageY, screenX, screenY }, payload)
                onStart && onStart({ clientX, clientY, pageX, pageY, screenX, screenY })
                draggingRef.current = true
            }
            downRef.current = [clientX, clientY]
        }
        const mouseListener = (e: MouseEvent) => listener(e)
        const touchListener = (e: TouchEvent) => listener(e.touches[0])
        element.addEventListener('mousedown', mouseListener, { passive: true })
        element.addEventListener('touchstart', touchListener, { passive: true })
        return () => {
            element.removeEventListener('mousedown', mouseListener)
            element.removeEventListener('touchstart', touchListener)
        }
    }, [deadzone, dragDropObserver, onStart, payload])

    // move
    useEffect(() => {
        const listener = ({ clientX, clientY, pageX, pageY, screenX, screenY }: DragDropCoordinate) => {
            if (!downRef.current) return
            window.getSelection()?.empty()
            if (!draggingRef.current) {
                if (Math.pow(clientX - downRef.current[0], 2) + Math.pow(clientY - downRef.current[1], 2) > Math.pow(deadzone, 2)) {
                    dragDropObserver.start({ clientX, clientY, pageX, pageY, screenX, screenY }, payload)
                    onStart && onStart({ clientX, clientY, pageX, pageY, screenX, screenY })
                    draggingRef.current = true
                }
            } else {
                dragDropObserver.move({ clientX, clientY, pageX, pageY, screenX, screenY })
                onMove && onMove({ clientX, clientY, pageX, pageY, screenX, screenY })
            }
        }
        const mouseListener = (e: MouseEvent) => listener(e)
        const touchListener = (e: TouchEvent) => listener(e.touches[0])
        window.addEventListener('mousemove', mouseListener, { passive: true })
        window.addEventListener('touchmove', touchListener, { passive: true })

        return () => {
            window.removeEventListener('mousemove', mouseListener)
            window.removeEventListener('touchmove', touchListener)
        }
    }, [deadzone, dragDropObserver, onMove, onStart, payload])

    // end
    useEffect(() => {
        const listener = ({ clientX, clientY, pageX, pageY, screenX, screenY }: DragDropCoordinate) => {
            if (!draggingRef.current) return
            dragDropObserver.end({ clientX, clientY, pageX, pageY, screenX, screenY })
            onEnd && onEnd({ clientX, clientY, pageX, pageY, screenX, screenY })
            draggingRef.current = false
            downRef.current = null
        }
        const mouseListener = (e: MouseEvent) => listener(e)
        const touchListener = (e: TouchEvent) => listener(e.touches[0])
        window.addEventListener('mouseup', mouseListener, { passive: true })
        window.addEventListener('touchend', touchListener, { passive: true })
        window.addEventListener('touchcancel', touchListener, { passive: true })

        return () => {
            window.removeEventListener('mouseup', mouseListener)
            window.removeEventListener('touchend', touchListener)
            window.removeEventListener('touchcancel', touchListener)
        }
    }, [dragDropObserver, onEnd])

    return React.cloneElement(children, { ref: ref })
}