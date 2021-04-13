import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridRowActionProps } from "../components/basic/DataGridRowAction";
import { State } from "../State";
import { Template } from "../Template";
import { RowActionProps } from "../TemplateBaseProps";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE } from "../utils/constants";
import { updateTableRow } from "../utils/updateTableRow";

export interface RowActionProviderProps {
    name: string,
    display?: (row: Row) => boolean,
    Action: ComponentType<DataGridRowActionProps>,
}

export const RowActionProvider = (props: RowActionProviderProps) => {
    const {
        name,
        display,
        Action,
    } = props

    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = []) => {
        function recursion(tableRow: TableRow): TableRow {
            const childRows = tableRow.childRows ? tableRow.childRows.map(recursion) : undefined
            let actions = tableRow.actions
            if (tableRow.type === DATA_TYPE && (!display || display(tableRow.row!))) {
                actions = actions ? [...actions, name] : [name]
            }
            return updateTableRow(tableRow, {
                childRows,
                actions,
            }, tableBodyRowsCacheRef.current)
        }
        return tableBodyRows.map(recursion)
    }, [display, name])

    const isCurrentAction = useCallback((props: RowActionProps) => props.actionName === name, [name])
    const rowActionTemplate = useCallback((props: RowActionProps) => {
        return <Action row={props.tableRow.row!} />
    }, [Action])

    return <Plugin>
        <State name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template name="rowAction" predicate={isCurrentAction} >
            {rowActionTemplate}
        </Template>
    </Plugin >
}