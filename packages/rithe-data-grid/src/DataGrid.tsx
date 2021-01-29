import { PluginHost } from "@rithe/plugin"
import React, { ComponentType, ReactNode } from 'react'
import { DataGridContainer, DataGridContainerProps } from "./components/DataGridContainer"
import { DataTypeProvider } from "./plugins/DataTypeProvider"
import { Render } from "./Render"
import { Template } from "./Template"

export interface DataGridProps {
    rootComponent?: ComponentType<DataGridContainerProps>,
    children?: ReactNode | ReactNode[]
}

export const DataGrid = (props: DataGridProps) => {
    const {
        rootComponent: RootComponent = DataGridContainer,
        children } = props
    console.log('DataGrid')

    return <PluginHost>
        <DataTypeProvider type="string" name="string" align="start" />
        <DataTypeProvider type="number" name="number" align="end" />
        <Template name="root">
            {() => {
                console.log('rootTemplate')
                return <RootComponent>
                    <Render name="toolbar" />
                    <Render name="table" />
                    <Render name="pagination" />
                </RootComponent>
            }}
        </Template>
        {children}
        <Render name="root" />
    </PluginHost>
}