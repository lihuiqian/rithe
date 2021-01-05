import { Pipe, Plugin } from "@rithe/plugin"
import React, { useCallback } from "react"
import Test from "./Test"

export const P4 = () => {
    console.log('P4')

    const c4 = useCallback((arr: number[] | undefined, d4: number[] | undefined) => {
        return arr ? [...arr, 6] : undefined
    }, [])

    return <Plugin>
        <Pipe name="arr" computed={c4} lazy />
        <Test />
    </Plugin>
}