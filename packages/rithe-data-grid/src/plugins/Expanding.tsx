import { Plugin } from "@rithe/plugin";
import { Arrays, Records, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell";
import { DataGridHeaderCell, DataGridHeaderCellProps } from "../components/basic/DataGridHeaderCell";
import { DataGridExpandingBodyButton, DataGridExpandingBodyButtonProps } from "../components/expanding/DataGridExpandingBodyButton";
import { DataGridExpandingBodyRow, DataGridExpandingBodyRowProps } from "../components/expanding/DataGridExpandingBodyRow";
import { DataGridExpandingHeaderButton, DataGridExpandingHeaderButtonProps } from "../components/expanding/DataGridExpandingHeaderButton";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps, RowProps } from "../TemplateBaseProps";
import { RowId } from "../types/RowId";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { EXPAND_TYPE } from "../utils/constants";
import { isBodyExpandCell, isBodyExpandRow, isHeaderExpandCell } from "../utils/helpers";
import { loopTableBodyCells } from "../utils/loopTableBodyCells";
import { updateTableColumn } from "../utils/updateTableColumn";
import { updateTableRow } from "../utils/updateTableRow";

export interface ExpandingProps {
    expandedRowIds?: RowId[],
    onExpandedRowIdsChange?: (expandedRowIds: RowId[]) => void,
    defaultExpandedRowIds?: RowId[],
    showExpandAll?: boolean,
    expandByRowClick?: boolean,
    width?: number,
    HeaderExpandCell?: ComponentType<DataGridHeaderCellProps>,
    HeaderExpandButton?: ComponentType<DataGridExpandingHeaderButtonProps>,
    BodyExpandRow?: ComponentType<DataGridExpandingBodyRowProps>,
    BodyExpandCell?: ComponentType<DataGridBodyCellProps>,
    BodyExpandButton?: ComponentType<DataGridExpandingBodyButtonProps>,
}

export const Expanding = (props: ExpandingProps) => {
    const {
        showExpandAll = false,
        expandByRowClick = false,
        width,
        HeaderExpandCell = DataGridHeaderCell,
        HeaderExpandButton = DataGridExpandingHeaderButton,
        BodyExpandRow = DataGridExpandingBodyRow,
        BodyExpandCell = DataGridBodyCell,
        BodyExpandButton = DataGridExpandingBodyButton,
    } = props
    const [expandedRowIds, setExpandedRowIds] = useMixed(props.expandedRowIds, props.onExpandedRowIdsChange, props.defaultExpandedRowIds, [])

    // State tableColumns, add expand column
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = [], tableBodyRows: TableRow[] = []) => {
        const hasExpandColumn = tableBodyRows.map(tableRow => tableRow.childRows && tableRow.childRows.length > 0).reduce((a, b) => a || b, false)
        const depth = getRowIdsOfEachLevel(tableBodyRows).length
        const hasFreezeStart = tableColumns.map(tableColumn => tableColumn.freezePosition === 'start').reduce((a, b) => a || b, false)
        if (!hasExpandColumn) return tableColumns
        return [updateTableColumn(undefined, {
            type: EXPAND_TYPE,
            field: EXPAND_TYPE.toString(),
            width: width ?? (depth - 1) * 32 + 16,
            freezePosition: hasFreezeStart ? 'start' : undefined,
        }, tableColumnsCacheRef.current), ...tableColumns]
    }, [width])

    // State tableRows, calculate expanded rows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = []) => {
        const expandedRowIdRecord = Records.from(expandedRowIds.map(rowId => [rowId, true]))
        function recursion(tableRow: TableRow, level: number): TableRow {
            const expanded = expandedRowIdRecord[tableRow.rowId]
            const childRows = tableRow.childRows ? tableRow.childRows.map(childRow => recursion(childRow, level + 1)) : undefined
            return updateTableRow(tableRow, {
                expanded,
                level,
                childRows,
            }, tableBodyRowsCacheRef.current)
        }
        return tableBodyRows.map(tableRow => recursion(tableRow, 0))
    }, [expandedRowIds])

    // Template headerExpandCell
    const isHeaderCellCanExpand = useCallback((props: CellProps) => isHeaderExpandCell(props) && showExpandAll, [showExpandAll])
    const headerExpandCellTemplate = useCallback((props: CellProps, tableBodyRows: TableRow[] = []) => {
        const levels = getRowIdsOfEachLevel(tableBodyRows)
        const switchLevelExpand = (level: number) => {
            const rowIds = levels[level]
            if (!rowIds) return
            if (Arrays.difference(rowIds, expandedRowIds).length === 0) {
                setExpandedRowIds(Arrays.difference(expandedRowIds, rowIds))
            } else {
                setExpandedRowIds(Arrays.union(expandedRowIds, Arrays.range(0, level + 1).flatMap(level => levels[level])))
            }
        }
        const expandeds = Arrays.skipLast(levels.map(rowIds => Arrays.difference(rowIds, expandedRowIds).length === 0), 1)
        return <HeaderExpandCell align="start" {...props}>
            <HeaderExpandButton
                expandeds={expandeds}
                switchLevelExpand={switchLevelExpand}
            />
        </HeaderExpandCell>
    }, [HeaderExpandButton, HeaderExpandCell, expandedRowIds, setExpandedRowIds])

    // Template expandRow
    const bodyExpandRowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = []) => {
        const { tableRow } = props
        const rowId = tableRow.rowId
        const expand = () => {
            setExpandedRowIds(Arrays.symmetricDifference(expandedRowIds, [rowId]))
        }
        return <BodyExpandRow {...props} expand={expandByRowClick ? expand : undefined} >
            {loopTableBodyCells(tableRow, tableColumns)}
        </BodyExpandRow>
    }, [BodyExpandRow, expandByRowClick, expandedRowIds, setExpandedRowIds])

    // Template bodyExpandCell
    const isBodyCellCanExpand = useCallback((props: CellProps) => isBodyExpandCell(props) && !!props.tableRows[0].childRows && props.tableRows[0].childRows.length > 0, [])
    const bodyExpandCellTemplate = useCallback((props: CellProps) => {
        const { rowId, level, expanded } = props.tableRows[0]
        const toggle = () => {
            setExpandedRowIds(Arrays.symmetricDifference(expandedRowIds, [rowId]))
        }
        return <BodyExpandCell align="start" {...props}>
            <BodyExpandButton
                level={level!}
                expanded={!!expanded}
                toggle={toggle}
            />
        </BodyExpandCell>
    }, [BodyExpandButton, BodyExpandCell, expandedRowIds, setExpandedRowIds])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} depNames={['tableBodyRows']} />
        <State name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template name="cell" predicate={isHeaderCellCanExpand} stateNames={['tableBodyRows']}>
            {headerExpandCellTemplate}
        </Template>
        <Template name="row" predicate={isBodyExpandRow} stateNames={['tableColumns']}>
            {bodyExpandRowTemplate}
        </Template>
        <Template name="cell" predicate={isBodyCellCanExpand}>
            {bodyExpandCellTemplate}
        </Template>
    </Plugin>
}

function getRowIdsOfEachLevel(tableRows: TableRow[]) {
    const levels: RowId[][] = []
    let currentLevelRows = [...tableRows]
    while (currentLevelRows.length > 0) {
        levels.push(currentLevelRows.map(tableRow => tableRow.rowId))
        currentLevelRows = currentLevelRows.filter(tableRow => tableRow.childRows !== undefined)
            .flatMap(tableRow => tableRow.childRows!)
    }
    return levels
}