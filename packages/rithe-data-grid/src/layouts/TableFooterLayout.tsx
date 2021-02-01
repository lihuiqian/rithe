import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableFooterCell, DataGridTableFooterCellProps } from "../components/DataGridTableFooterCell";
import { DataGridTableFooterRow, DataGridTableFooterRowProps } from "../components/DataGridTableFooterRow";
import { DataGridTableFooter, DataGridTableFooterProps } from "../components/TableFooter";
import { Render } from "../Render";
import { Template } from "../Template";
import { isSummaryCell, isSummaryRow } from "../utils/helpers";

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
                {tableRows && tableRows.map(tableRow => <Render key={tableRow.key} name="row" props={{ tableRow }} />)}
            </FooterComponent>}
        </Template>
        <Template name="row" stateNames={['tableColumns']} predicate={({ tableRow }) => isSummaryRow(tableRow)}>
            {({ tableRow }, tableColumns) => <RowComponent tableRow={tableRow}>
                {tableColumns && tableColumns.map(tableColumn => <Render key={tableColumn.key} name="cell" props={{ tableColumn, tableRow }} />)}
            </RowComponent>}
        </Template>
        <Template name="cell" predicate={({ tableColumn, tableRow }) => isSummaryCell(tableColumn, tableRow)}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) => <CellComponent tableColumn={tableColumn} tableRow={tableRow} colSpan={colSpan} rowSpan={rowSpan}>
                {tableColumn.key + tableRow.key}
            </CellComponent>}
        </Template>
    </Plugin>
}