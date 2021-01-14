import { useContext } from "react"
import { PositionContext } from "./internal/PositionContext"
import { StateContext } from "./internal/StateContext"
import { TemplateContext } from "./internal/TemplateContext"

export const useDebug = () => {
    const position = useContext(PositionContext)
    const { registry: stateRegistry } = useContext(StateContext)
    const { registry: templateRegistry } = useContext(TemplateContext)
    console.log('useDebug', JSON.stringify(position), stateRegistry, templateRegistry)
    console.log('')
}