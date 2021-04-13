import { Typography } from "@material-ui/core";
import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell";
import { DataGridHeaderCell, DataGridHeaderCellProps } from "../components/basic/DataGridHeaderCell";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE, NUMBERING_TYPE } from "../utils/constants";
import { isBodyNumberCell, isHeaderNumberCell } from "../utils/helpers";
import { updateTableColumn } from "../utils/updateTableColumn";

export interface NumberingProps {
    width?: number,
    HeaderNumberingCell?: ComponentType<DataGridHeaderCellProps>,
    BodyNumberingCell?: ComponentType<DataGridBodyCellProps>,
}

export const Numbering = (props: NumberingProps) => {
    const {
        width = 40,
        HeaderNumberingCell = DataGridHeaderCell,
        BodyNumberingCell = DataGridBodyCell,
    } = props

    // State tableColumns, add expand column
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        const hasFreezeStart = tableColumns.map(tableColumn => tableColumn.freezePosition === 'start').reduce((a, b) => a || b, false)
        return [updateTableColumn(undefined, {
            type: NUMBERING_TYPE,
            field: NUMBERING_TYPE.toString(),
            width,
            freezePosition: hasFreezeStart ? 'start' : undefined,
        }, tableColumnsCacheRef.current), ...tableColumns]
    }, [width])

    // Template headerNumberingCell
    const headerNumberingCellTemplate = useCallback((props: CellProps) => {
        return <HeaderNumberingCell align="end" {...props}>
            <Typography variant="body1">No.</Typography>
        </HeaderNumberingCell>
    }, [HeaderNumberingCell])

    // Template bodyNumberingCell
    const bodyNumberingCellTemplate = useCallback((props: CellProps, tableBodyRows: TableRow[] = []) => {
        const { tableRows: [tableRow] } = props
        const index = indexOf(tableBodyRows, tableRow)
        return <BodyNumberingCell align="end" {...props}>
            <Typography variant="body1">{index + 1}</Typography>
        </BodyNumberingCell>
    }, [BodyNumberingCell])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="cell" predicate={isHeaderNumberCell}>
            {headerNumberingCellTemplate}
        </Template>
        <Template name="cell" predicate={isBodyNumberCell} stateNames={['tableBodyRows']}>
            {bodyNumberingCellTemplate}
        </Template>
    </Plugin>
}

function indexOf(tableRows: TableRow[], tableRow: TableRow) {
    const rowId = tableRow.rowId
    let index = 0
    const stack = [...tableRows].reverse()
    while (stack.length > 0) {
        const currentRow = stack.pop()!
        if (currentRow.type === DATA_TYPE) {
            if (currentRow.rowId === rowId) return index
            index++
        }
        const childRows = currentRow.childRows
        if (childRows) {
            stack.push(...[...childRows].reverse())
        }
    }
    return -1
}