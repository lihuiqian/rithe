import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridToolbar, DataGridToolbarProps } from "../components/DataGridToolbar";
import { Template } from "../Template";

export interface ToolbarLayoutProps {
    toolbarComponent?: ComponentType<DataGridToolbarProps>,
}

export const ToolbarLayout = (props: ToolbarLayoutProps) => {
    const {
        toolbarComponent: ToolbarComponent = DataGridToolbar,
    } = props

    return <Plugin>
        <Template name="toolbar">
            {() => <ToolbarComponent>
                Toolbar
        </ToolbarComponent>}
        </Template>
    </Plugin>
}