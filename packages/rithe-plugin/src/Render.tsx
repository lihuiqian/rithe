import React, { useContext } from "react"
import { RenderContext } from "./internal/RenderContext"
import { useStates } from "./useStates"
import { useTemplates } from './useTemplates'

export interface RenderProps {
    name?: string,
    param?: any,
}

export const Render = ({ name, param }: RenderProps) => {
    return name === undefined ? <RenderPlaceholder /> : <RenderHost name={name} param={param} />
}

const RenderHost = ({ name, param }: { name: string, param: any }) => {
    const templates = useTemplates(name, param)
    if (templates.length === 0) {
        return null
    } else {
        return <RenderInternal template={templates[0]} param={param} restTemplates={templates.slice(1)} />
    }
}

const RenderPlaceholder = () => {
    const { templates, param } = useContext(RenderContext)
    if (templates.length === 0) {
        return null
    } else {
        return <RenderInternal template={templates[0]} param={param} restTemplates={templates.slice(1)} />
    }
}

const RenderInternal = ({ template, param, restTemplates }: { template: any, param: any, restTemplates: any[] }) => {
    const { render, stateNames } = template
    const states = useStates(...stateNames)
    return <RenderContext.Provider value={{ templates: restTemplates, param }}>
        {render(param, ...states)}
    </RenderContext.Provider>
}