import { Plugin } from "@rithe/plugin"
import { Arrays, useMixed } from "@rithe/utils"
import React, { ComponentType, useCallback } from "react"
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell"
import { DataGridBodyRow, DataGridBodyRowProps } from "../components/basic/DataGridBodyRow"
import { DataGridGroupingFormatter, DataGridGroupingFormatterProps } from "../components/grouping/DataGridGroupingFormatter"
import { DataGridGroupingPanel, DataGridGroupingPanelProps } from "../components/grouping/DataGridGroupingPanel"
import { DataGridGroupingPanelItem, DataGridGroupingPanelItemProps } from "../components/grouping/DataGridGroupingPanelItem"
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings"
import { Render } from "../Render"
import { State } from "../State"
import { Template } from "../Template"
import { CellProps, RowProps } from "../TemplateBaseProps"
import { Column } from "../types/Column"
import { Row } from "../types/Row"
import { TableColumn } from "../types/TableColumn"
import { TableRow } from "../types/TableRow"
import { buildGetCellValue } from "../utils/buildGetCellValue"
import { DATA_TYPE, DEFAULT_ROW_HEIGHT, GROUPING_TYPE } from "../utils/constants"
import { isGroupingCell, isGroupingRow } from "../utils/helpers"
import { loopTableBodyCells } from "../utils/loopTableBodyCells"

const PAYLOAD_TYPE = '_GROUPING_'

interface ColumnSetting {
    criteria?: (value: any) => { key: string, value: any },
    disableUserControl?: boolean,
    removeWhenGrouped?: boolean,
}

export interface GroupingProps {
    groupingFields?: string[],
    onGroupingFieldsChange?: (groupingFields: string[]) => void,
    defaultGroupingFields?: string[],
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    Panel?: ComponentType<DataGridGroupingPanelProps>,
    PanelItem?: ComponentType<DataGridGroupingPanelItemProps>,
    GroupingRow?: ComponentType<DataGridBodyRowProps>,
    GroupingCell?: ComponentType<DataGridBodyCellProps>,
    GroupingFormatter?: ComponentType<DataGridGroupingFormatterProps>,
}

export const Grouping = (props: GroupingProps) => {
    const {
        disableUserControl = false,
        Panel = DataGridGroupingPanel,
        PanelItem = DataGridGroupingPanelItem,
        GroupingRow = DataGridBodyRow,
        GroupingCell = DataGridBodyCell,
        GroupingFormatter = DataGridGroupingFormatter,
    } = props
    const [groupingFields, setGroupingFields] = useMixed(props.groupingFields, props.onGroupingFieldsChange, props.defaultGroupingFields, [])
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableRows
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = [], columns: Column[] = []) => {
        if (groupingFields.length === 0) return tableBodyRows

        // getCriteria
        const getCellValue = buildGetCellValue(columns)
        const getCriteria = (row: Row, field: string) => {
            const value = getCellValue(row, field)
            const criteria = columnSettings[field]?.criteria
            return criteria ? criteria(value) : defaultCriteria(value)
        }

        // construct group tree
        const groupedRowRecord: Record<string, TableRow> = {}
        const rootRows: TableRow[] = []
        for (const tableRow of tableBodyRows) {
            if (tableRow.type !== DATA_TYPE) {
                rootRows.push(tableRow)
                continue
            }
            const criterias = groupingFields.map(field => getCriteria(tableRow.row!, field))
            const groups = Arrays.scan<{ key: string, value: any }, { key: string, value: any }[]>(criterias, (group, value) => [...group, value], [])
            let currentGroupRow: TableRow | undefined = undefined
            for (const group of groups) {
                const groupKey = groupToKey(group)
                let groupRow: TableRow = groupedRowRecord[groupKey]
                if (!groupRow) {
                    groupRow = {
                        type: GROUPING_TYPE,
                        row: { field: groupingFields[group.length - 1], ...group[group.length - 1] },
                        rowId: groupKey,
                        height: DEFAULT_ROW_HEIGHT,
                        childRows: [],
                    }
                    groupedRowRecord[groupKey] = groupRow
                    currentGroupRow ? currentGroupRow.childRows?.push(groupRow) : rootRows.push(groupRow)
                }
                currentGroupRow = groupRow
            }
            currentGroupRow!.childRows?.push(tableRow)
        }

        return rootRows
    }, [columnSettings, groupingFields])

    // Template toolbarContent
    const showToolbarPanel = useCallback(() => !disableUserControl, [disableUserControl])
    const toolbarContentTemplate = useCallback(() => {
        return <>
            <Render />
            <Panel payloadType={PAYLOAD_TYPE} groupingFields={groupingFields} setGroupingFields={setGroupingFields}>
                {groupingFields.map(field => {
                    return <PanelItem key={field}>{field}</PanelItem>
                })}
            </Panel>
        </>
    }, [Panel, PanelItem, groupingFields, setGroupingFields])

    // Template groupingRow
    const groupingRowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = []) => {
        const { tableRow } = props
        return <GroupingRow {...props}>
            {loopTableBodyCells(tableRow, tableColumns)}
        </GroupingRow>
    }, [GroupingRow])

    // Template groupingCell
    const groupingCellTemplate = useCallback((props: CellProps) => {
        const { tableRows: [tableRow] } = props
        const field = tableRow.row?.field
        const value = tableRow.row?.value
        const group = tableRow.row?.group
        return <GroupingCell align="start" {...props}>
            <GroupingFormatter
                field={field}
                value={value}
                group={group}
            />
        </GroupingCell>
    }, [GroupingCell, GroupingFormatter])

    return <Plugin>
        <State name="tableBodyRows" computed={tableBodyRowsComputed} depNames={['columns']} />
        <Template name="toolbarContent" predicate={showToolbarPanel}>
            {toolbarContentTemplate}
        </Template>
        <Template name="row" predicate={isGroupingRow} stateNames={['tableColumns']}>
            {groupingRowTemplate}
        </Template>
        <Template name="cell" predicate={isGroupingCell}>
            {groupingCellTemplate}
        </Template>
    </Plugin>
}

function defaultCriteria(value: any): { key: string, value: any } {
    if (typeof value === 'string') {
        return { key: value, value }
    } else if (typeof value === 'number') {
        return { key: value.toString(), value }
    } else if (typeof value === 'bigint') {
        return { key: value.toString(), value }
    } else if (typeof value === 'boolean') {
        return { key: value.toString(), value }
    } else if (value instanceof Date) {
        return { key: value.toString(), value }
    } else if (value instanceof Array) {
        return { key: value.map(defaultCriteria).toString(), value }
    } else {
        return { key: '' + value, value }
    }
}

function groupToKey(group: { key: string, value: any }[]): string {
    return JSON.stringify(group.map(({ key }) => key))
}
