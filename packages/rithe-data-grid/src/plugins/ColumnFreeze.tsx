import { Plugin } from "@rithe/plugin";
import { Records, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridColumnFreezeAction, DataGridColumnFreezeActionProps } from "../components/columnFreeze/DataGridColumnFreezeAction";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { State } from "../State";
import { Template } from "../Template";
import { ColumnActionProps } from "../TemplateBaseProps";
import { FreezePosition } from "../types/FreezePosition";
import { TableColumn } from "../types/TableColumn";
import { COLUMN_FREEZE_ACTION_KEY } from "../utils/constants";
import { updateTableColumn } from "../utils/updateTableColumn";

interface ColumnSetting {
    disableUserControl?: boolean,
}

export interface ColumnFreezeProps {
    freeze?: Record<string, FreezePosition>,
    onFreezeChange?: (freeze: Record<string, FreezePosition>) => void,
    defaultFreeze?: Record<string, FreezePosition>,
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    MenuItem?: ComponentType<DataGridColumnFreezeActionProps>,
}

export const ColumnFreeze = (props: ColumnFreezeProps) => {
    const {
        disableUserControl = false,
        MenuItem = DataGridColumnFreezeAction,
    } = props

    const [freeze, setFreeze] = useMixed(props.freeze, props.onFreezeChange, props.defaultFreeze, {})
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableColumns
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        return tableColumns.map(tableColumn => {
            const freezePosition = freeze[tableColumn.field]
            const hasAction = !disableUserControl && !columnSettings[tableColumn.field]?.disableUserControl
            if (!hasAction) return tableColumn
            return updateTableColumn(tableColumn, {
                freezePosition,
                actions: [...(tableColumn.actions ?? []), COLUMN_FREEZE_ACTION_KEY],
            }, tableColumnsCacheRef.current)
        })
    }, [columnSettings, disableUserControl, freeze])

    // Template columnAction
    const isCurrentAction = useCallback((props: ColumnActionProps) => props.actionName === COLUMN_FREEZE_ACTION_KEY, [])
    const columnActionTemplate = useCallback((props: ColumnActionProps) => {
        const { tableColumn: { field, freezePosition } } = props
        const setFreezePosition = (field: string, position?: FreezePosition) => {
            if (position) {
                freeze[field] !== position && setFreeze(Records.set(freeze, [field, position]))
            } else {
                freeze[field] && setFreeze(Records.delete(freeze, field))
            }
        }
        return <MenuItem
            field={field}
            freezePosition={freezePosition}
            setFreezePosition={setFreezePosition}
        />
    }, [MenuItem, freeze, setFreeze])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="columnAction" predicate={isCurrentAction}>
            {columnActionTemplate}
        </Template>
    </Plugin>
}
