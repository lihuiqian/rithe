import { useRef } from "react"
import Objects from "../base/Objects"
import Arrays from "../collect/Arrays"

function useShallow<T>(array: T[]): T[]
// eslint-disable-next-line @typescript-eslint/ban-types
function useShallow<T extends object>(object: T): T
function useShallow(obj: any): any {
    const ref = useRef(obj)
    if (ref.current === obj) return ref.current
    if (obj instanceof Array && Arrays.equals(ref.current, obj)) return ref.current
    if (obj instanceof Object && Objects.shallowEquals(ref.current, obj)) return ref.current

    ref.current = obj
    return ref.current
}

export default useShallow