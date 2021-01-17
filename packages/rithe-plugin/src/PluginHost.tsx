import React, { ReactNode, useRef } from "react"
import { PositionContext } from "./internal/PositionContext"
import { StateContext } from "./internal/StateContext"
import { StateCore } from "./internal/StateCore"
import { TemplateContext } from "./internal/TemplateContext"
import { TemplateCore } from "./internal/TemplateCore"
import { Plugin } from "./Plugin"

export const PluginHost = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const stateContextValue = useRef(new StateCore()).current
    const templateContextValue = useRef(new TemplateCore()).current
    const position = useRef([]).current
    return <PositionContext.Provider value={position}>
        <StateContext.Provider value={stateContextValue}>
            <TemplateContext.Provider value={templateContextValue}>
                <Plugin>
                    {children}
                </Plugin>
            </TemplateContext.Provider>
        </StateContext.Provider>
    </PositionContext.Provider>
}