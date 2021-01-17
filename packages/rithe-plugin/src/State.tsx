import React, { useContext, useEffect } from 'react'
import { PositionContext } from './internal/PositionContext'
import { ComputedState, ValueState } from './internal/State'
import { StateContext } from './internal/StateContext'

export interface ValueStateProps {
    name: string,
    value: any,
}

export interface ComputedStateProps {
    name: string,
    computed: (prev: any, ...deps: any[]) => any,
    depNames?: string[],
    lazy?: boolean,
}

export const State = (props: ValueStateProps | ComputedStateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(StateContext)
    const { name, value, computed, depNames, lazy } = props as ValueStateProps & ComputedStateProps

    useEffect(() => {
        const state = computed ? new ComputedState(name, position, computed, depNames ?? [], lazy ?? false) : new ValueState(name, position, value)
        core.register(state)
        return () => core.unregister(state)
    }, [computed, core, depNames, lazy, name, position, value])

    return <></>
}