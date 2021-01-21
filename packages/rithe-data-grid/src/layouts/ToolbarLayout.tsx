import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridToolbar, DataGridToolbarProps } from "../components/DataGridToolbar";
import { DataGridToolbarContent, DataGridToolbarContentProps } from "../components/DataGridToolbarContent";
import { Render } from "../Render";
import { Template } from "../Template";

export interface ToolbarLayoutProps {
    toolbarComponent?: ComponentType<DataGridToolbarProps>,
    contentComponent?: ComponentType<DataGridToolbarContentProps>,
}

export const ToolbarLayout = (props: ToolbarLayoutProps) => {
    const {
        toolbarComponent: ToolbarComponent = DataGridToolbar,
        contentComponent: ContentComponent = DataGridToolbarContent,
    } = props

    return <Plugin>
        <Template name="toolbar">
            {() => <ToolbarComponent>
                <Render name="toolbarContent" />
            </ToolbarComponent>}
        </Template>
        <Template name="toolbarContent">
            {() => <ContentComponent>
            </ContentComponent>}
        </Template>
    </Plugin>
}