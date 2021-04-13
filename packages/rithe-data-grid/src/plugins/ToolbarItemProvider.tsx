import { Plugin } from "@rithe/plugin"
import React, { ComponentType, useCallback } from "react"
import { Render } from "../Render"
import { Template } from "../Template"

export interface ToolbarItemProviderProps {
    Item: ComponentType<Record<string, never>>,
}

export const ToolbarItemProvider = (props: ToolbarItemProviderProps) => {
    const {
        Item,
    } = props

    const toolbarItemTemplate = useCallback(() => {
        return <>
            <Render />
            <Item />
        </>
    }, [Item])

    return <Plugin>
        <Template name="toolbarItem">
            {toolbarItemTemplate}
        </Template>
    </Plugin>
}