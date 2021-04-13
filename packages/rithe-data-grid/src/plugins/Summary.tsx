import { Plugin } from "@rithe/plugin";
import { Records } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridFooterCell, DataGridFooterCellProps } from "../components/basic/DataGridFooterCell";
import { DataGridSummaryFormatter, DataGridSummaryFormatterProps } from "../components/summary/DataGridSummaryFormatter";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps } from "../TemplateBaseProps";
import { Align } from "../types/Align";
import { Column } from "../types/Column";
import { DataTypeInfer } from "../types/DataType";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";
import { SummaryFunction } from "../types/SummaryFunction";
import { TableRow } from "../types/TableRow";
import { buildGetCellValue } from "../utils/buildGetCellValue";
import { DATA_TYPE, DEFAULT_ROW_HEIGHT, FOOTER_TYPE } from "../utils/constants";
import { isFooterCell } from "../utils/helpers";
import { updateTableRow } from "../utils/updateTableRow";

interface ColumnSetting {
    align?: Align,
    summaryFunction?: SummaryFunction | string,
    getSummaryRows?: (rows: Row[]) => Row[],
    summarizer?: (values: any[]) => any,
    dataType?: keyof DataTypeInfer,
    Formatter?: ComponentType<DataGridSummaryFormatterProps>,
}

export interface SummaryProps {
    columnSettings?: Record<string, ColumnSetting>,
    SummaryCell?: ComponentType<DataGridFooterCellProps>,
}

export const Summary = (props: SummaryProps) => {
    const {
        SummaryCell = DataGridFooterCell,
    } = props

    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableFooterRows
    const tableFooterRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableFooterRowsComputed = useCallback((tableFooterRows: TableRow[] = [], tableBodyRows: TableRow[] = [], columns: Column[] = []) => {
        const allRows = getRows(tableBodyRows)
        const getCellValue = buildGetCellValue(columns)
        const result: Record<string, any> = {}
        Records.forEach(columnSettings, (setting, field) => {
            const summaryRows = setting.getSummaryRows ? setting.getSummaryRows(allRows) : allRows
            const summarizer = setting.summarizer ?? defaultSummarizer(setting.summaryFunction ?? 'count')
            const values = summaryRows.map(row => getCellValue(row, field))
            result[field] = summarizer(values)
        })
        return [...tableFooterRows, updateTableRow(undefined, {
            type: FOOTER_TYPE,
            row: result,
            rowId: FOOTER_TYPE.toString(),
            height: DEFAULT_ROW_HEIGHT,
        }, tableFooterRowsCacheRef.current)]
    }, [columnSettings])

    // Template summaryCell
    const isSummaryCell = useCallback((props: CellProps) => isFooterCell(props) && !!columnSettings[props.tableColumns[0].field], [columnSettings])
    const summaryCellTemplate = useCallback((props: CellProps) => {
        const { tableColumns: [tableColumn], tableRows: [tableRow] } = props
        const align = columnSettings[tableColumn.field]?.align ?? 'start'
        const setting = columnSettings[tableColumn.field]
        const value = tableRow.row![tableColumn.field]
        const dataType = setting.dataType ?? 'string'
        const Formatter = setting.Formatter ?? DataGridSummaryFormatter
        return <SummaryCell align={align} {...props}>
            <Formatter
                value={value}
                dataType={dataType}
                tableColumn={tableColumn}
                tableRow={tableRow}
            />
        </SummaryCell>
    }, [SummaryCell, columnSettings])

    return <Plugin>
        <State name="tableFooterRows" computed={tableFooterRowsComputed} depNames={['tableBodyRows', 'columns']} />
        <Template name="cell" predicate={isSummaryCell}>
            {summaryCellTemplate}
        </Template>
    </Plugin>
}

function getRows(tableBodyRows: TableRow[]) {
    const result: Row[] = []
    const stack: TableRow[] = [...tableBodyRows].reverse()
    while (stack.length > 0) {
        const currentRow = stack.pop()!
        if (currentRow.type === DATA_TYPE) {
            result.push(currentRow.row!)
        }
        const childRows = currentRow.childRows
        if (childRows) {
            stack.push(...[...childRows].reverse())
        }
    }
    return result
}

function defaultSummarizer(summaryFunction: SummaryFunction | string) {
    return (values: any[]) => {
        if (summaryFunction === 'count') {
            return values.length
        } else if (summaryFunction === 'sum') {
            return values.reduce((a, b) => a + b, 0)
        } else if (summaryFunction === 'min') {
            return values.reduce((a, b) => Math.min(a, b), 0)
        } else if (summaryFunction === 'max') {
            return values.reduce((a, b) => Math.max(a, b), 0)
        } else if (summaryFunction === 'avg') {
            return values.length === 0 ? 0 : values.reduce((a, b) => a + b, 0) / values.length
        }
    }
}