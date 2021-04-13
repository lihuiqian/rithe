import { Plugin } from "@rithe/plugin";
import { Arrays, Records, Sets, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback } from "react";
import { DataGridColumnVisibilityToolbarButton, DataGridColumnVisibilityToolbarButtonProps } from "../components/columnVisibility/DataGridColumnVisibilityToolbarButton";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { Column } from "../types/Column";
import { TableColumn } from "../types/TableColumn";

interface ColumnSetting {
    disableUserControl?: boolean,
}

export interface ColumnVisibilityProps {
    hiddenFields?: string[],
    onHiddenFieldsChange?: (hiddenFields: string[]) => void,
    defaultHiddenFields?: string[],
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    ToolbarButton?: ComponentType<DataGridColumnVisibilityToolbarButtonProps>,
}

export const ColumnVisibility = (props: ColumnVisibilityProps) => {
    const {
        disableUserControl = false,
        ToolbarButton = DataGridColumnVisibilityToolbarButton,
    } = props

    const [hiddenFields, setHiddenFields] = useMixed(props.hiddenFields, props.onHiddenFieldsChange, props.defaultHiddenFields, [])
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableColumns
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        if (tableColumns.length === 0 || hiddenFields.length === 0) return tableColumns

        const hiddenFieldSet = Sets.from(hiddenFields)
        return tableColumns.filter(({ field }) => !hiddenFieldSet.has(field))
    }, [hiddenFields])

    // Template toolbarAction
    const canSeeToolbarAction = useCallback(() => !disableUserControl, [disableUserControl])
    const toolbarActionTemplate = useCallback((_, columns: Column[] = []) => {
        const disabledFields = Array.from(Records.entries(columnSettings)).filter(([, setting]) => setting.disableUserControl).map(([key]) => key)
        const switchColumnVisibility = (field: string) => {
            setHiddenFields(Arrays.symmetricDifference(hiddenFields, [field]))
        }
        return <>
            <Render />
            <ToolbarButton
                columns={columns}
                hiddenFields={hiddenFields}
                disabledFields={disabledFields}
                switchColumnVisibility={switchColumnVisibility}
            />
        </>
    }, [ToolbarButton, columnSettings, hiddenFields, setHiddenFields])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="toolbarAction" stateNames={['columns']} predicate={canSeeToolbarAction}>
            {toolbarActionTemplate}
        </Template>
    </Plugin>
}