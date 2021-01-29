import { useTemplates as usePluginTemplates } from '@rithe/plugin';
import { StateSlice } from "./types/StateSlice";
import { TemplateBaseProps } from './types/TemplateBaseProps';

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export const useTemplates = usePluginTemplates as <T extends keyof TemplateBaseProps, DS extends Key[]>(name: T, props: TemplateBaseProps[T]) => {
    render: ((props: TemplateBaseProps[T] | undefined, ...states: OptionalValues<DS>) => JSX.Element) | undefined,
    stateNames: DS | undefined
}[]