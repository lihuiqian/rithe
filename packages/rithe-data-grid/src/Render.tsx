import { Render as PluginRender } from '@rithe/plugin'
import React from "react"
import { TemplateParam } from "./types/TemplateParam"

export interface RenderProps<T extends keyof TemplateParam> {
    name?: T,
    param?: TemplateParam[T],
}

export const Render = <T extends keyof TemplateParam>(props: RenderProps<T>) => {
    return <PluginRender {...props} />
}