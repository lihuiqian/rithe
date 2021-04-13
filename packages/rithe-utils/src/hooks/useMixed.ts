import { useCallback, useRef, useState } from "react"

function useMixed<T>(value?: T, onValueChange?: (value: T) => void, defaultValue?: T): [T | undefined, (value: T) => void]
function useMixed<T>(value: T | undefined, onValueChange: ((value: T) => void) | undefined, defaultValue: T | undefined, initialValue: T): [T, (value: T) => void]
function useMixed<T>(value?: T, onValueChange?: (value: T) => void, defaultValue?: T, initialValue?: T): [T | undefined, (value: T) => void] {
    const initialRef = useRef(initialValue)
    const [uncontrolled, setUncontrolled] = useState(defaultValue)
    const controlled = value
    const setControlled = useCallback((value: T) => {
        onValueChange && onValueChange(value)
    }, [onValueChange])
    const setBoth = useCallback((value: T) => {
        setUncontrolled(value)
        onValueChange && onValueChange(value)
    }, [onValueChange])

    if (value === undefined && onValueChange === undefined) {
        return [uncontrolled ?? initialRef.current, setUncontrolled]
    } else if (value !== undefined) {
        return [controlled ?? initialRef.current, setControlled]
    } else {
        console.warn(new Error('Component has both controlled and uncontrolled properties.'))
        return [uncontrolled ?? initialRef.current, setBoth]
    }
}

export default useMixed