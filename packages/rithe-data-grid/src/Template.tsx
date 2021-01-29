import { Template as PluginTemplate } from '@rithe/plugin'
import { StateSlice } from './types/StateSlice'
import { TemplateBaseProps } from './types/TemplateBaseProps'

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export interface TemplateProps<T extends keyof TemplateBaseProps, DS extends Key[]> {
    name: T,
    predicate?: (props: TemplateBaseProps[T]) => boolean,
    stateNames?: [...DS],
    children: (props: TemplateBaseProps[T], ...states: OptionalValues<DS>) => JSX.Element,
}

export const Template = PluginTemplate as <T extends keyof TemplateBaseProps, DS extends Key[]>(props: TemplateProps<T, DS>) => null