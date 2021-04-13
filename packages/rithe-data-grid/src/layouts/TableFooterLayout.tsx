import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback } from "react";
import { DataGridFooter, DataGridFooterProps } from "../components/basic/DataGridFooter";
import { DataGridFooterCell, DataGridFooterCellProps } from "../components/basic/DataGridFooterCell";
import { DataGridFooterRow, DataGridFooterRowProps } from "../components/basic/DataGridFooterRow";
import { DataGridTable, DataGridTableProps } from "../components/basic/DataGridTable";
import { Render } from "../Render";
import { Template } from "../Template";
import { CellProps, RowProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { isFooterCell, isFooterRow } from "../utils/helpers";

export interface TableFooterLayoutProps {
    sticky?: boolean,
    Table?: ComponentType<DataGridTableProps>,
    Footer?: ComponentType<DataGridFooterProps>,
    FooterRow?: ComponentType<DataGridFooterRowProps>,
    FooterCell?: ComponentType<DataGridFooterCellProps>,
}

export const TableFooterLayout = (props: TableFooterLayoutProps) => {
    const {
        sticky = false,
        Table = DataGridTable,
        Footer = DataGridFooter,
        FooterRow = DataGridFooterRow,
        FooterCell = DataGridFooterCell,
    } = props

    // Template body
    const footerTemplate = useCallback((_, tableColumns: TableColumn[] = [], tableFooterRows: TableRow[] = []) => {
        const width = tableColumns.map(({ width }) => width).reduce((a, b) => a + b, 0)
        const height = tableFooterRows.map(({ height }) => height).reduce((a, b) => a + b, 0)
        return <Table width={width} height={height} stickBottom={sticky}>
            <Footer>
                {tableFooterRows.map(tableRow => {
                    return <Render key={tableRow.rowId} name="row" props={{
                        height: tableRow.height,
                        tableRow
                    }} />
                })}
            </Footer>
        </Table>
    }, [Footer, Table, sticky])

    // Template row
    const rowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = []) => {
        const { tableRow } = props
        return <FooterRow {...props}>
            {tableColumns.map(tableColumn => {
                const { field, width, freezePosition, freezeOffset } = tableColumn
                return <Render key={field} name="cell" props={{
                    width: width,
                    colSpan: 1,
                    rowSpan: 1,
                    freezePosition: freezePosition,
                    freezeOffset: freezeOffset,
                    tableColumns: [tableColumn],
                    tableRows: [tableRow],
                }} />
            })}
        </FooterRow>
    }, [FooterRow])

    // Template cell
    const cellTemplate = useCallback((props: CellProps) => {
        return <FooterCell align="start" {...props} />
    }, [FooterCell])

    return <Plugin>
        <Template name="footer" stateNames={['tableColumns', 'tableFooterRows']}>
            {footerTemplate}
        </Template>
        <Template name="row" predicate={isFooterRow} stateNames={['tableColumns']}>
            {rowTemplate}
        </Template>
        <Template name="cell" predicate={isFooterCell}>
            {cellTemplate}
        </Template>
    </Plugin>
}