import { Render as PluginRender } from '@rithe/plugin'
import React from "react"
import { TemplateBaseProps } from "./types/TemplateBaseProps"

export interface RenderProps<T extends keyof TemplateBaseProps> {
    name?: T,
    props?: TemplateBaseProps[T],
}

export const Render = <T extends keyof TemplateBaseProps>(props: RenderProps<T>) => {
    return <PluginRender {...props} />
}