import { useCallback, useRef } from "react"

const useAnimationThrottle = <T extends unknown[]>(handler: (...args: T) => void) => {
    const ref = useRef(0)
    return useCallback((...args: T) => {
        ref.current && cancelAnimationFrame(ref.current)
        ref.current = requestAnimationFrame(() => {
            handler(...args)
            ref.current = 0
        })
    }, [handler])
}

export default useAnimationThrottle