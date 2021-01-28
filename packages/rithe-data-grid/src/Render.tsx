import { Render as PluginRender } from '@rithe/plugin'
import { shallowEquals } from '@rithe/utils'
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

// eslint-disable-next-line react/display-name
export const Render = React.memo(<T extends keyof TemplateBaseProps>(props: RenderProps<T> | Record<string, never>) => {
    return <PluginRender {...props} />
}, (a, b) => a.name === b.name && shallowEquals(a.props, b.props)) as unknown as <T extends keyof TemplateBaseProps>(props: RenderProps<T> | Record<string, never>) => JSX.Element