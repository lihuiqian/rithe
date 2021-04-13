import { Plugin } from "@rithe/plugin"
import React, { ComponentType, useCallback } from "react"
import { Render } from "../Render"
import { Template } from "../Template"

export interface ToolbarActionProviderProps {
    Action: ComponentType<Record<string, never>>,
}

export const ToolbarActionProvider = (props: ToolbarActionProviderProps) => {
    const {
        Action,
    } = props

    const toolbarActionTemplate = useCallback(() => {
        return <>
            <Render />
            <Action />
        </>
    }, [Action])

    return <Plugin>
        <Template name="toolbarAction">
            {toolbarActionTemplate}
        </Template>
    </Plugin>
}