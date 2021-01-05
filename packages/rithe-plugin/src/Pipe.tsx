import React, { useContext, useEffect } from 'react'
import PluginContext from './internal/PluginContext'
import PositionContext from './internal/PositionContext'

interface ValuePipeProps {
    name: string,
    value: any,
}

interface ComputedPipeProps {
    name: string,
    computed: (prev: any, ...deps: any[]) => any,
    dependencyNames?: string[],
    lazy?: boolean,
}

type PipeProps = ValuePipeProps | ComputedPipeProps

const Pipe = (props: PipeProps) => {
    const position = useContext(PositionContext)
    const { register, unregister } = useContext(PluginContext)
    const { name, value, computed, dependencyNames, lazy } = props as any
    useEffect(() => {
        computed || register(name, position, value)
        return () => computed || unregister(position)
    }, [position, register, unregister, name, value, computed])
    useEffect(() => {
        computed && register(name, position, computed, dependencyNames || [], lazy || false)
        return () => computed && unregister(position)
    }, [position, register, unregister, name, value, computed, dependencyNames, lazy])
    return <></>
}

export default Pipe

