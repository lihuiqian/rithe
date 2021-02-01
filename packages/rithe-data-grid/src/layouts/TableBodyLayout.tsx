import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback } from "react";
import { DataGridTableBodyCell, DataGridTableBodyCellProps } from "../components/DataGridTableBodyCell";
import { DataGridTableBodyRow, DataGridTableBodyRowProps } from "../components/DataGridTableBodyRow";
import { DataGridTableBody, DataGridTableBodyProps } from "../components/TableBody";
import { DataGridTableBodyContent, DataGridTableBodyContentProps } from "../components/TableCellContent";
import { Render } from "../Render";
import { Template } from "../Template";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { BodyCellProps, BodyContentProps, BodyRowProps } from "../types/TemplateBaseProps";
import { isDataCell, isDataContent, isDataRow } from "../utils/helpers";

export interface TableBodyLayoutProps {
    bodyComponent?: ComponentType<DataGridTableBodyProps>,
    rowComponent?: ComponentType<DataGridTableBodyRowProps>,
    cellComponent?: ComponentType<DataGridTableBodyCellProps>,
    contentComponent?: ComponentType<DataGridTableBodyContentProps>,
}

export const TableBodyLayout = (props: TableBodyLayoutProps) => {
    const {
        bodyComponent: BodyComponent = DataGridTableBody,
        rowComponent: RowComponent = DataGridTableBodyRow,
        cellComponent: CellComponent = DataGridTableBodyCell,
        contentComponent: ContentComponent = DataGridTableBodyContent,
    } = props

    const tableBodyTemplate = useCallback((_: undefined, tableRows?: TableRow[]) => {
        return <BodyComponent>
            {tableRows && tableRows.filter(tableRow => !tableRow.hidden).map(tableRow => {
                const { type: rowType, height, row, rowId } = tableRow
                return <Render key={tableRow.key} name="bodyRow" props={{
                    height,
                    rowType,
                    row,
                    rowId,
                }} />
            })}
        </BodyComponent>
    }, [BodyComponent])

    const bodyRowTemplate = useCallback((props: BodyRowProps, tableColumns?: TableColumn[]) => {
        const { rowType, row, rowId } = props
        return <RowComponent {...props}>
            {tableColumns && tableColumns.map(tableColumn => {
                const { type: colType, column, dataType } = tableColumn
                return <Render key={tableColumn.key} name="bodyCell" props={{
                    colSpan: 1,
                    rowSpan: 1,
                    colType,
                    rowType,
                    row,
                    rowId,
                    column,
                    dataType,
                }} />
            })}
        </RowComponent>
    }, [RowComponent])

    const bodyCellTemplate = useCallback((props: BodyCellProps) => {
        const { colType, rowType, row, rowId, column, dataType } = props
        const align = dataType?.align ?? 'start'
        return <CellComponent
            {...props}
        >
            <Render name="bodyContent" props={{
                align,
                colType,
                rowType,
                row,
                rowId,
                column,
                dataType
            }} />
        </CellComponent>
    }, [CellComponent])

    const bodyContentTemplate = useCallback((props: BodyContentProps) => {
        const { colType, rowType, row, rowId, column, dataType } = props
        const align = dataType?.align ?? 'start'
        const getCellValue = column?.getCellValue
        const value = row ? getCellValue ? getCellValue(row) : column ? row[column.field] : undefined : undefined

        return <ContentComponent {...props} align={align}>
            {row && rowId !== undefined && column && dataType && <Render name="formatter" props={{
                value,
                colType,
                rowType,
                row,
                rowId,
                column,
                dataType,
            }} />}
        </ContentComponent>
    }, [ContentComponent])

    return <Plugin>
        <Template name="tableBody" stateNames={['tableBodyRows']}>
            {tableBodyTemplate}
        </Template>
        <Template name="bodyRow" stateNames={['tableColumns']} predicate={({ rowType }) => isDataRow(rowType)}>
            {bodyRowTemplate}
        </Template>
        <Template name="bodyCell" predicate={({ colType, rowType }) => isDataCell(colType, rowType)}>
            {bodyCellTemplate}
        </Template>
        <Template name="bodyContent" predicate={({ colType, rowType }) => isDataContent(colType, rowType)}>
            {bodyContentTemplate}
        </Template>
    </Plugin>
}