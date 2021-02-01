import { Plugin } from "@rithe/plugin"
import { Arrays, Records, useMixed } from "@rithe/utils"
import React, { ComponentType, useCallback, useEffect, useMemo, useRef } from "react"
import { DataGridGroupingCell, DataGridGroupingCellProps } from "../components/DataGridGroupingCell"
import { DataGridGroupingContent, DataGridGroupingContentProps } from "../components/DataGridGroupingContent"
import { DataGridGroupingPanelProps, GroupingPanel, GroupingPanelProps } from "../components/GroupingPanel"
import { GroupingPanelItem, GroupingPanelItemProps } from "../components/GroupingPanelItem"
import { TableBodyCell, TableBodyCellProps } from "../components/TableBodyCell"
import { TableBodyRow, TableBodyRowProps } from "../components/TableBodyRow"
import { TableCellContent, TableCellContentProps } from "../components/TableCellContent"
import { TableExpandButton, TableExpandButtonProps } from "../components/TableExpandButton"
import { TableHeaderCell, TableHeaderCellProps } from "../components/TableHeaderCell"
import { Render } from "../Render"
import { State } from "../State"
import { Template } from "../Template"
import { Column } from "../types/Column"
import { TableColumn } from "../types/TableColumn"
import { TableRow } from "../types/TableRow"
import { BodyContentProps, CellProps, ContentProps, RowProps } from "../types/TemplateBaseProps"
import { DATA_TYPE, GROUPING_TYPE } from "../utils/constants"
import { isGroupingCell, isGroupingContent, isGroupingExpandCell, isGroupingExpandContent, isGroupingRow, isHeaderGroupingExpandCell, isHeaderGroupingExpandContent } from "../utils/helpers"

export interface GroupingOption {
    field: string,
    criteria?: (value: any) => any,
    disableUserControl?: boolean,
    removeWhenGrouped?: boolean,
}

export interface GroupingProps {
    groupingFields?: string[],
    onGroupingFieldsChange?: (groupingFields: string[]) => void,
    defaultGroupingFields?: string[],
    expandedGroups?: any[][],
    onExpandedGroupsChange?: (expandedGroups: any[][]) => void,
    defaultExpandedGroups?: any[][],
    disableUserControl?: boolean,
    options?: GroupingOption[],
    panelComponent?: ComponentType<GroupingPanelProps>,
    panelItemComponent?: ComponentType<GroupingPanelItemProps>,
    headerExpandCellComponent?: ComponentType<TableHeaderCellProps>,
    headerExpandContentComponent?: ComponentType<TableCellContentProps>,
    groupingRowComponent?: ComponentType<TableBodyRowProps>,
    expandCellComponent?: ComponentType<TableBodyCellProps>,
    expandContentComponent?: ComponentType<TableCellContentProps>,
    expandButtonComponent?: ComponentType<TableExpandButtonProps>,
    cellComponent?: ComponentType<DataGridGroupingCellProps>,
    contentComponent?: ComponentType<DataGridGroupingContentProps>,
}

export const Grouping = (props: GroupingProps) => {
    const {
        disableUserControl,
        options,
        panelComponent: Panel = GroupingPanel,
        panelItemComponent: PanelItem = GroupingPanelItem,
        headerExpandCellComponent: HeaderExpandCell = TableHeaderCell,
        headerExpandContentComponent: HeaderExpandContent = TableCellContent,
        groupingRowComponent: GroupingRow = TableBodyRow,
        expandCellComponent: ExpandCell = TableBodyCell,
        expandContentComponent: ExpandContent = TableCellContent,
        expandButtonComponent: ExpandButton = TableExpandButton,
        cellComponent: CellComponent = DataGridGroupingCell,
        contentComponent: ContentComponent = DataGridGroupingContent,
    } = props
    const [groupingFields, setGroupingFields] = useMixed(props.groupingFields, props.onGroupingFieldsChange, props.defaultGroupingFields)
    const [expandedGroups, setExpandedGroups] = useMixed(props.expandedGroups, props.onExpandedGroupsChange, props.defaultExpandedGroups)

    const expandedGroupsRef = useRef(expandedGroups)
    useEffect(() => { expandedGroupsRef.current = expandedGroups }, [expandedGroups])
    const expandedRecord = useMemo(() => {

    }, [])
    const onExpandedChange = useCallback((expandKey: string, expanded: boolean) => {
        const expandedGroups = expandedGroupsRef.current
        if (expanded) {
            if (expandedGroups) {
                const index = expandedGroups.findIndex(expandedGroup => Arrays.shallowEquals(expandedGroup, group))
                index < 0 && setExpandedGroups([...expandedGroups, group])
            } else {
                setExpandedGroups([group])
            }
        } else {
            if (expandedGroups) {
                const index = expandedGroups.findIndex(expandedGroup => Arrays.shallowEquals(expandedGroup, group))
                index >= 0 && setExpandedGroups(Arrays.splice(expandedGroups, index, 1))
            }
        }
    }, [setExpandedGroups])

    const expandTableColumn = useExpandTableColumn()
    const tableColumnsComputed = useTableColumnsComputed(expandTableColumn, groupingFields, options)
    const tableRowsComputed = useTableRowsComputed(groupingFields, options)
    const expandedComputed = useExpandedComputed(expandedGroups)

    const toolbarContentTempalte = useToolbarContentTempalte(Panel)
    const headerExpandCellTemplate = useHeaderExpandCellTemplate(HeaderExpandCell)
    const headerExpandContentTemplate = useHeaderExpandContentTemplate(HeaderExpandContent)
    const groupingRowTemplate = useGroupingRowTemplate(GroupingRow, expandTableColumn)
    const expandCellTemplate = useExpandCellTemplate(ExpandCell)
    const expandContentTemplate = useExpandContentTemplate(ExpandContent, ExpandButton,)

    const expandContentTemplate = useCallback((props: BodyContentProps) => {
        const { } = props
        return <ExpandContentComponent level>
            <ExpandButtonComponent
                group={tableRow.group!}
                expanded={!!tableRow.expanded}
                onExpandedChange={onExpandedChange}
            />
        </ExpandContentComponent>
    }, [])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <State name="tableBodyRows" computed={tableRowsComputed} depNames={['columns']} />
        <State name="tableBodyRows" computed={expandedComputed} depNames={['columns']} />
        {disableUserControl || <Template name="toolbarContent">
            {toolbarContentTempalte}
        </Template>}
        <Template name="bodyRow" predicate={({ rowType }) => isGroupingRow(rowType)}>
            {groupingRowTemplate}
        </Template>
        <Template name="headerCell" predicate={({ colType, rowType }) => isHeaderGroupingExpandCell(colType, rowType)}>
            {headerExpandCellTemplate}
        </Template>
        <Template name="headerContent" predicate={({ colType, rowType }) => isHeaderGroupingExpandContent(colType, rowType)}>
            {headerExpandContentTemplate}
        </Template>
        <Template name="bodyCell" predicate={({ colType, rowType }) => isGroupingExpandCell(colType, rowType)}>
            {expandCellTemplate}
        </Template>
        <Template name="bodyContent" predicate={({ colType, rowType }) => isGroupingExpandContent(colType, rowType)}>
            {expandContentTemplate}
        </Template>
        <Template name="bodyCell" predicate={({ colType, rowType }) => isGroupingCell(colType, rowType)}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) => {
                return <ExpandCellComponent
                    tableColumn={tableColumn}
                    tableRow={tableRow}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                >
                    <Render name="cellContent" props={{ tableColumn, tableRow }} />
                </ExpandCellComponent>
            }}
        </Template>
        <Template name="bodyContent" predicate={({ colType, rowType }) => isGroupingContent(colType, rowType)}>
            {({ tableColumn, tableRow }) => {
                return <ContentComponent>
                    {tableRow.group!.join(', ')}
                </ContentComponent>
            }}
        </Template>
    </Plugin>
}

const useExpandTableColumn = () => {
    return useMemo<TableColumn>(() => ({
        key: '_GROUPING_EXPAND_',
        type: GROUPING_TYPE,
        width: 120, // TODO
    }), [])
}

const useVirtualTableColumn = () => {
    return useMemo<TableColumn>(() => ({
        key: '_GROUPING_VIRTUAL_',
        type: DATA_TYPE,
        width: 120, // TODO
    }), [])
}

const useTableColumnsComputed = (expandTableColumn: TableColumn, groupingFields?: string[], options?: GroupingOption[]) => {
    return useCallback((tableColumns?: TableColumn[]) => {
        if (!tableColumns || tableColumns.length === 0
            || !groupingFields || groupingFields.length === 0
            || !options || options.length === 0) return [expandTableColumn, ...(tableColumns ?? [])]

        const fieldsRemoveWhenGrouped = options.filter(option => option.removeWhenGrouped).map(option => option.field)
        if (fieldsRemoveWhenGrouped.length === 0) return [expandTableColumn, ...tableColumns]

        const removingFields = Arrays.intersection(fieldsRemoveWhenGrouped, groupingFields)
        if (removingFields.length === 0) return [expandTableColumn, ...tableColumns]

        return [expandTableColumn, ...tableColumns.filter(tableColumn => !tableColumn.column || removingFields.indexOf(tableColumn.column.field) < 0)]
    }, [expandTableColumn, groupingFields, options])
}

const useTableRowsComputed = (groupingFields?: string[], options?: GroupingOption[]) => {
    return useCallback((tableRows?: TableRow[], columns?: Column[]) => {
        if (!tableRows || tableRows.length === 0
            || !columns || columns.length === 0
            || !groupingFields || groupingFields.length === 0) return tableRows

        const checkedFields = Arrays.intersection(groupingFields, columns.map(c => c.field))
        if (checkedFields.length === 0) return tableRows

        const criteriaRecord = Records.from((options ?? []).filter(o => o.criteria).map(o => [o.field, o.criteria]))
        const getValueRecord = Records.from(columns.filter(c => c.getCellValue).map(c => [c.field, c.getCellValue]))
        const tree = new Tree()
        tableRows.forEach(tableRow => {
            const row = tableRow.row
            if (!row) return
            const group: any[] = []
            checkedFields.forEach(field => {
                const getValue = getValueRecord[field]
                const value = getValue ? getValue(row) : row[field]
                const criteria = criteriaRecord[field]
                const groupValue = criteria ? criteria(value) : value
                group.push(groupValue)
            })
            tree.append(group, tableRow)
        })
        return tree.output()
    }, [groupingFields, options])
}

const useExpandedComputed = (expandedGroups?: any[][]) => {
    return useCallback((tableRows?: TableRow[]) => {
        if (!tableRows || tableRows.length === 0) return tableRows

        const control: boolean[] = []
        return tableRows.map(tr => {
            const level = tr.level!
            const hidden = !control.slice(0, level - 1).reduce((acc, ctrl) => acc && ctrl, true)
            if (isGroupingRow(tr.type)) {
                const group = tr.group!
                let expanded = false
                if (expandedGroups) {
                    for (const expandedGroup of expandedGroups) {
                        if (Arrays.shallowEquals(group, expandedGroup)) {
                            expanded = true
                            break
                        }
                    }
                }
                control.splice(level - 1, control.length, expanded)
                return expanded || hidden ? { ...tr, expanded, hidden } : tr
            } else {
                return hidden ? { ...tr, hidden } : tr
            }
        })
    }, [expandedGroups])
}

const useToolbarContentTempalte = (PanelComponent: ComponentType<DataGridGroupingPanelProps>) => {
    return useCallback(() => {
        return <>
            <Render />
            <PanelComponent>GROUP PANEL</PanelComponent>
        </>
    }, [PanelComponent])
}

const useHeaderExpandCellTemplate = (HeaderExpandCell: ComponentType<TableHeaderCellProps>) => {
    return useCallback(({ width, colSpan, rowSpan, freeze, left, right, tableColumns, tableRows }: CellProps) => {
        return <HeaderExpandCell
            width={width}
            colSpan={colSpan}
            rowSpan={rowSpan}
            freeze={freeze}
            left={left}
            right={right}
            tableColumns={tableColumns}
            tableRows={tableRows}
        >
            <Render name="content" props={{
                align: 'start',
                tableColumns,
                tableRows,
            }} />
        </HeaderExpandCell>
    }, [HeaderExpandCell])
}

const useHeaderExpandContentTemplate = (HeaderExpandContent: ComponentType<TableCellContentProps>) => {
    return useCallback(({ align, tableColumns, tableRows }: ContentProps) => {
        return <HeaderExpandContent
            align={align}
            tableColumns={tableColumns}
            tableRows={tableRows}
        >
            {'TODO'}
        </HeaderExpandContent>
    }, [HeaderExpandContent])
}

const useGroupingRowTemplate = (GroupingRow: ComponentType<TableBodyRowProps>, expandTableColumn: TableColumn) => {
    return useCallback(({ height, tableRow }: RowProps, tableColumns: TableColumn[]) => {
        const index = tableColumns.indexOf(expandTableColumn)
        const leftTableColumns = tableColumns.slice(0, index)
        const rightTableColumns = tableColumns.slice(index + 1)
        const left = leftTableColumns.map(tc => tc.width).reduce((a, b) => a + b, 0)
        const right = rightTableColumns.map(tc => tc.width).reduce((a, b) => a + b, 0)
        return <GroupingRow
            height={height}
            tableRow={tableRow}
        >
            <Render name="cell" props={{
                width: expandTableColumn.width,
                colSpan: 1,
                rowSpan: 1,
                freeze: 'none',
                left,
                right,
                tableColumns: [expandTableColumn],
                tableRows: [tableRow],
            }} />
            <Render name="cell" props={{
                width: right,
                colSpan: rightTableColumns.length,
                rowSpan: 1,
                freeze: 'none',
                left: left + expandTableColumn.width,
                right: 0,
                tableColumns: rightTableColumns,
                tableRows: [tableRow],
            }} />
        </GroupingRow>
    }, [GroupingRow, expandTableColumn])
}

const useExpandCellTemplate = (ExpandCell: ComponentType<TableBodyCellProps>) => {
    return useCallback(({ width, colSpan, rowSpan, freeze, left, right, tableColumns, tableRows }: CellProps) => {
        return <ExpandCell
            width={width}
            colSpan={colSpan}
            rowSpan={rowSpan}
            freeze={freeze}
            left={left}
            right={right}
            tableColumns={tableColumns}
            tableRows={tableRows}
        >
            <Render name="content" props={{
                align: 'start',
                tableColumns,
                tableRows,
            }} />
        </ExpandCell>
    }, [ExpandCell])
}

const useExpandContentTemplate = (
    ExpandContent: ComponentType<TableCellContentProps>,
    ExpandButton: ComponentType<TableExpandButtonProps>,
    expandedRecord: Record<string, boolean>,
    onExpandedChange: (expandKey: string, expanded: boolean) => void,
) => {
    return useCallback(({ align, tableColumns, tableRows }: ContentProps) => {
        const { key } = tableRows[0]
        const expandKey = key
        const expanded = expandedRecord[key]
        return <ExpandContent
            align={align}
            tableColumns={tableColumns}
            tableRows={tableRows}
        >
            <ExpandButton
                expandKey={expandKey}
                expanded={expanded}
                onExpandedChange={onExpandedChange}
            />
        </ExpandContent>
    }, [ExpandButton, ExpandContent, expandedRecord, onExpandedChange])
}

interface Node {
    tableRow: TableRow
    children: Node[]
    isLeaf: boolean
}