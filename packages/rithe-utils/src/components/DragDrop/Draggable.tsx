import React, { ReactElement, useEffect, useRef } from "react"
import useShallow from "../../hooks/useShallow"
import { DragDropCoordinate, useDragDropObserver } from "./DragDropContext"

export interface DraggableProps {
    payload: any,
    onStart?: (coordinate: DragDropCoordinate) => void,
    onMove?: (coordinate: DragDropCoordinate) => void,
    onEnd?: (coordinate: DragDropCoordinate) => void,
    children: ReactElement,
}

export const Draggable = (props: DraggableProps) => {
    const { onStart, onMove, onEnd, children } = props
    const payload = useShallow(props.payload)

    const dragDropObserver = useDragDropObserver()
    const ref = useRef<HTMLElement>()

    const draggingRef = useRef(false)

    // start
    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (!(element instanceof HTMLElement)) return
        const mouseListener = (e: MouseEvent) => {
            const { clientX, clientY, pageX, pageY, screenX, screenY } = e
            dragDropObserver.start({ clientX, clientY, pageX, pageY, screenX, screenY }, payload)
            onStart && onStart({ clientX, clientY, pageX, pageY, screenX, screenY })
            draggingRef.current = true
        }
        const touchListener = (e: TouchEvent) => {
            const { clientX, clientY, pageX, pageY, screenX, screenY } = e.touches[0]
            dragDropObserver.start({ clientX, clientY, pageX, pageY, screenX, screenY }, payload)
            onStart && onStart({ clientX, clientY, pageX, pageY, screenX, screenY })
            draggingRef.current = true
        }
        element.addEventListener('mousedown', mouseListener, { passive: true })
        element.addEventListener('touchstart', touchListener, { passive: true })
        return () => {
            element.removeEventListener('mousedown', mouseListener)
            element.removeEventListener('touchstart', touchListener)
        }
    }, [dragDropObserver, onStart, payload])

    // move
    useEffect(() => {
        const mouseListener = (e: MouseEvent) => {
            if (!draggingRef.current) return
            const { clientX, clientY, pageX, pageY, screenX, screenY } = e
            dragDropObserver.move({ clientX, clientY, pageX, pageY, screenX, screenY })
            onMove && onMove({ clientX, clientY, pageX, pageY, screenX, screenY })
        }
        const touchListener = (e: TouchEvent) => {
            if (!draggingRef.current) return
            const { clientX, clientY, pageX, pageY, screenX, screenY } = e.touches[0]
            dragDropObserver.move({ clientX, clientY, pageX, pageY, screenX, screenY })
            onMove && onMove({ clientX, clientY, pageX, pageY, screenX, screenY })
        }
        window.addEventListener('mousemove', mouseListener, { passive: true })
        window.addEventListener('touchmove', touchListener, { passive: true })

        return () => {
            window.removeEventListener('mousemove', mouseListener)
            window.removeEventListener('touchmove', touchListener)
        }
    }, [dragDropObserver, onMove])

    // end
    useEffect(() => {
        const mouseListener = (e: MouseEvent) => {
            if (!draggingRef.current) return
            const { clientX, clientY, pageX, pageY, screenX, screenY } = e
            dragDropObserver.end({ clientX, clientY, pageX, pageY, screenX, screenY })
            onEnd && onEnd({ clientX, clientY, pageX, pageY, screenX, screenY })
            draggingRef.current = false
        }
        const touchListener = (e: TouchEvent) => {
            if (!draggingRef.current) return
            const { clientX, clientY, pageX, pageY, screenX, screenY } = e.touches[0]
            dragDropObserver.end({ clientX, clientY, pageX, pageY, screenX, screenY })
            onEnd && onEnd({ clientX, clientY, pageX, pageY, screenX, screenY })
            draggingRef.current = false
        }
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