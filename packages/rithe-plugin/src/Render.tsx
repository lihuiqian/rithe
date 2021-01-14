import { useContext } from "react"
import { PositionContext } from "./internal/PositionContext"
import { TemplateContext } from "./internal/TemplateContext"
import { useStates } from "./useStates"

export interface RenderProps {
    name: string,
    params: any,
    slice: any,
}

export const Render = ({ name, params }: RenderProps) => {
    const position = useContext(PositionContext)
    const { registry: { core } } = useContext(TemplateContext)
    const { render, stateNames } = core.latest(name, position, params) ?? { render: undefined, stateNames: [] }
    const states = useStates(...stateNames)
    return render && render(params, ...states)
}