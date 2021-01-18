import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridToolbar, DataGridToolbarProps } from "../components/DataGridToolbar";
import { Template } from "../Template";

export interface ToolbarLayoutProps {
    rootComponent?: ComponentType<DataGridToolbarProps>,
}

export const ToolbarLayout = (props: ToolbarLayoutProps) => {
    const {
        rootComponent: RootComponent = DataGridToolbar,
    } = props

    return <Plugin>
        <Template name="toolbar">
            {() => <RootComponent>
                Toolbar
        </RootComponent>}
        </Template>
    </Plugin>
}