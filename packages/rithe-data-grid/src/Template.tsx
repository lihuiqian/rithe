import { Template as PluginTemplate } from '@rithe/plugin'
import { RefObject } from 'react'
import { StateSlice } from './StateSlice'
import { TemplateBaseProps } from './TemplateBaseProps'

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}
type PropsWithRef<T extends keyof TemplateBaseProps> = TemplateBaseProps[T] extends undefined ? { ref?: RefObject<any> } : TemplateBaseProps[T] & { ref?: RefObject<any> }

export interface ConditionalTemplateProps<T extends keyof TemplateBaseProps, DS extends Key[]> {
    name: T,
    predicate?: (props: TemplateBaseProps[T]) => boolean,
    stateNames?: [...DS],
    children: (props: PropsWithRef<T>, ...states: OptionalValues<DS>) => JSX.Element,
}

export interface ReservedTemplateProps<T extends keyof TemplateBaseProps, DS extends Key[]> {
    name: T,
    reserved: true,
    stateNames?: [...DS],
    children: (props: PropsWithRef<T>, ...states: OptionalValues<DS>) => JSX.Element,
}

export const Template = PluginTemplate as <T extends keyof TemplateBaseProps, DS extends Key[]>(props: ConditionalTemplateProps<T, DS> | ReservedTemplateProps<T, DS>) => null