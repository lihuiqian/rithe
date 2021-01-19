import { Plugin } from "@rithe/plugin";
import React, { ComponentType, ReactNode } from "react";
import { DataGridTable, DataGridTableProps } from "../components/DataGridTable";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableLayoutProps {
    rootComponent?: ComponentType<DataGridTableProps>,
    children?: ReactNode | ReactNode[],
}

export const TableLayout = (props: TableLayoutProps) => {
    const {
        rootComponent: RootComponent = DataGridTable,
        children,
    } = props

    return <Plugin>
        <Template name="table">
            {() => <RootComponent>
                <Render name="tableHeader" />
                <Render name="tableBody" />
                <Render name="tableFooter" />
            </RootComponent>}
        </Template>
        {children}
    </Plugin>
}