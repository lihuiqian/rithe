import { createContext, ReactNode } from 'react'
import { TemplateCore } from './TemplateCore'

export interface TemplateContextValue {
    registry: { core: TemplateCore, version: number }
    register(name: string, position: number[], predicate: (params: any) => boolean, render: (params: any, ...states: any[]) => ReactNode, stateNames: string[]): void
    unregister: (position: number[]) => void,
}

export const TemplateContext = createContext<TemplateContextValue>(undefined as never)