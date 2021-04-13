import React from "react";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE, DETAIL_TYPE, GROUPING_TYPE } from "./constants";
import { RenderCell } from "./RenderCell";

export function loopTableBodyCells(tableRow: TableRow, tableColumns: TableColumn[] = []) {
    if (tableRow.type === DETAIL_TYPE) {
        return <RenderCell
            width={tableColumns.map(({ width }) => width).reduce((a, b) => a + b, 0)}
            colSpan={tableColumns.length}
            rowSpan={1}
            tableColumns={tableColumns}
            tableRows={[tableRow]}
        />
    } else if (tableRow.type === GROUPING_TYPE) {
        const [prevTableColumns, dataTableColumns, postTableColumns] = splitTableColumns(tableColumns)
        return <>
            {prevTableColumns.map(tableColumn => {
                const { field, width, freezePosition, freezeOffset } = tableColumn
                return <RenderCell key={field}
                    width={width}
                    colSpan={1}
                    rowSpan={1}
                    freezePosition={freezePosition}
                    freezeOffset={freezeOffset}
                    tableColumns={[tableColumn]}
                    tableRows={[tableRow]}
                />
            })}
            {dataTableColumns.length && <RenderCell
                width={dataTableColumns.map(({ width }) => width).reduce((a, b) => a + b, 0)}
                colSpan={dataTableColumns.length}
                rowSpan={1}
                freezePosition={dataTableColumns[0].freezePosition}
                freezeOffset={dataTableColumns[0].freezeOffset}
                tableColumns={dataTableColumns}
                tableRows={[tableRow]}
            />}
            {postTableColumns.map(tableColumn => {
                const { field, width, freezePosition, freezeOffset } = tableColumn
                return <RenderCell key={field}
                    width={width}
                    colSpan={1}
                    rowSpan={1}
                    freezePosition={freezePosition}
                    freezeOffset={freezeOffset}
                    tableColumns={[tableColumn]}
                    tableRows={[tableRow]}
                />
            })}
        </>
    } else {
        return tableColumns.map(tableColumn => {
            const { field, width, freezePosition, freezeOffset } = tableColumn
            return <RenderCell key={field}
                width={width}
                colSpan={1}
                rowSpan={1}
                freezePosition={freezePosition}
                freezeOffset={freezeOffset}
                tableColumns={[tableColumn]}
                tableRows={[tableRow]}
            />
        })
    }
}

function splitTableColumns(tableColumns: TableColumn[]): [TableColumn[], TableColumn[], TableColumn[]] {
    let start = -1, end = -1
    tableColumns.forEach((tableColumn, index) => {
        if (tableColumn.type === DATA_TYPE) {
            start === -1 && (start = index)
            end = index + 1
        }
    })
    if (start === -1) {
        return [tableColumns, [], []]
    } else {
        return [tableColumns.slice(0, start), tableColumns.slice(start, end), tableColumns.slice(end)]
    }
}