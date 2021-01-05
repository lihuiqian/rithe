import { Pipe, Plugin } from "@rithe/plugin"
import React, { useCallback } from "react"
import Test from "./Test"

export const P3 = () => {
    console.log('P3')

    const c3 = useCallback((arr: number[] | undefined) => {
        return arr ? [...arr, 5] : undefined
    }, [])

    return <Plugin>
        <Pipe name="arr" computed={c3} lazy />
        <Test />
    </Plugin>
}