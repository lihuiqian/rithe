import React from "react"
import { useStates } from "./useStates"
import { useTemplate } from './useTemplate'

export interface RenderProps {
    name: string,
    param: any,
}

export const Render = ({ name, param }: RenderProps) => {
    const { render, stateNames } = useTemplate(name, param)
    const values = useStates(...(stateNames ?? []))

    console.log(render)
    console.log(stateNames, values)

    return render ? render(param, ...values) : <></>
}