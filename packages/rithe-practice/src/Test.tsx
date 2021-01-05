import { useSlice } from "@rithe/plugin"
import { useMemo } from "react"

function Test() {
    const { arr } = useSlice('arr')
    const render = useMemo(() => <div>{"Test "}{JSON.stringify(arr)}</div>, [arr])
    return render
}

export default Test