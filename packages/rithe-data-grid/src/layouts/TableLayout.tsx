import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTable, DataGridTableProps } from "../components/DataGridTable";
import { DataGridTableBody, DataGridTableBodyProps } from "../components/DataGridTableBody";
import { DataGridTableFooter, DataGridTableFooterProps } from "../components/DataGridTableFooter";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/DataGridTableHeader";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableLayoutProps {
    rootComponent?: ComponentType<DataGridTableProps>,
    tableHeaderComponent?: ComponentType<DataGridTableHeaderProps>,
    tableBodyComponent?: ComponentType<DataGridTableBodyProps>,
    tableFooterComponent?: ComponentType<DataGridTableFooterProps>,
}

export const TableLayout = (props: TableLayoutProps) => {
    const {
        rootComponent: RootComponent = DataGridTable,
        tableHeaderComponent: TableHeaderComponent = DataGridTableHeader,
        tableBodyComponent: TableBodyComponent = DataGridTableBody,
        tableFooterComponent: TableFooterComponent = DataGridTableFooter,
    } = props

    return <Plugin>
        <Template name="table">
            {() => <RootComponent>
                <Render name="tableHeader" />
                <Render name="tableBody" />
                <Render name="tableFooter" />
            </RootComponent>}
        </Template>
        <Template name="tableHeader">
            {() => <TableHeaderComponent>
                THEAD
            </TableHeaderComponent>}
        </Template>
        <Template name="tableBody">
            {() => <TableBodyComponent>
                TBODY
            </TableBodyComponent>}
        </Template>
        <Template name="tableFooter">
            {() => <TableFooterComponent>
                TFOOT
            </TableFooterComponent>}
        </Template>
    </Plugin>
}