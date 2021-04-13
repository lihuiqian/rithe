import { useStates as usePluginStates } from '@rithe/plugin';
import { StateSlice } from "./StateSlice";

type Key = keyof StateSlice
type OptionalValues<KS extends Key[]> = {
    [P in keyof KS]: KS[P] extends Key ? StateSlice[KS[P]] | undefined : KS[P] | undefined
}

export const useStates = usePluginStates as <DS extends Key[]>(...names: DS) => OptionalValues<DS>