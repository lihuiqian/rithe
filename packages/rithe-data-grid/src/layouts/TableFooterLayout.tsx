import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableFooter, DataGridTableFooterProps } from "../components/DataGridTableFooter";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableFooterLayoutProps {
    tableFooterComponent?: ComponentType<DataGridTableFooterProps>,
}

export const TableFooterLayout = (props: TableFooterLayoutProps) => {
    const {
        tableFooterComponent: TableFooterComponent = DataGridTableFooter,
    } = props

    return <Plugin>
        <Template name="tableFooter" stateNames={['tableFooterRows']}>
            {(props, tableRows) => <TableFooterComponent>
                TFOOT
                {tableRows && tableRows.map(tableRow => <Render key={tableRow.key} name="tableRow" props={{ tableRow }} />)}
            </TableFooterComponent>}
        </Template>
    </Plugin>
}