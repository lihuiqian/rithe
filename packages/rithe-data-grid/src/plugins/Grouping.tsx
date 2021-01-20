import React, { ComponentType } from "react"
import { DataGridGroupingCellProps } from "../components/DataGridGroupingCell"
import { DataGridGroupingContentProps } from "../components/DataGridGroupingContent"
import { DataGridGroupingExpandButtonProps } from "../components/DataGridGroupingExpandButton"
import { DataGridGroupingPanelProps } from "../components/DataGridGroupingPanel"
import { DataGridGroupingPanelItemProps } from "../components/DataGridGroupingPanelItem"
import { DataGridGroupingRowProps } from "../components/DataGridGroupingRow"

export interface GroupingProps {
    groupingFields?: string[],
    onGroupingFieldsChange?: (groupingFields: string[]) => void,
    defaultGroupingFields?: string[],
    expandedGroups?: { key: string, value?: any[] }[],
    onExpandedGroupsChange?: (expandedGroups: { key: string, value?: any[] }[]) => void,
    defaultExpandedGroups?: { key: string, value?: any[] }[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        criteria?: (value: any) => {
            key: string,
            value: any,
        },
        disableUserControl?: boolean,
        removeWhenGrouped?: boolean,
    },
    panelComponent?: ComponentType<DataGridGroupingPanelProps>,
    panelItemComponent?: ComponentType<DataGridGroupingPanelItemProps>,
    rowComponent?: ComponentType<DataGridGroupingRowProps>,
    cellComponent?: ComponentType<DataGridGroupingCellProps>,
    indentComponent?: ComponentType<DataGridGroupingCellProps>,
    expandButtonComponent?: ComponentType<DataGridGroupingExpandButtonProps>,
    contentComponent?: ComponentType<DataGridGroupingContentProps>,
}

export const Grouping = (props: GroupingProps) => {

    return <></>
}