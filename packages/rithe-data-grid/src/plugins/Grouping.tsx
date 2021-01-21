import { Plugin } from "@rithe/plugin"
import { Arrays } from "@rithe/utils"
import React, { ComponentType, useCallback } from "react"
import { DataGridGroupingCellProps } from "../components/DataGridGroupingCell"
import { DataGridGroupingContentProps } from "../components/DataGridGroupingContent"
import { DataGridGroupingExpandButtonProps } from "../components/DataGridGroupingExpandButton"
import { DataGridGroupingPanelProps } from "../components/DataGridGroupingPanel"
import { DataGridGroupingPanelItemProps } from "../components/DataGridGroupingPanelItem"
import { DataGridGroupingRowProps } from "../components/DataGridGroupingRow"
import useMixed from "../hooks/useMixed"
import { State } from "../State"
import { TableColumn } from "../types/TableColumn"

export interface GroupingOption {
    field: string,
    criteria?: (value: any) => {
        key: string,
        value: any,
    },
    disableUserControl?: boolean,
    removeWhenGrouped?: boolean,
}

export interface GroupingProps {
    groupingFields?: string[],
    onGroupingFieldsChange?: (groupingFields: string[]) => void,
    defaultGroupingFields?: string[],
    expandedGroups?: { key: string, value?: any[] }[],
    onExpandedGroupsChange?: (expandedGroups: { key: string, value?: any[] }[]) => void,
    defaultExpandedGroups?: { key: string, value?: any[] }[],
    disableUserControl?: boolean,
    options?: GroupingOption[],
    panelComponent?: ComponentType<DataGridGroupingPanelProps>,
    panelItemComponent?: ComponentType<DataGridGroupingPanelItemProps>,
    rowComponent?: ComponentType<DataGridGroupingRowProps>,
    cellComponent?: ComponentType<DataGridGroupingCellProps>,
    indentComponent?: ComponentType<DataGridGroupingCellProps>,
    expandButtonComponent?: ComponentType<DataGridGroupingExpandButtonProps>,
    contentComponent?: ComponentType<DataGridGroupingContentProps>,
}

export const Grouping = (props: GroupingProps) => {
    const { options } = props
    const [groupingFields, setGroupingFields] = useMixed(props.groupingFields, props.onGroupingFieldsChange, props.defaultGroupingFields)
    const [expandedGroups, setExpandedGroups] = useMixed(props.expandedGroups, props.onExpandedGroupsChange, props.defaultExpandedGroups)

    const tableColumnsComputed = useTableColumnsComputed(groupingFields, options)

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
    </Plugin>
}


const useTableColumnsComputed = (groupingFields?: string[], options?: GroupingOption[]) => {
    return useCallback((tableColumns?: TableColumn[]) => {
        if (!tableColumns || tableColumns.length === 0
            || !groupingFields || groupingFields.length === 0
            || !options || options.length === 0) return tableColumns

        const fieldsRemoveWhenGrouped = options.filter(option => option.removeWhenGrouped).map(option => option.field)
        if (fieldsRemoveWhenGrouped.length === 0) return tableColumns

        const removingFields = Arrays.intersection(fieldsRemoveWhenGrouped, groupingFields)
        if (removingFields.length === 0) return tableColumns

        return tableColumns.filter(tableColumn => !tableColumn.column || removingFields.indexOf(tableColumn.column.field) < 0)
    }, [groupingFields, options])
}