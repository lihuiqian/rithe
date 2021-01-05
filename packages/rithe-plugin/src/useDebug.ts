import { useContext } from "react"
import PluginContext from "./internal/PluginContext"
import PositionContext from "./internal/PositionContext"

const useDebug = () => {
    const position = useContext(PositionContext)
    const { registry } = useContext(PluginContext)
    console.log('useDebug', JSON.stringify(position), registry)
    console.log('')
}

export default useDebug