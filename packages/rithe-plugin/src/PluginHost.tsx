import React, { ReactNode, useCallback, useMemo, useState } from "react"
import { PluginIndexer } from "./internal/PluginIndexer"
import { PositionContext } from "./internal/PositionContext"
import { StateContext } from "./internal/StateContext"
import { StateCore } from "./internal/StateCore"
import { TemplateContext } from "./internal/TemplateContext"
import { TemplateCore } from "./internal/TemplateCore"

export const PluginHost = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const stateContextValue = useStateContextValue()
    const templateContextValue = useTemplateContextValue()
    const position = useMemo(() => [], [])
    return <PositionContext.Provider value={position}>
        <StateContext.Provider value={stateContextValue}>
            <TemplateContext.Provider value={templateContextValue}>
                <PluginIndexer>
                    {children}
                </PluginIndexer>
            </TemplateContext.Provider>
        </StateContext.Provider>
    </PositionContext.Provider>
}

const useStateContextValue = () => {
    const [registry, setRegistry] = useState<{ version: number, histories: string[], core: StateCore }>({ version: 0, histories: [], core: new StateCore() })
    const register = useCallback((name: string, position: number[], ...args: any[]) => {
        setRegistry(({ version, histories, core }) => {
            args.length === 1 ? core.mount(name, position, args[0]) : core.mount(name, position, args[0], args[1], args[2])
            version++
            histories.push(`+ [${position.join(',')}]\t${name}`)
            return { version, histories: histories, core }
        })
    }, [])
    const unregister = useCallback((position: number[]) => {
        setRegistry(({ version, histories, core }) => {
            core.unmount(position)
            version++
            histories.push(`- [${position.join(',')}]`)
            return { version, histories, core }
        })
    }, [])
    return useMemo(() => ({ registry, register, unregister }), [registry, register, unregister])
}

const useTemplateContextValue = () => {
    const [registry, setRegistry] = useState<{ version: number, histories: string[], core: TemplateCore }>({ version: 0, histories: [], core: new TemplateCore() })
    const register = useCallback((name: string, position: number[], predicate: (param: any) => boolean, render: (param: any, ...states: any[]) => ReactNode, stateNames: string[]) => {
        setRegistry(({ version, histories, core }) => {
            core.mount(name, position, predicate, render, stateNames)
            version++
            histories.push(`+ [${position.join(',')}]\t${name}`)
            return { version, histories, core }
        })
    }, [])
    const unregister = useCallback((position: number[]) => {
        setRegistry(({ version, histories, core }) => {
            core.unmount(position)
            version++
            histories.push(`- [${position.join(',')}]`)
            return { version, histories, core }
        })
    }, [])
    return useMemo(() => ({ registry, register, unregister }), [registry, register, unregister])
}