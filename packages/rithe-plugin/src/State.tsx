import { shallowEquals } from '@rithe/utils'
import React, { useContext, useEffect } from 'react'
import { PositionContext } from './internal/PositionContext'
import { ComputedState, GeneratedState, ValueState } from './internal/State'
import { StateContext } from './internal/StateContext'

export interface ValueStateProps {
    name: string,
    value: any,
}

export interface GeneratedStateProps {
    name: string,
    generated: (...deps: any[]) => any,
    depNames?: string[],
    lazy?: boolean,
}

export interface ComputedStateProps {
    name: string,
    computed: (prev: any, ...deps: any[]) => any,
    depNames?: string[],
    lazy?: boolean,
}

export const State = React.memo((props: ValueStateProps | GeneratedStateProps | ComputedStateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(StateContext)
    const { name, value, generated, computed, depNames, lazy } = props as ValueStateProps & GeneratedStateProps & ComputedStateProps

    useEffect(() => {
        const state = generated ? new GeneratedState(name, position, generated, depNames ?? [], lazy ?? false) : computed ? new ComputedState(name, position, computed, depNames ?? [], lazy ?? false) : new ValueState(name, position, value)
        core.register(state)
        return () => core.unregister(state)
    }, [computed, core, depNames, generated, lazy, name, position, value])

    return null
}, (a, b) => {
    const x = a as ValueStateProps & GeneratedStateProps & ComputedStateProps, y = b as ValueStateProps & GeneratedStateProps & ComputedStateProps
    return Object.is(x.name, y.name)
        && Object.is(x.value, y.value)
        && Object.is(x.generated, y.generated)
        && Object.is(x.computed, y.computed)
        && shallowEquals(x.depNames, y.depNames)
        && Object.is(x.lazy, y.lazy)
})
State.displayName = 'State'