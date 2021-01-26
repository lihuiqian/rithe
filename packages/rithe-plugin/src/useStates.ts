import { Arrays, useShallow } from "@rithe/utils"
import { useContext, useLayoutEffect, useMemo, useReducer, useRef } from "react"
import { PositionContext } from "./internal/PositionContext"
import { StateContext } from "./internal/StateContext"
import { Subscription } from "./internal/Subscription"

export const useStates = (...names: string[]) => {
    names = useShallow(names)
    const position = useContext(PositionContext)
    const core = useContext(StateContext)
    const [, forceUpdate] = useReducer(s => s + 1, 0)
    const subs = useMemo(() => names.map(name => new Subscription(name, position)), [names, position])

    const latestNames = useRef<string[]>([])
    const latestValues = useRef<(any | undefined)[]>([])

    const diff = !Arrays.shallowEquals(names, latestNames.current)
    const values = diff ? names.map(name => core.slice(name, position)?.value) : latestValues.current

    useLayoutEffect(() => {
        latestNames.current = names
        latestValues.current = values
    }, [names, values])

    useLayoutEffect(() => {
        const checkForUpdate = () => {
            const newValues = latestNames.current.map(name => core.slice(name, position)?.value)
            if (!Arrays.shallowEquals(newValues, latestValues.current)) {
                latestValues.current = newValues
                forceUpdate()
            }
        }
        subs.forEach(sub => sub.subscribe = checkForUpdate)

        subs.forEach(sub => core.subscribe(sub))
        checkForUpdate()
        return () => subs.forEach(sub => core.unsubscribe(sub))
    }, [core, position, subs])

    return values
}