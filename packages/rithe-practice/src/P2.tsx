import { Pipe, Plugin } from "@rithe/plugin"
import React, { useCallback } from "react"
import Test from "./Test"

export const P2 = () => {
    console.log('P2')

    const c2 = useCallback((arr: number[] | undefined) => {
        return arr ? [...arr, 4] : undefined
    }, [])

    return <Plugin>
        <Pipe name="arr" computed={c2} lazy />
        <Test />
    </Plugin>
}