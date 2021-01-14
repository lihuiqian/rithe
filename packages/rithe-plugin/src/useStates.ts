import { useContext } from "react"
import { PositionContext } from "./internal/PositionContext"
import { State } from "./internal/State"
import { StateContext } from "./internal/StateContext"

export const useStates = (...names: string[]) => {
    const position = useContext(PositionContext)
    const { registry: { core } } = useContext(StateContext)
    const states = names.map(name => core.latest(name, position)).filter(state => state !== undefined) as State[]
    states.forEach(state => state.dirty && core.calculate(state))
    return states.map(state => state.value)
}