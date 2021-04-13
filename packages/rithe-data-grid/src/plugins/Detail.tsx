import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell";
import { DataGridBodyRow, DataGridBodyRowProps } from "../components/basic/DataGridBodyRow";
import { DataGridDetailFormatter, DataGridDetailFormatterProps } from "../components/detail/DataGridDetailFormatter";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps, RowProps } from "../TemplateBaseProps";
import { RowId } from "../types/RowId";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE, DEFAULT_ROW_HEIGHT, DETAIL_TYPE } from "../utils/constants";
import { isDetailCell, isDetailRow } from "../utils/helpers";
import { loopTableBodyCells } from "../utils/loopTableBodyCells";
import { updateTableRow } from "../utils/updateTableRow";

export interface DetailProps {
    DetailRow?: ComponentType<DataGridBodyRowProps>,
    DetailCell?: ComponentType<DataGridBodyCellProps>,
    DetailFormatter?: ComponentType<DataGridDetailFormatterProps>,
}

export const Detail = (props: DetailProps) => {
    const {
        DetailRow = DataGridBodyRow,
        DetailCell = DataGridBodyCell,
        DetailFormatter = DataGridDetailFormatter,
    } = props

    // State tableRows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = []) => {
        return tableBodyRows.map(tableRow => {
            if (tableRow.type !== DATA_TYPE) return tableRow
            const detailRow = updateTableRow(undefined, {
                type: DETAIL_TYPE,
                row: tableRow.row,
                rowId: tableRow.rowId + '_DETAIL_',
                height: DEFAULT_ROW_HEIGHT,
            }, tableBodyRowsCacheRef.current)
            return updateTableRow(tableRow, {
                childRows: [detailRow],
            }, tableBodyRowsCacheRef.current)
        })
    }, [])

    // Template detailRow
    const detailRowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = []) => {
        const { tableRow } = props
        return <DetailRow {...props}>
            {loopTableBodyCells(tableRow, tableColumns)}
        </DetailRow>
    }, [DetailRow])

    // Template detailCell
    const detailCellTemplate = useCallback((props: CellProps) => {
        return <DetailCell align="start" {...props}>
            <DetailFormatter row={props.tableRows[0].row} />
        </DetailCell>
    }, [DetailCell, DetailFormatter])

    return <Plugin>
        <State name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template name="row" predicate={isDetailRow} stateNames={['tableColumns']}>
            {detailRowTemplate}
        </Template>
        <Template name="cell" predicate={isDetailCell}>
            {detailCellTemplate}
        </Template>
    </Plugin>
}