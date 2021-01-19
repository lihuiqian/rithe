import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/DataGridTableHeader";
import { DataGridTableHeaderCell, DataGridTableHeaderCellProps } from "../components/DataGridTableHeaderCell";
import { DataGridTableHeaderRow, DataGridTableHeaderRowProps } from "../components/DataGridTableHeaderRow";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableHeaderLayoutProps {
    headerComponent?: ComponentType<DataGridTableHeaderProps>,
    rowComponent?: ComponentType<DataGridTableHeaderRowProps>,
    cellComponent?: ComponentType<DataGridTableHeaderCellProps>,
}

export const TableHeaderLayout = (props: TableHeaderLayoutProps) => {
    const {
        headerComponent: Thead = DataGridTableHeader,
        rowComponent: Tr = DataGridTableHeaderRow,
        cellComponent: Th = DataGridTableHeaderCell,
    } = props

    return <Plugin>
        <Template name="tableHeader" stateNames={['tableHeaderRows']}>
            {(_, tableHeaderRows) => <Thead>
                {tableHeaderRows && tableHeaderRows.map(tableRow => <Render key={tableRow.key} name="tableRow" props={{ tableRow }} />)}
            </Thead>}
        </Template>
        <Template name="tableRow" stateNames={['tableColumns']}>
            {({ tableRow }, tableColumns) => <Tr tableRow={tableRow}>
                {tableColumns && tableColumns.map(tableColumn => <Render key={tableColumn.key} name="tableCell" props={{ tableColumn, tableRow }} />)}
            </Tr>}
        </Template>
        <Template name="tableCell">
            {({ tableColumn, tableRow, colSpan, rowSpan }) => <Th tableColumn={tableColumn} tableRow={tableRow} colSpan={colSpan} rowSpan={rowSpan}>
                {tableColumn.key + tableRow.key}
            </Th>}
        </Template>
    </Plugin>
}