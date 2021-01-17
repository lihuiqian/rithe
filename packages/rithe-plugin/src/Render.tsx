import React from "react"
import { useStates } from "./useStates"
import { useTemplate } from './useTemplate'

export interface RenderProps {
    name: string,
    param: any,
}

export const Render = ({ name, param }: RenderProps) => {
    const template = useTemplate(name, param)
    const states = useStates(...(template?.stateNames ?? []))

    return template ? template.render(param, ...states.map(state => state?.value)) : <></>
}