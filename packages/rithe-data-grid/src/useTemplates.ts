import { useTemplates as usePluginTemplates } from '@rithe/plugin';
import { StateSlice } from "./types/StateSlice";
import { TemplateParam } from './types/TemplateParam';

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export const useTemplates = <T extends keyof TemplateParam, DS extends Key[]>(name: T, param: TemplateParam[T]): {
    render: ((param: TemplateParam[T] | undefined, ...states: OptionalValues<DS>) => JSX.Element) | undefined,
    stateNames: DS | undefined
}[] => {
    return usePluginTemplates(name, param) as any
}