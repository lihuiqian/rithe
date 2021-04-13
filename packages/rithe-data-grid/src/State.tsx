import { State as PluginState } from '@rithe/plugin';
import { StateSlice } from "./StateSlice";

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export interface ValueStateProps<T extends Key> {
    name: T,
    value?: StateSlice[T],
}
export interface GeneratedStateProps<T extends Key, DS extends Key[]> {
    name: T,
    generated: (...deps: OptionalValues<DS>) => StateSlice[T] | undefined,
    depNames?: [...DS],
    lazy?: boolean,
}
export interface ComputedStateProps<T extends Key, DS extends Key[]> {
    name: T,
    computed: (prev: StateSlice[T] | undefined, ...deps: OptionalValues<DS>) => StateSlice[T] | undefined,
    depNames?: [...DS],
    lazy?: boolean,
}

export const State = PluginState as <T extends Key, DS extends Key[]>(props: ValueStateProps<T> | GeneratedStateProps<T, DS> | ComputedStateProps<T, DS>) => null