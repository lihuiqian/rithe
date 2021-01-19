import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableBody, DataGridTableBodyProps } from "../components/DataGridTableBody";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableBodyLayoutProps {
    tableBodyComponent?: ComponentType<DataGridTableBodyProps>,
}

export const TableBodyLayout = (props: TableBodyLayoutProps) => {
    const {
        tableBodyComponent: TableBodyComponent = DataGridTableBody,
    } = props

    return <Plugin>
        <Template name="tableBody" stateNames={['tableBodyRows']}>
            {(props, tableRows) => <TableBodyComponent>
                TBODY
                {tableRows && tableRows.map(tableRow => <Render key={tableRow.key} name="tableRow" props={{ tableRow }} />)}
            </TableBodyComponent>}
        </Template>
    </Plugin>
}