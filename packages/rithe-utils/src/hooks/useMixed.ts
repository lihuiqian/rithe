import { useCallback, useState } from "react"

const useMixed = <T>(value?: T, onValueChange?: (value: T) => void, defaultValue?: T): [T | undefined, (value: T) => void] => {
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
        return [uncontrolled, setUncontrolled]
    } else if (value !== undefined) {
        return [controlled, setControlled]
    } else {
        console.warn(new Error('Component has both controlled and uncontrolled properties.'))
        return [uncontrolled, setBoth]
    }
}

export default useMixed