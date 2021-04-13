import { Plugin } from "@rithe/plugin";
import { Arrays, Comparator, Comparators, useMixed } from "@rithe/utils";
import React, { ComponentType, MouseEvent, useCallback, useRef } from "react";
import { DataGridSortingAction, DataGridSortingActionProps } from "../components/sorting/DataGridSortingAction";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps, ColumnActionProps } from "../TemplateBaseProps";
import { Column } from "../types/Column";
import { Direction } from "../types/Direction";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { buildGetCellValue } from "../utils/buildGetCellValue";
import { DATA_TYPE, GROUPING_TYPE, SORTING_ACTION_KEY } from "../utils/constants";
import { isTitleCell } from "../utils/helpers";
import { updateTableColumn } from "../utils/updateTableColumn";
import { updateTableRow } from "../utils/updateTableRow";

interface ColumnSetting {
    disableUserControl?: boolean
    comparator?: Comparator<any>,
}

export interface SortingProps {
    sortings?: { field: string, direction: Direction }[],
    onSortingsChange?: (sortings: { field: string, direction: Direction }[]) => void,
    defaultSortings?: { field: string, direction: Direction }[],
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    MenuItem?: ComponentType<DataGridSortingActionProps>,
}

export const Sorting = (props: SortingProps) => {
    const {
        disableUserControl = false,
        MenuItem = DataGridSortingAction,
    } = props

    const [sortings, setSortings] = useMixed(props.sortings, props.onSortingsChange, props.defaultSortings, [])
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableColumns
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        return tableColumns.map(tableColumn => {
            const hasAction = !disableUserControl && !columnSettings[tableColumn.field]?.disableUserControl
            if (!hasAction) return tableColumn
            return updateTableColumn(tableColumn, {
                actions: [...(tableColumn.actions ?? []), SORTING_ACTION_KEY]
            }, tableColumnsCacheRef.current)
        })
    }, [columnSettings, disableUserControl])

    // State tableBodyRows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = [], columns: Column[] = []) => {
        if (sortings.length === 0) return tableBodyRows
        const getCellValue = buildGetCellValue(columns)
        const getColumnComparator = (field: string) => columnSettings[field]?.comparator ?? Comparators.natualOrder()

        const dataRowComparator = (row1: Row, row2: Row) => {
            for (const { field, direction } of sortings) {
                const value1 = getCellValue(row1, field), value2 = getCellValue(row2, field)
                const comparator = direction === 'asc' ? getColumnComparator(field) : Comparators.reverse(getColumnComparator(field))
                const cmp = comparator(value1, value2)
                if (cmp === 0) continue
                else return cmp
            }
            return 0
        }
        const groupRowComparator = (row1: Row, row2: Row) => {
            for (const { field, direction } of sortings) {
                if (row1.field !== field) continue
                const value1 = row1.value, value2 = row2.value
                const cmp = (direction === 'asc' ? Comparators.natualOrder() : Comparators.reverseOrder())(value1, value2)
                return cmp
            }
            return 0
        }

        function sort(tableRows: TableRow[]): TableRow[] {
            const rowType = tableRows[0]?.type
            if (rowType === DATA_TYPE) {
                return Arrays.sort(tableRows, Comparators.compare(tableRow => tableRow.row!, dataRowComparator))
            } else if (rowType === GROUPING_TYPE) {
                return Arrays.sort(tableRows, Comparators.compare(tableRow => tableRow.row!, groupRowComparator))
            } else {
                return tableRows
            }
        }

        function recursion(tableRow: TableRow): TableRow {
            let childRows = tableRow.childRows
            childRows && (childRows = sort(childRows.map(recursion)))
            return updateTableRow(tableRow, {
                childRows,
            }, tableBodyRowsCacheRef.current)
        }

        return sort(tableBodyRows.map(recursion))
    }, [columnSettings, sortings])

    // Template columnAction
    const isCurrentAction = useCallback((props: ColumnActionProps) => props.actionName === SORTING_ACTION_KEY, [])
    const columnActionTemplate = useCallback((props: ColumnActionProps) => {
        const { tableColumn: { field }, onClose } = props
        const direction = sortings.find(sorting => sorting.field === field)?.direction
        const switchAsc = () => setSortings(direction === 'asc' ? [] : [{ field, direction: 'asc' }])
        const switchDesc = () => setSortings(direction === 'desc' ? [] : [{ field, direction: 'desc' }])
        return <MenuItem
            direction={direction}
            switchAsc={switchAsc}
            switchDesc={switchDesc}
            onClose={onClose}
        />
    }, [MenuItem, setSortings, sortings])

    // Template sortingContent
    const isSortableSortingCell = useCallback((props: CellProps) => isTitleCell(props) && !disableUserControl && !columnSettings[props.tableColumns[0].field]?.disableUserControl, [columnSettings, disableUserControl])
    const sortableCellTemplate = useCallback((props: CellProps) => {
        const switchDirection = (e: MouseEvent<HTMLTableCellElement>) => {
            if (!(e.currentTarget as HTMLElement).contains(e.target as HTMLElement)) return
            const field = props.tableColumns[0].field
            const currentDirection = sortings.find(sorting => sorting.field === field)?.direction
            const nextDirection = currentDirection === 'asc' ? 'desc' : currentDirection === 'desc' ? undefined : 'asc'
            if (e.ctrlKey) {
                if (currentDirection) {
                    setSortings(nextDirection ? sortings.map(sorting => sorting.field === field ? { field, direction: nextDirection } : sorting) : sortings.filter(sorting => sorting.field !== field))
                } else {
                    setSortings(nextDirection ? [...sortings, { field, direction: nextDirection }] : sortings)
                }
            } else {
                setSortings(nextDirection ? [{ field, direction: nextDirection }] : [])
            }
        }
        return <Render override="cell" props={{
            onClick: switchDirection
        }} />
    }, [setSortings, sortings])

    return <Plugin>
        <State name="sortings" value={sortings} />
        <State name="tableColumns" computed={tableColumnsComputed} />
        <State name="tableBodyRows" computed={tableBodyRowsComputed} depNames={['columns']} />
        <Template name="columnAction" predicate={isCurrentAction}>
            {columnActionTemplate}
        </Template>
        <Template name="cell" predicate={isSortableSortingCell}>
            {sortableCellTemplate}
        </Template>
    </Plugin>
}