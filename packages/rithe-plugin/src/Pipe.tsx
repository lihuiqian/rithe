import { useShallow } from '@rithe/utils'
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
    const { name, value, computed, dependencyNames, lazy } = props as ValuePipeProps & ComputedPipeProps

    useEffect(() => {
        computed || register(name, position, value)
        return () => computed as any || unregister(position)
    }, [position, register, unregister, name, value, computed])

    const shallowedDependencyNames = useShallow(dependencyNames ?? [])
    useEffect(() => {
        computed && register(name, position, computed, shallowedDependencyNames ?? [], lazy ?? false)
        return () => computed && unregister(position)
    }, [computed, lazy, name, position, register, shallowedDependencyNames, unregister])
    return <></>
}

export default Pipe

