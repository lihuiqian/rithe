import { Pipe, Plugin } from "@rithe/plugin"
import React, { useCallback, useState } from "react"
import Test from "./Test"

export const P1 = () => {
    console.log('P1')

    const [v1, setV1] = useState([1, 2, 3])

    const onClickV1 = useCallback(() => {
        setV1([2, 3])
    }, [])

    return <Plugin>
        <button onClick={onClickV1}>V1</button>
        <Pipe name="arr" value={v1} />
        <Test />
    </Plugin>
}