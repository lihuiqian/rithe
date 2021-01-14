import { createContext } from 'react'
import { StateCore } from './StateCore'

export interface StateContextValue {
    registry: { core: StateCore, version: number }
    register(name: string, position: number[], value: any): void
    register(name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean): void
    unregister: (position: number[]) => void,
}

export const StateContext = createContext<StateContextValue>(undefined as never)