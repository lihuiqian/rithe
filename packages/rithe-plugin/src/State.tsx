import { useShallow } from '@rithe/utils'
import React, { useContext, useEffect } from 'react'
import { PositionContext } from './internal/PositionContext'
import { StateContext } from './internal/StateContext'

export interface ValueStateProps {
    name: string,
    value: any,
}

export interface ComputedStateProps {
    name: string,
    computed: (prev: any, ...deps: any[]) => any,
    dependencyNames?: string[],
    lazy?: boolean,
}

export type StateProps = ValueStateProps | ComputedStateProps

export const State = (props: StateProps) => {
    const position = useContext(PositionContext)
    const { register, unregister } = useContext(StateContext)
    const { name, value, computed, dependencyNames, lazy } = props as ValueStateProps & ComputedStateProps

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