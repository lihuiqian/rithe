import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableFooter, DataGridTableFooterProps } from "../components/DataGridTableFooter";
import { DataGridTableFooterCell, DataGridTableFooterCellProps } from "../components/DataGridTableFooterCell";
import { DataGridTableFooterRow, DataGridTableFooterRowProps } from "../components/DataGridTableFooterRow";
import { Render } from "../Render";
import { Template } from "../Template";
import { SUMMARY_TYPE } from "../utils/constants";

export interface TableFooterLayoutProps {
    footerComponent?: ComponentType<DataGridTableFooterProps>,
    rowComponent?: ComponentType<DataGridTableFooterRowProps>,
    cellComponent?: ComponentType<DataGridTableFooterCellProps>,
}

export const TableFooterLayout = (props: TableFooterLayoutProps) => {
    const {
        footerComponent: FooterComponent = DataGridTableFooter,
        rowComponent: RowComponent = DataGridTableFooterRow,
        cellComponent: CellComponent = DataGridTableFooterCell,
    } = props

    return <Plugin>
        <Template name="tableFooter" stateNames={['tableFooterRows']}>
            {(_, tableRows) => <FooterComponent>
                {tableRows && tableRows.map(tableRow => <Render key={tableRow.key} name="tableRow" props={{ tableRow }} />)}
            </FooterComponent>}
        </Template>
        <Template name="tableRow" stateNames={['tableColumns']} predicate={({ tableRow }) => tableRow.type === SUMMARY_TYPE}>
            {({ tableRow }, tableColumns) => <RowComponent tableRow={tableRow}>
                {tableColumns && tableColumns.map(tableColumn => <Render key={tableColumn.key} name="tableCell" props={{ tableColumn, tableRow }} />)}
            </RowComponent>}
        </Template>
        <Template name="tableCell" predicate={({ tableRow }) => tableRow.type === SUMMARY_TYPE}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) => <CellComponent tableColumn={tableColumn} tableRow={tableRow} colSpan={colSpan} rowSpan={rowSpan}>
                {tableColumn.key + tableRow.key}
            </CellComponent>}
        </Template>
    </Plugin>
}