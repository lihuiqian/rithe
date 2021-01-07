import { useCallback, useLayoutEffect, useRef, useState } from "react"

function useMeasure<T extends Element>() {
    const elementRef = useRef<T | null>(null)
    const [rect, setRect] = useState<DOMRect | null>(null)

    const handleRef = useRef<number>(0)
    const measure = useCallback(() => {
        if (!elementRef.current) return

        handleRef.current || (handleRef.current = requestAnimationFrame(() => {
            setRect(elementRef.current?.getBoundingClientRect() || null)
            handleRef.current = 0
        }))

        return () => cancelAnimationFrame(handleRef.current)
    }, [])

    useLayoutEffect(() => {
        let cancelMeasure: (() => void) | undefined = undefined
        const resizeObserver = new ResizeObserver(() => cancelMeasure = measure())
        elementRef.current && (resizeObserver.observe(elementRef.current))

        return () => {
            resizeObserver.disconnect()
            cancelMeasure && cancelMeasure()
        }
    }, [measure])
    return [elementRef, rect, measure] as [React.MutableRefObject<T | null>, DOMRect | null, () => void]
}

export default useMeasure