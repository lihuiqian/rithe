import { createContext } from 'react'
import PluginCore from './PluginCore'

export interface PluginContextValue {
    registry: { core: PluginCore, version: number }
    register(name: string, position: number[], value: any): void
    register(name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean): void
    unregister: (position: number[]) => void,
}

const PluginContext = createContext<PluginContextValue>(undefined as never)
export default PluginContext
