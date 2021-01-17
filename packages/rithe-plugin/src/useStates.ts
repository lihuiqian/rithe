import { Arrays, useShallowPrevious } from "@rithe/utils"
import { useContext, useLayoutEffect, useMemo, useReducer, useRef } from "react"
import { PositionContext } from "./internal/PositionContext"
import { State } from "./internal/State"
import { StateContext } from "./internal/StateContext"
import { Subscription } from "./internal/Subscription"

export const useStates = (...names: string[]) => {
    names = useShallowPrevious(names, names)
    const position = useContext(PositionContext)
    const core = useContext(StateContext)
    const [, forceUpdate] = useReducer(s => s + 1, 0)
    const subs = useMemo(() => names.map(name => new Subscription(name, position)), [names, position])

    const latestNames = useRef<string[]>([])
    const latestStates = useRef<(State | undefined)[]>([])

    const diff = !Arrays.equals(names, latestNames.current)
    const states = diff ? names.map(name => core.slice(name, position)) : latestStates.current

    useLayoutEffect(() => {
        latestNames.current = names
        latestStates.current = states
    }, [names, states])

    useLayoutEffect(() => {
        const checkForUpdate = () => {
            const newStates = latestNames.current.map(name => core.slice(name, position))
            if (!Arrays.equals(newStates, latestStates.current)) {
                latestStates.current = newStates
                forceUpdate()
            }
        }

        subs.forEach(sub => sub.subscribe = checkForUpdate)
        subs.forEach(sub => core.subscribe(sub))

        checkForUpdate()

        return () => subs.forEach(sub => core.unsubscribe(sub))
    }, [core, position, subs])

    return states
}