import { useRef } from "react"
import Objects from "../base/Objects"
import Arrays from "../collect/Arrays"

function useShallow<T>(value: T): T {
    const ref = useRef<T>(value)
    if (!Object.is(value, ref.current)) {
        if (value instanceof Array) {
            if (ref.current === undefined || !Arrays.shallowEquals(value, ref.current as any)) {
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

export default useShallow