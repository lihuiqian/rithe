import { PluginHost } from "@rithe/plugin"
import React, { ComponentType, ReactNode } from 'react'
import { DataGridContainer, DataGridContainerProps } from "./components/DataGridContainer"
import { Render } from "./Render"
import { Template } from "./Template"
import Column from "./types/Column"
import Row from "./types/Row"
import RowId from "./types/RowId"

export interface DataGridProps {
    columns: Column[],
    rows: Row[],
    getRowId?: (row: Row) => RowId,
    rootComponent?: ComponentType<DataGridContainerProps>
    children?: ReactNode | ReactNode[]
}

export const DataGrid = (props: DataGridProps) => {
    const { columns,
        rows,
        getRowId,
        rootComponent: RootComponent = DataGridContainer,
        children } = props

    return <PluginHost>
        <Template name="root">
            {() => <RootComponent>
                <Render name="toolbar" />
                <Render name="table" />
                <Render name="pagination" />
            </RootComponent>}
        </Template>
        {children}
        <Render name="root" />
    </PluginHost>
}