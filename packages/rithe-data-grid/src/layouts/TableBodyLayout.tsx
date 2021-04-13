import { Plugin } from "@rithe/plugin";
import { Arrays } from "@rithe/utils";
import React, { ComponentType, useCallback } from "react";
import { DataGridBody, DataGridBodyProps } from "../components/basic/DataGridBody";
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell";
import { DataGridBodyRow, DataGridBodyRowProps } from "../components/basic/DataGridBodyRow";
import { DataGridTable, DataGridTableProps } from "../components/basic/DataGridTable";
import { Render } from "../Render";
import { Template } from "../Template";
import { CellProps, RowProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { isBodyCell, isBodyRow } from "../utils/helpers";
import { loopTableBodyCells } from "../utils/loopTableBodyCells";

export interface TableBodyLayoutProps {
    Table?: ComponentType<DataGridTableProps>,
    Body?: ComponentType<DataGridBodyProps>,
    BodyRow?: ComponentType<DataGridBodyRowProps>,
    BodyCell?: ComponentType<DataGridBodyCellProps>,
}

export const TableBodyLayout = (props: TableBodyLayoutProps) => {
    const {
        Table = DataGridTable,
        Body = DataGridBody,
        BodyRow = DataGridBodyRow,
        BodyCell = DataGridBodyCell,
    } = props

    // Template body
    const bodyTemplate = useCallback((_, tableColumns: TableColumn[] = [], tableBodyRows: TableRow[] = []) => {
        const width = tableColumns.map(({ width }) => width).reduce((a, b) => a + b, 0)
        const height = tableBodyRows.map(({ height }) => height).reduce((a, b) => a + b, 0)
        return <Table width={width} height={height}>
            <Body>
                {expandTableRows(tableBodyRows).map(tableRow => {
                    return <Render key={tableRow.rowId} name="row" props={{
                        height: tableRow.height,
                        tableRow
                    }} />
                })}
            </Body>
        </Table>
    }, [Body, Table])

    // Template row
    const rowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = []) => {
        const { tableRow } = props
        return <BodyRow {...props}>
            {loopTableBodyCells(tableRow, tableColumns)}
        </BodyRow>
    }, [BodyRow])

    // Template cell
    const cellTemplate = useCallback((props: CellProps) => {
        return <BodyCell align="start" {...props} />
    }, [BodyCell])

    return <Plugin>
        <Template name="body" stateNames={['tableColumns', 'tableBodyRows']}>
            {bodyTemplate}
        </Template>
        <Template name="row" predicate={isBodyRow} stateNames={['tableColumns']}>
            {rowTemplate}
        </Template>
        <Template name="cell" predicate={isBodyCell}>
            {cellTemplate}
        </Template>
    </Plugin>
}

function expandTableRows(rootTableRows: TableRow[]) {
    const tableRows: TableRow[] = []
    const stack: TableRow[] = Arrays.reverse(rootTableRows)
    while (stack.length > 0) {
        const currentRow = stack.pop()!
        tableRows.push(currentRow)
        if (currentRow.expanded && currentRow.childRows) {
            stack.push(...Arrays.reverse(currentRow.childRows))
        }
    }
    return tableRows
}
