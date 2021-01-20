import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/DataGridTableHeader";
import { DataGridTableHeaderCell, DataGridTableHeaderCellProps } from "../components/DataGridTableHeaderCell";
import { DataGridTableHeaderRow, DataGridTableHeaderRowProps } from "../components/DataGridTableHeaderRow";
import { Render } from "../Render";
import { Template } from "../Template";
import { HEADER_TYPE } from "../utils/constants";

export interface TableHeaderLayoutProps {
    headerComponent?: ComponentType<DataGridTableHeaderProps>,
    rowComponent?: ComponentType<DataGridTableHeaderRowProps>,
    cellComponent?: ComponentType<DataGridTableHeaderCellProps>,
}

export const TableHeaderLayout = (props: TableHeaderLayoutProps) => {
    const {
        headerComponent: HeaderComponent = DataGridTableHeader,
        rowComponent: RowComponent = DataGridTableHeaderRow,
        cellComponent: CellComponent = DataGridTableHeaderCell,
    } = props

    return <Plugin>
        <Template name="tableHeader" stateNames={['tableHeaderRows']}>
            {(_, tableHeaderRows) => <HeaderComponent>
                {tableHeaderRows && tableHeaderRows.map(tableRow => <Render key={tableRow.key} name="tableRow" props={{ tableRow }} />)}
            </HeaderComponent>}
        </Template>
        <Template name="tableRow" stateNames={['tableColumns']} predicate={({ tableRow }) => tableRow.type === HEADER_TYPE}>
            {({ tableRow }, tableColumns) => <RowComponent tableRow={tableRow}>
                {tableColumns && tableColumns.map(tableColumn => <Render key={tableColumn.key} name="tableCell" props={{ tableColumn, tableRow }} />)}
            </RowComponent>}
        </Template>
        <Template name="tableCell" predicate={({ tableRow }) => tableRow.type === HEADER_TYPE}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) => <CellComponent tableColumn={tableColumn} tableRow={tableRow} colSpan={colSpan} rowSpan={rowSpan}>
                {tableColumn.key + tableRow.key}
            </CellComponent>}
        </Template>
    </Plugin>
}