import React, { useContext } from "react"
import { RenderContext } from "./internal/RenderContext"
import { useStates } from "./useStates"
import { useTemplates } from './useTemplates'

export interface RenderProps {
    name?: string,
    props?: any,
}

export const Render = ({ name, props }: RenderProps) => {
    return name === undefined ? <RenderPlaceholder /> : <RenderHost name={name} props={props} />
}

const RenderHost = ({ name, props }: { name: string, props: any }) => {
    const templates = useTemplates(name, props)
    if (templates.length === 0) {
        return null
    } else {
        return <RenderInternal template={templates[0]} props={props} restTemplates={templates.slice(1)} />
    }
}

const RenderPlaceholder = () => {
    const { templates, props } = useContext(RenderContext)
    if (templates.length === 0) {
        return null
    } else {
        return <RenderInternal template={templates[0]} props={props} restTemplates={templates.slice(1)} />
    }
}

const RenderInternal = ({ template, props, restTemplates }: { template: any, props: any, restTemplates: any[] }) => {
    const { render, stateNames } = template
    const states = useStates(...stateNames)
    return <RenderContext.Provider value={{ templates: restTemplates, props }}>
        {render(props, ...states)}
    </RenderContext.Provider>
}