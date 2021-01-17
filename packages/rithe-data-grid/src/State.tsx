import { State as PluginState } from '@rithe/plugin';
import React from 'react';
import { StateSlice } from "./types/StateSlice";

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export interface ValueStateProps<T extends Key> {
    name: T,
    value?: StateSlice[T],
}
export interface ComputedStateProps<T extends Key, DS extends Key[]> {
    name: T,
    computed: (prev: StateSlice[T] | undefined, ...deps: OptionalValues<DS>) => StateSlice[T] | undefined,
    depNames?: [...DS],
    lazy?: boolean,
}

export const State = <T extends Key, DS extends Key[]>(props: ValueStateProps<T> | ComputedStateProps<T, DS>) => {
    return <PluginState {...props as any} />
}