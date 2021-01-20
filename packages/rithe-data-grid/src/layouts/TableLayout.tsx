import { Plugin } from "@rithe/plugin";
import React, { ComponentType, ReactNode } from "react";
import { DataGridTable, DataGridTableProps } from "../components/DataGridTable";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableLayoutProps {
    tableComponent?: ComponentType<DataGridTableProps>,
    children?: ReactNode | ReactNode[],
}

export const TableLayout = (props: TableLayoutProps) => {
    const {
        tableComponent: TableComponent = DataGridTable,
        children,
    } = props

    return <Plugin>
        <Template name="table">
            {() => <TableComponent>
                <Render name="tableHeader" />
                <Render name="tableBody" />
                <Render name="tableFooter" />
            </TableComponent>}
        </Template>
        {children}
    </Plugin>
}