import { Plugin } from "@rithe/plugin";
import { Arrays } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell";
import { DataGridHeaderCell, DataGridHeaderCellProps } from "../components/basic/DataGridHeaderCell";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { ACTION_TYPE } from "../utils/constants";
import { isBodyActionCell, isHeaderActionCell } from "../utils/helpers";
import { updateTableColumn } from "../utils/updateTableColumn";

export interface ActionProps {
    width?: number,
    HeaderActionCell?: ComponentType<DataGridHeaderCellProps>,
    BodyActionCell?: ComponentType<DataGridBodyCellProps>,
}

export const Action = (props: ActionProps) => {
    const {
        width,
        HeaderActionCell = DataGridHeaderCell,
        BodyActionCell = DataGridBodyCell,
    } = props

    // State tableColumns, add expand column
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((
        tableColumns: TableColumn[] = [],
        tableHeaderRows: TableRow[] = [],
        tableBodyRows: TableRow[] = [],
        tableFooterRows: TableRow[] = []) => {
        const actionCount = Arrays.concat(tableHeaderRows, tableBodyRows, tableFooterRows).map(tableRow => tableRow.actions?.length ?? 0).reduce((a, b) => Math.max(a, b), 0)
        if (actionCount === 0) return tableColumns
        const hasFreezeEnd = tableColumns.map(tableColumn => tableColumn.freezePosition === 'end').reduce((a, b) => a || b, false)
        return [...tableColumns, updateTableColumn(undefined, {
            type: ACTION_TYPE,
            field: ACTION_TYPE.toString(),
            width: width ?? actionCount * 32 + 16,
            freezePosition: hasFreezeEnd ? 'end' : undefined,
        }, tableColumnsCacheRef.current)]
    }, [width])

    // Template headerActionCell
    const headerActionCellTemplate = useCallback((props: CellProps) => {
        const { tableRows } = props
        const tableRow = tableRows[tableRows.length - 1]
        const actions = tableRow.actions
        return <HeaderActionCell align="start" {...props}>
            {actions && actions.map(action => {
                return <Render key={action} name="rowAction" props={{
                    actionName: action,
                    tableRow,
                }} />
            })}
        </HeaderActionCell>
    }, [HeaderActionCell])

    // Template bodyActionCell
    const bodyActionCellTemplate = useCallback((props: CellProps) => {
        const { tableRows } = props
        const tableRow = tableRows[tableRows.length - 1]
        const actions = tableRow.actions
        return <BodyActionCell align="start" {...props}>
            {actions && actions.map(action => {
                return <Render key={action} name="rowAction" props={{
                    actionName: action,
                    tableRow,
                }} />
            })}
        </BodyActionCell>
    }, [BodyActionCell])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} depNames={['tableHeaderRows', 'tableBodyRows', 'tableFooterRows']} />
        <Template name="cell" predicate={isHeaderActionCell}>
            {headerActionCellTemplate}
        </Template>
        <Template name="cell" predicate={isBodyActionCell}>
            {bodyActionCellTemplate}
        </Template>
    </Plugin>
}