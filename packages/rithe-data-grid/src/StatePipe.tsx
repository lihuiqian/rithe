import { Pipe } from "@rithe/plugin";
import React from 'react';
import StateSlice from "./types/StateSlice";

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

interface ValueStatePipeProps<T extends Key> {
    name: T,
    value?: StateSlice[T],
}
interface ComputedStatePipeProps<T extends Key, DS extends Key[]> {
    name: T,
    computed: (prev: StateSlice[T] | undefined, ...deps: OptionalValues<DS>) => StateSlice[T],
    dependencyNames?: [...DS],
    lazy?: boolean,
}
type StatePipeProps<T extends Key, DS extends Key[]> = ValueStatePipeProps<T> | ComputedStatePipeProps<T, DS>

const StatePipe = <T extends Key, DS extends Key[]>(props: StatePipeProps<T, DS>) => {
    return <Pipe {...props as any} />
}

export type { StatePipeProps };
export default StatePipe