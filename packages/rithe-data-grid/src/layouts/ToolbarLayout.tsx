import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback } from "react";
import { DataGridToolbar, DataGridToolbarProps } from "../components/basic/DataGridToolbar";
import { DataGridToolbarContent, DataGridToolbarContentProps } from "../components/basic/DataGridToolbarContent";
import { Render } from "../Render";
import { Template } from "../Template";

export interface ToolbarLayoutProps {
    Toolbar?: ComponentType<DataGridToolbarProps>,
    Content?: ComponentType<DataGridToolbarContentProps>,
}

export const ToolbarLayout = (props: ToolbarLayoutProps) => {
    const {
        Toolbar = DataGridToolbar,
        Content = DataGridToolbarContent,
    } = props

    const toolbarTemplate = useCallback(() => {
        return <Toolbar>
            <Render name="toolbarContent" />
        </Toolbar>
    }, [Toolbar])

    const toolbarContent = useCallback(() => {
        return <Content>
            <span>
                <Render name="toolbarItem" />
            </span>
            <span>
                <Render name="toolbarAction" />
            </span>
        </Content>
    }, [Content])

    return <Plugin>
        <Template name="toolbar">
            {toolbarTemplate}
        </Template>
        <Template name="toolbarContent">
            {toolbarContent}
        </Template>
    </Plugin>
}