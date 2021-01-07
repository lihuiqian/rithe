import { useSlice } from "packages/rithe-plugin/dist";
import DataGridStateSlice from "../DataGridStateSlice";

function useStateSlice<T extends keyof DataGridStateSlice>(...names: T[]): Pick<DataGridStateSlice, T> {
    return useSlice(...names) as Pick<DataGridStateSlice, T>
}

export default useStateSlice