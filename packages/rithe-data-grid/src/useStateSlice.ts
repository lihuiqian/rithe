import { useSlice } from "packages/rithe-plugin/dist";
import StateSlice from "./types/StateSlice";

function useStateSlice<T extends keyof StateSlice>(...names: T[]): Pick<StateSlice, T> {
    return useSlice(...names) as Pick<StateSlice, T>
}

export default useStateSlice