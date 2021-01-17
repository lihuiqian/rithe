import { useRef } from "react"
import Objects from "../base/Objects"
import Arrays from "../collect/Arrays"

function useShallowPrevious<T>(value: T): T | undefined
function useShallowPrevious<T>(value: T, initialValue: T): T
function useShallowPrevious<T>(value: T, initialValue?: T): T | undefined {
    const ref = useRef<T | undefined>(initialValue)
    if (!Object.is(value, ref.current)) {
        if (value instanceof Array) {
            if (ref.current === undefined || !Arrays.equals(value, ref.current as any)) {
                ref.current = value
            }
        } else if (value instanceof Object) {
            if (ref.current === undefined || !Objects.shallowEquals(value, ref.current as any)) {
                ref.current = value
            }
        } else {
            ref.current = value
        }
    }

    return ref.current
}

export default useShallowPrevious