import { Objects, Records, shallowEquals } from "@rithe/utils";
import { useRef } from "react";

export function useShallowColumnSettings<T>(value: Record<string, T>): Record<string, T> {
    const ref = useRef(value)
    if (Object.is(value, ref.current)) return ref.current
    if (Objects.shallowEquals(value, ref.current)) return ref.current
    if (Records.size(value) !== Records.size(ref.current)) {
        ref.current = value
        return ref.current
    }
    for (const [key, val] of Records.entries(value)) {
        const currentVal = ref.current[key]
        if (!shallowEquals(val, currentVal)) {
            ref.current = value
            return ref.current
        }
    }
    return ref.current
}