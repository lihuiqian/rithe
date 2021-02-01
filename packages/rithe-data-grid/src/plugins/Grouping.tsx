import { Plugin } from "@rithe/plugin"
import { Arrays, Records, useMixed } from "@rithe/utils"
import React, { ComponentType, useCallback, useEffect, useMemo, useRef } from "react"
import { DataGridGroupingCell, DataGridGroupingCellProps } from "../components/DataGridGroupingCell"
import { DataGridGroupingContent, DataGridGroupingContentProps } from "../components/DataGridGroupingContent"
import { DataGridGroupingExpandButton, DataGridGroupingExpandButtonProps } from "../components/DataGridGroupingExpandButton"
import { DataGridGroupingExpandCell, DataGridGroupingExpandCellProps } from "../components/DataGridGroupingExpandCell"
import { DataGridGroupingExpandContent, DataGridGroupingExpandContentProps } from "../components/DataGridGroupingExpandContent"
import { DataGridGroupingPanel, DataGridGroupingPanelProps } from "../components/DataGridGroupingPanel"
import { DataGridGroupingPanelItem, DataGridGroupingPanelItemProps } from "../components/DataGridGroupingPanelItem"
import { DataGridGroupingRow, DataGridGroupingRowProps } from "../components/DataGridGroupingRow"
import { Render } from "../Render"
import { State } from "../State"
import { Template } from "../Template"
import { Column } from "../types/Column"
import { TableColumn } from "../types/TableColumn"
import { TableRow } from "../types/TableRow"
import { BodyRowProps, HeaderCellProps } from "../types/TemplateBaseProps"
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
    panelComponent?: ComponentType<DataGridGroupingPanelProps>,
    panelItemComponent?: ComponentType<DataGridGroupingPanelItemProps>,
    rowComponent?: ComponentType<DataGridGroupingRowProps>,
    cellComponent?: ComponentType<DataGridGroupingCellProps>,
    expandCellComponent?: ComponentType<DataGridGroupingExpandCellProps>,
    contentComponent?: ComponentType<DataGridGroupingContentProps>,
    expandContentComponent?: ComponentType<DataGridGroupingExpandContentProps>,
    expandButtonComponent?: ComponentType<DataGridGroupingExpandButtonProps>,
}

export const Grouping = (props: GroupingProps) => {
    const {
        disableUserControl,
        options,
        panelComponent: PanelComponent = DataGridGroupingPanel,
        panelItemComponent: PanelItemComponent = DataGridGroupingPanelItem,
        rowComponent: RowComponent = DataGridGroupingRow,
        cellComponent: CellComponent = DataGridGroupingCell,
        expandCellComponent: ExpandCellComponent = DataGridGroupingExpandCell,
        contentComponent: ContentComponent = DataGridGroupingContent,
        expandContentComponent: ExpandContentComponent = DataGridGroupingExpandContent,
        expandButtonComponent: ExpandButtonComponent = DataGridGroupingExpandButton,
    } = props
    const [groupingFields, setGroupingFields] = useMixed(props.groupingFields, props.onGroupingFieldsChange, props.defaultGroupingFields)
    const [expandedGroups, setExpandedGroups] = useMixed(props.expandedGroups, props.onExpandedGroupsChange, props.defaultExpandedGroups)

    const expandedGroupsRef = useRef(expandedGroups)
    useEffect(() => { expandedGroupsRef.current = expandedGroups }, [expandedGroups])
    const onExpandedChange = useCallback((group: any[], expanded: boolean) => {
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
    const virtualTableColumn = useVirtualTableColumn()
    const tableColumnsComputed = useTableColumnsComputed(expandTableColumn, groupingFields, options)
    const tableRowsComputed = useTableRowsComputed(groupingFields, options)
    const expandedComputed = useExpandedComputed(expandedGroups)

    const toolbarContentTempalte = useCallback(() => {
        return <>
            <Render />
            <PanelComponent>GROUP PANEL</PanelComponent>
        </>
    }, [PanelComponent])

    const groupingRowTemplate = useCallback((props: BodyRowProps) => {
        const { height, rowType } = props
        return <RowComponent height={height}>
            <Render name="bodyCell" props={{
                colSpan: 1,
                rowSpan: 1,
                colType: GROUPING_TYPE,
                rowType,
            }} />
            <Render name="bodyCell" props={{
                colSpan: Number.MAX_SAFE_INTEGER,
                rowSpan: 1,
                colType: DATA_TYPE,
                rowType,
            }} />
        </RowComponent>
    }, [RowComponent])

    const headerExpandCellTemplate = useCallback((props: HeaderCellProps) => {
        const { title, colSpan, rowSpan, colType, rowType } = props
        return <CellComponent // TODO change component
            colSpan={colSpan}
            rowSpan={rowSpan}
            colType={colType}
            rowType={rowType}
        >
            <Render name="headerContent" props={{
                title,
                align: 'start',
                colType,
                rowType,
            }} />
        </CellComponent>
    }, [CellComponent])

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
        <Template name="bodyCell" predicate={({ colType, rowType }) => isGroupingExpandCell(colType, rowType)}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) => {
                return <CellComponent
                    tableColumn={tableColumn}
                    tableRow={tableRow}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                >
                    <Render name="cellContent" props={{ tableColumn, tableRow }} />
                </CellComponent>
            }}
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
        <Template name="headerContent" predicate={({ colType, rowType }) => isHeaderGroupingExpandContent(colType, rowType)}>
            {({ tableColumn, tableRow }) => {// TODO change component
                return <ExpandContentComponent>
                    {'GROUP'}
                </ExpandContentComponent>
            }}
        </Template>
        <Template name="bodyContent" predicate={({ colType, rowType }) => isGroupingExpandContent(colType, rowType)}>
            {({ tableColumn, tableRow }) => {
                return <ExpandContentComponent>
                    <ExpandButtonComponent
                        group={tableRow.group!}
                        expanded={!!tableRow.expanded}
                        onExpandedChange={onExpandedChange}
                    />
                </ExpandContentComponent>
            }}w
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


const useVirtualTableColumn = () => {
    return useMemo<TableColumn>(() => ({
        key: '_grouping_',
        type: DATA_TYPE,
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
            if (isGroupingRow(tr)) {
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

class Tree {

    private _root: Node[]
    private _key: number

    constructor() {
        this._root = []
        this._key = 0
    }

    append(group: any[], tableRow: TableRow) {
        let currentNodes = this._root
        const currentGroup: any[] = []
        for (const groupValue of group) {
            currentGroup.push(groupValue)
            let node = currentNodes.find(n => isGroupingRow(n.tableRow) && Arrays.shallowEquals(currentGroup, n.tableRow.group!))
            if (!node) {
                node = {
                    tableRow: {
                        key: `_group_${this._key++}`,
                        type: GROUPING_TYPE,
                        level: currentGroup.length,
                        group: currentGroup.slice(),
                        expanded: false,
                    },
                    children: [],
                    isLeaf: false,
                }
                currentNodes.push(node)
            }
            currentNodes = node.children
        }
        currentNodes.push({
            tableRow: {
                ...tableRow,
                level: currentGroup.length + 1,
            },
            children: [],
            isLeaf: true,
        })
    }

    output(): TableRow[] {
        const result = []
        const stack = []
        stack.push(...this._root.slice().reverse())
        for (let current = stack.pop(); current !== undefined; current = stack.pop()) {
            result.push(current.tableRow)
            current.isLeaf || stack.push(...current.children.slice().reverse())
        }
        return result
    }

}

interface Node {
    tableRow: TableRow
    children: Node[]
    isLeaf: boolean
}