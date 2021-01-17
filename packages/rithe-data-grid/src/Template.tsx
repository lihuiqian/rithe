import { Template as PluginTemplate } from '@rithe/plugin'
import React from "react"
import { StateSlice } from './types/StateSlice'
import { TemplateParam } from './types/TemplateParam'

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export interface TemplateProps<T extends keyof TemplateParam, DS extends Key[]> {
    name: T,
    predicate: (param: TemplateParam[T] | undefined) => boolean,
    render: (param: TemplateParam[T] | undefined, ...states: OptionalValues<DS>) => JSX.Element,
    stateNames: [...DS],
}

export const Template = <T extends keyof TemplateParam, DS extends Key[]>(props: TemplateProps<T, DS>) => {
    return <PluginTemplate {...props as any} />
}