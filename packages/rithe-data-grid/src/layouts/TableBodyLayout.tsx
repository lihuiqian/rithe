import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableBody, DataGridTableBodyProps } from "../components/DataGridTableBody";
import { DataGridTableBodyCell, DataGridTableBodyCellProps } from "../components/DataGridTableBodyCell";
import { DataGridTableBodyRow, DataGridTableBodyRowProps } from "../components/DataGridTableBodyRow";
import { Render } from "../Render";
import { Template } from "../Template";
import { isBodyCell, isBodyRow } from "../utils/helpers";

export interface TableBodyLayoutProps {
    bodyComponent?: ComponentType<DataGridTableBodyProps>,
    rowComponent?: ComponentType<DataGridTableBodyRowProps>,
    cellComponent?: ComponentType<DataGridTableBodyCellProps>,
}

export const TableBodyLayout = (props: TableBodyLayoutProps) => {
    const {
        bodyComponent: BodyComponent = DataGridTableBody,
        rowComponent: RowComponent = DataGridTableBodyRow,
        cellComponent: CellComponent = DataGridTableBodyCell,
    } = props

    return <Plugin>
        <Template name="tableBody" stateNames={['tableBodyRows']}>
            {(_, tableRows) => <BodyComponent>
                {tableRows && tableRows.map(tableRow => <Render key={tableRow.key} name="row" props={{ tableRow }} />)}
            </BodyComponent>}
        </Template>
        <Template name="row" stateNames={['tableColumns']} predicate={({ tableRow }) => isBodyRow(tableRow)}>
            {({ tableRow }, tableColumns) => <RowComponent tableRow={tableRow}>
                {tableColumns && tableColumns.map(tableColumn => <Render key={tableColumn.key} name="cell" props={{ tableColumn, tableRow }} />)}
            </RowComponent>}
        </Template>
        <Template name="cell" predicate={({ tableRow }) => isBodyCell(tableRow)}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) => <CellComponent tableColumn={tableColumn} tableRow={tableRow} colSpan={colSpan} rowSpan={rowSpan}>
                {tableColumn.key + tableRow.key}
            </CellComponent>}
        </Template>
    </Plugin>
}