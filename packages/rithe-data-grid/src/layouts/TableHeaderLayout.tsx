import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback } from "react";
import { DataGridHeader, DataGridHeaderProps } from "../components/basic/DataGridHeader";
import { DataGridHeaderCell, DataGridHeaderCellProps } from "../components/basic/DataGridHeaderCell";
import { DataGridHeaderRow, DataGridHeaderRowProps } from "../components/basic/DataGridHeaderRow";
import { DataGridTable, DataGridTableProps } from "../components/basic/DataGridTable";
import { Render } from "../Render";
import { Template } from "../Template";
import { CellProps, RowProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { isHeaderCell, isHeaderRow } from "../utils/helpers";
import { RenderCell } from "../utils/RenderCell";

export interface TableHeaderLayoutProps {
    sticky?: boolean,
    Table?: ComponentType<DataGridTableProps>,
    Header?: ComponentType<DataGridHeaderProps>,
    HeaderRow?: ComponentType<DataGridHeaderRowProps>,
    HeaderCell?: ComponentType<DataGridHeaderCellProps>,
}

export const TableHeaderLayout = (props: TableHeaderLayoutProps) => {
    const {
        sticky = false,
        Table = DataGridTable,
        Header = DataGridHeader,
        HeaderRow = DataGridHeaderRow,
        HeaderCell = DataGridHeaderCell,
    } = props

    // Template header
    const headerTemplate = useCallback((_, tableColumns: TableColumn[] = [], tableHeaderRows: TableRow[] = []) => {
        const width = tableColumns.map(({ width }) => width).reduce((a, b) => a + b, 0)
        const height = tableHeaderRows.map(({ height }) => height).reduce((a, b) => a + b, 0)
        return <Table width={width} height={height} stickTop={sticky}>
            <Header>
                {tableHeaderRows.map((tableRow, index) => {
                    return <Render key={index} name="row" props={{
                        height: tableRow.height,
                        tableRow: tableRow
                    }} />
                })}
            </Header>
        </Table>
    }, [Header, Table, sticky])

    // Template row
    const rowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = [], tableHeaderRows: TableRow[] = []) => {
        const { tableRow } = props
        const rowIndex = tableHeaderRows.indexOf(tableRow)
        const rowCount = tableHeaderRows.length
        return <HeaderRow {...props}>
            {tableColumns.map((tableColumn, colIndex) => {
                const { field, column, width, freezePosition, freezeOffset, } = tableColumn
                // 1. Not Data Column
                if (!column) {
                    return rowIndex > 0 ? null : <RenderCell key={field}
                        width={width}
                        colSpan={1}
                        rowSpan={rowCount}
                        freezePosition={freezePosition}
                        freezeOffset={freezeOffset}
                        tableColumns={[tableColumn]}
                        tableRows={tableHeaderRows}
                    />
                }

                // 2. Not Category
                const categoryCount = column.categories?.length ?? 0
                const category = getCategory(tableColumns, colIndex, rowIndex)
                if (category === undefined) {
                    return rowIndex > categoryCount ? null : <RenderCell key={field}
                        width={width}
                        colSpan={1}
                        rowSpan={rowCount - categoryCount}
                        freezePosition={freezePosition}
                        freezeOffset={freezeOffset}
                        tableColumns={[tableColumn]}
                        tableRows={tableHeaderRows.slice(rowIndex)}
                    />
                }
                const prevCategory = colIndex >= 1 ? getCategory(tableColumns, colIndex - 1, rowIndex) : undefined
                if (prevCategory && prevCategory.key === category.key && prevCategory.value === category.value && tableColumn.freezePosition === tableColumns[colIndex - 1].freezePosition) {
                    return null
                }
                let mergeCount = 1
                for (let i = colIndex + 1; i < tableColumns.length; i++) {
                    const nextCategory = getCategory(tableColumns, i, rowIndex)
                    if (nextCategory && nextCategory.key === category.key && nextCategory.value === category.value && tableColumn.freezePosition === tableColumns[i].freezePosition) mergeCount++
                    else break
                }
                // 3. Category Merged
                return <RenderCell key={field}
                    width={tableColumns.slice(colIndex, colIndex + mergeCount).map(tc => tc.width).reduce((a, b) => a + b, 0)}
                    colSpan={mergeCount}
                    rowSpan={1}
                    freezePosition={freezePosition}
                    freezeOffset={freezeOffset}
                    tableColumns={tableColumns.slice(colIndex, colIndex + mergeCount)}
                    tableRows={[tableRow]}
                />
            })}
        </HeaderRow>
    }, [HeaderRow])

    // Template cell
    const cellTemplate = useCallback((props: CellProps) => {
        return <HeaderCell align="start" {...props} />
    }, [HeaderCell])

    return <Plugin>
        <Template name="header" stateNames={['tableColumns', 'tableHeaderRows']}>
            {headerTemplate}
        </Template>
        <Template name="row" predicate={isHeaderRow} stateNames={['tableColumns', 'tableHeaderRows']}>
            {rowTemplate}
        </Template>
        <Template name="cell" predicate={isHeaderCell}>
            {cellTemplate}
        </Template>
    </Plugin>
}

function getCategory(tableColumns: TableColumn[], colIndex: number, rowIndex: number) {
    const tableColumn = tableColumns[colIndex]
    const categories = tableColumn?.column?.categories
    const category = categories ? categories[rowIndex] : undefined
    const freezePosition = tableColumn.freezePosition
    const freezeOffset = tableColumn.freezeOffset
    return category === undefined ? undefined : { ...category, freezePosition, freezeOffset }
}