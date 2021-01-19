import { Render as PluginRender } from '@rithe/plugin'
import React from "react"
import { TemplateBaseProps } from "./types/TemplateBaseProps"

interface NoProps<T extends keyof TemplateBaseProps> {
    name: T,
}

interface WithProps<T extends keyof TemplateBaseProps> {
    name: T,
    props: TemplateBaseProps[T],
}

export type RenderProps<T extends keyof TemplateBaseProps> = TemplateBaseProps[T] extends undefined ? NoProps<T> : WithProps<T>

export const Render = <T extends keyof TemplateBaseProps>(props: RenderProps<T> | Record<string, never>) => {
    return <PluginRender {...props} />
}