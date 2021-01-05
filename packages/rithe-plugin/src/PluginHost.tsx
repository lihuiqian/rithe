import React, { ReactNode, useCallback, useMemo, useState } from "react"
import PluginContext from "./internal/PluginContext"
import PluginCore from "./internal/PluginCore"
import PluginIndexer from "./internal/PluginIndexer"
import PositionContext from "./internal/PositionContext"

const PluginHost = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [registry, setRegistry] = useState<{ version: number, core: PluginCore }>({ version: 0, core: new PluginCore() })
    const register = useCallback((name: string, position: number[], ...args: any[]) => {
        setRegistry(({ version, core }) => {
            args.length === 1 ? core.mount(name, position, args[0]) : core.mount(name, position, args[0], args[1], args[2])
            version++
            return { version, core }
        })
    }, [])
    const unregister = useCallback((position: number[]) => {
        setRegistry(({ version, core }) => {
            core.unmount(position)
            version++
            return { version, core }
        })
    }, [])

    const context = useMemo(() => ({ registry, register, unregister }), [registry, register, unregister])
    const position = useMemo(() => [], [])
    return <PluginContext.Provider value={context}>
        <PositionContext.Provider value={position}>
            <PluginIndexer>
                {children}
            </PluginIndexer>
        </PositionContext.Provider>
    </PluginContext.Provider>
}

export default PluginHost