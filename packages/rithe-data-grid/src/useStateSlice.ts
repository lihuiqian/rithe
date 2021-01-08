import { useSlice } from "@rithe/plugin";
import StateSlice from "./types/StateSlice";

function useStateSlice<T extends keyof StateSlice>(...names: T[]): Partial<Pick<StateSlice, T>> {
    return useSlice(...names) as Partial<Pick<StateSlice, T>>
}

export default useStateSlice