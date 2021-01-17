import { useContext } from "react"
import { PositionContext } from "./internal/PositionContext"
import { StateContext } from "./internal/StateContext"
import { TemplateContext } from "./internal/TemplateContext"

export const useDebug = () => {
    const position = useContext(PositionContext)
    const stateCore = useContext(StateContext)
    const templateCore = useContext(TemplateContext)
    console.log('useDebug', JSON.stringify(position), stateCore, templateCore)
    console.log('')
}