import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/DataGridTableHeader";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableHeaderLayoutProps {
    tableHeaderComponent?: ComponentType<DataGridTableHeaderProps>,
}

export const TableHeaderLayout = (props: TableHeaderLayoutProps) => {
    const {
        tableHeaderComponent: TableHeaderComponent = DataGridTableHeader,
    } = props

    return <Plugin>
        <Template name="tableHeader" stateNames={['tableHeaderRows']}>
            {(props, tableRows) => <TableHeaderComponent>
                THEAD
                {tableRows && tableRows.map(tableRow => <Render key={tableRow.key} name="tableRow" props={{ tableRow }} />)}
            </TableHeaderComponent>}
        </Template>
    </Plugin>
}