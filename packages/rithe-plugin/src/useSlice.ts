import { useContext, useMemo } from "react"
import Pipe from "./internal/Pipe"
import PluginContext from "./internal/PluginContext"
import PositionContext from "./internal/PositionContext"

// const useSlice = (name: string) => {
//     const position = useContext(PositionContext)
//     const { registry } = useContext(PluginContext)
//     return useMemo(() => {
//         const core = registry.core
//         const pipe = core.latest(name, position)
//         const slice: { [name: string]: unknown } = {}
//         if (pipe) {
//             pipe.dirty && core.calculate(pipe)
//             slice[pipe.name] = pipe.value
//         }
//         return slice
//     }, [name, position, registry])
// }

const useSlice = (...names: string[]) => {
    const position = useContext(PositionContext)
    const { registry } = useContext(PluginContext)
    return useMemo(() => {
        const core = registry.core
        const pipes = names.map(name => core.latest(name, position)).filter(pipe => pipe !== undefined) as Pipe[]
        const slice: { [name: string]: unknown } = {}
        pipes.forEach(pipe => {
            pipe.dirty && core.calculate(pipe)
            slice[pipe.name] = pipe.value
        })
        return slice
    }, [names, position, registry])
}

export default useSlice