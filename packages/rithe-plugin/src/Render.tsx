import { Records, shallowEquals } from "@rithe/utils"
import React, { useContext } from "react"
import { RenderContext } from "./internal/RenderContext"
import { useStates } from "./useStates"
import { useTemplates } from './useTemplates'

export interface RenderProps {
    name?: string,
    props?: any,
    propsAreEqual?: (prevProps?: Readonly<any>, nextProps?: Readonly<any>) => boolean,
}

export const Render = React.memo(React.forwardRef<any, RenderProps>((renderProps, ref) => {
    const { name, props } = renderProps
    return name === undefined ? <RenderPlaceholder ref={ref} overrideProps={props} /> : <RenderHost ref={ref} name={name} props={props} />
}
), (a, b) => a.name === b.name && shallowEquals(a.props, b.props))
Render.displayName = 'Render'

const RenderHost = React.forwardRef<any, { name: string, props: any }>((renderProps, ref) => {
    const { name, props } = renderProps
    const templates = useTemplates(name, props)
    if (templates.length === 0) {
        return null
    } else {
        return <RenderInternal ref={ref} template={templates[0]} props={props} restTemplates={templates.slice(1)} />
    }
})
RenderHost.displayName = 'RenderHost'

const RenderPlaceholder = React.forwardRef<any, { overrideProps: any }>((renderProps, ref) => {
    const { overrideProps } = renderProps
    const { templates, props } = useContext(RenderContext)
    if (templates.length === 0) {
        return null
    } else {
        return <RenderInternal ref={ref} template={templates[0]} props={{ ...props, ...overrideProps }} restTemplates={templates.slice(1)} />
    }
})
RenderPlaceholder.displayName = 'RenderPlaceholder'

const RenderInternal = React.forwardRef<any, { template: any, props: any, restTemplates: any[] }>((renderProps, ref) => {
    const { template, props, restTemplates } = renderProps
    const { render, stateNames } = template
    const states = useStates(...stateNames)
    return <RenderContext.Provider value={{ templates: restTemplates, props }}>
        {render(Records.concat((props ?? {}), { ref }), ...states)}
    </RenderContext.Provider>
})
RenderInternal.displayName = 'RenderInternal'