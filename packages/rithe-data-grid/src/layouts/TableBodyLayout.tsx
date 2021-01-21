import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridTableBody, DataGridTableBodyProps } from "../components/DataGridTableBody";
import { DataGridTableBodyCell, DataGridTableBodyCellProps } from "../components/DataGridTableBodyCell";
import { DataGridTableBodyCellContent, DataGridTableBodyCellContentProps } from "../components/DataGridTableBodyCellContent";
import { DataGridTableBodyRow, DataGridTableBodyRowProps } from "../components/DataGridTableBodyRow";
import { Render } from "../Render";
import { Template } from "../Template";
import { isBodyCell, isBodyContent, isBodyRow } from "../utils/helpers";

export interface TableBodyLayoutProps {
    bodyComponent?: ComponentType<DataGridTableBodyProps>,
    rowComponent?: ComponentType<DataGridTableBodyRowProps>,
    cellComponent?: ComponentType<DataGridTableBodyCellProps>,
    contentComponent?: ComponentType<DataGridTableBodyCellContentProps>,
}

export const TableBodyLayout = (props: TableBodyLayoutProps) => {
    const {
        bodyComponent: BodyComponent = DataGridTableBody,
        rowComponent: RowComponent = DataGridTableBodyRow,
        cellComponent: CellComponent = DataGridTableBodyCell,
        contentComponent: ContentComponent = DataGridTableBodyCellContent,
    } = props

    return <Plugin>
        <Template name="tableBody" stateNames={['tableBodyRows']}>
            {(_, tableRows) =>
                <BodyComponent>
                    {tableRows && tableRows.map(tableRow =>
                        <Render key={tableRow.key} name="row" props={{ tableRow }} />
                    )}
                </BodyComponent>
            }
        </Template>
        <Template name="row" stateNames={['tableColumns']} predicate={({ tableRow }) => isBodyRow(tableRow)}>
            {({ tableRow }, tableColumns) =>
                <RowComponent tableRow={tableRow}>
                    {tableColumns && tableColumns.map(tableColumn =>
                        <Render key={tableColumn.key} name="cell" props={{ tableColumn, tableRow }} />)}
                </RowComponent>
            }
        </Template>
        <Template name="cell" predicate={({ tableRow }) => isBodyCell(tableRow)}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) =>
                <CellComponent
                    tableColumn={tableColumn}
                    tableRow={tableRow}
                    colSpan={colSpan}
                    rowSpan={rowSpan}>
                    <Render name="cellContent" props={{ tableColumn, tableRow }} />
                </CellComponent>
            }
        </Template>
        <Template name="cellContent" predicate={({ tableRow }) => isBodyContent(tableRow)}>
            {({ tableColumn, tableRow }) => {
                const dataType = tableColumn.dataType, column = tableColumn.column, row = tableRow.row
                const align = dataType?.align ?? 'start'
                const getCellValue = column?.getCellValue
                const value = row ? getCellValue ? getCellValue(row) : column ? row[column.field] : undefined : undefined

                return <ContentComponent tableColumn={tableColumn} tableRow={tableRow} align={align}>
                    <Render name="formatter" props={{ value, tableColumn, tableRow }} />
                </ContentComponent>
            }}
        </Template>
    </Plugin>
}