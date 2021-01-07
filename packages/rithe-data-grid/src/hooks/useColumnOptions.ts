import { Records } from "packages/rithe-utils/lib"
import { useMemo } from "react"
import useStateSlice from "./useStateSlice"

const useColumnOptions = <T>(options: { [field: string]: T } | undefined, defaultValue: T) => {
    const { columns } = useStateSlice('columns')
    return useMemo(() => {
        const map: { [field: string]: T } = {}
        columns && columns.forEach(c => map[c.field] = defaultValue)
        options && Records.entries()
        return map
    }, [columns, options])
}

export default useColumnOptions