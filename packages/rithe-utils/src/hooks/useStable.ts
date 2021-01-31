import { useEffect, useRef } from "react"

function useStable<T>(value: T) {
    const ref = useRef(value)
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref
}

export default useStable