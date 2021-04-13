import { Plugin } from "@rithe/plugin";
import { Arrays, Records, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell";
import { DataGridHeaderCell, DataGridHeaderCellProps } from "../components/basic/DataGridHeaderCell";
import { DataGridSelectionBodyCheckbox, DataGridSelectionBodyCheckboxProps } from "../components/selection/DataGridSelectionBodyCheckbox";
import { DataGridSelectionBodyRow, DataGridSelectionBodyRowProps } from "../components/selection/DataGridSelectionBodyRow";
import { DataGridSelectionHeaderCheckbox, DataGridSelectionHeaderCheckboxProps } from "../components/selection/DataGridSelectionHeaderCheckbox";
import { State } from "../State";
import { Template } from "../Template";
import { CellProps, RowProps } from "../TemplateBaseProps";
import { RowId } from "../types/RowId";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE, SELECTION_TYPE } from "../utils/constants";
import { isBodySelectionCell, isBodySelectionRow, isHeaderSelectionCell } from "../utils/helpers";
import { loopTableBodyCells } from "../utils/loopTableBodyCells";
import { updateTableColumn } from "../utils/updateTableColumn";
import { updateTableRow } from "../utils/updateTableRow";

export interface SelectionProps {
    selectedRowIds?: RowId[],
    onSelectedRowIdsChange?: (selectedRowIds: RowId[]) => void,
    defaultSelectedRowIds?: RowId[],
    showSelectAll?: boolean,
    highlightSelectedRow?: boolean,
    hideSelectionColumn?: boolean,
    selectByRowClick?: boolean,
    width?: number,
    HeaderSelectionCell?: ComponentType<DataGridHeaderCellProps>,
    HeaderSelectionCheckbox?: ComponentType<DataGridSelectionHeaderCheckboxProps>,
    BodySelectionRow?: ComponentType<DataGridSelectionBodyRowProps>,
    BodySelectionCell?: ComponentType<DataGridBodyCellProps>,
    BodySelectionCheckbox?: ComponentType<DataGridSelectionBodyCheckboxProps>,
}

export const Selection = (props: SelectionProps) => {
    const {
        showSelectAll = false,
        highlightSelectedRow = false,
        hideSelectionColumn = false,
        selectByRowClick = false,
        width = 40,
        HeaderSelectionCell = DataGridHeaderCell,
        HeaderSelectionCheckbox = DataGridSelectionHeaderCheckbox,
        BodySelectionRow = DataGridSelectionBodyRow,
        BodySelectionCell = DataGridBodyCell,
        BodySelectionCheckbox = DataGridSelectionBodyCheckbox,
    } = props

    const [selectedRowIds, setSelectedRowIds] = useMixed(props.selectedRowIds, props.onSelectedRowIdsChange, props.defaultSelectedRowIds, [])

    // State tableColumns
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsComputed = useCallback((tableColumns: TableColumn[] = []) => {
        if (hideSelectionColumn) return tableColumns
        const hasFreezeStart = tableColumns.map(tableColumn => tableColumn.freezePosition === 'start').reduce((a, b) => a || b, false)
        return [updateTableColumn(undefined, {
            type: SELECTION_TYPE,
            field: SELECTION_TYPE.toString(),
            width: width,
            freezePosition: hasFreezeStart ? 'start' : undefined,
        }, tableColumnsCacheRef.current), ...tableColumns]
    }, [hideSelectionColumn, width])

    // State tableBodyRows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = []) => {
        const selectedRowIdRecord = Records.from(selectedRowIds.map(rowId => [rowId, true]))
        function recursion(tableRow: TableRow): TableRow {
            const selected = selectedRowIdRecord[tableRow.rowId]
            let childRows = tableRow.childRows
            childRows && (childRows = childRows.map(recursion))
            return updateTableRow(tableRow, {
                selected,
                childRows,
            }, tableBodyRowsCacheRef.current)
        }
        return tableBodyRows.map(recursion)
    }, [selectedRowIds])

    // Template highlightedSelectedRow
    const bodyRowTemplate = useCallback((props: RowProps, tableColumns: TableColumn[] = []) => {
        const { tableRow } = props
        const rowId = tableRow.rowId
        const selected = selectedRowIds.indexOf(rowId) >= 0
        const select = () => setSelectedRowIds(Arrays.symmetricDifference(selectedRowIds, [rowId]))
        return <BodySelectionRow {...props} highlighted={highlightSelectedRow && selected} select={selectByRowClick ? select : undefined} >
            {loopTableBodyCells(tableRow, tableColumns)}
        </BodySelectionRow>
    }, [BodySelectionRow, highlightSelectedRow, selectByRowClick, selectedRowIds, setSelectedRowIds])

    // Template headerSelectionCell
    const headerSelectionCellTemplate = useCallback((props: CellProps, tableBodyRows: TableRow[] = []) => {
        if (!showSelectAll) return <HeaderSelectionCell align="center" {...props} />

        const allDataRowIds = getAllDataRowIds(tableBodyRows)
        const toggle = () => setSelectedRowIds(selectedRowIds.length < allDataRowIds.length ? allDataRowIds : [])
        return <HeaderSelectionCell align="center" {...props}>
            <HeaderSelectionCheckbox
                checked={selectedRowIds.length > 0}
                indeterminate={selectedRowIds.length < allDataRowIds.length && selectedRowIds.length > 0}
                toggle={toggle}
            />
        </HeaderSelectionCell>
    }, [HeaderSelectionCheckbox, HeaderSelectionCell, selectedRowIds.length, setSelectedRowIds, showSelectAll])

    // Template bodySelectionCell
    const bodySelectionCellTemplate = useCallback((props: CellProps) => {
        const rowId = props.tableRows[0].rowId
        const selected = selectedRowIds.indexOf(rowId) >= 0
        const toggle = () => setSelectedRowIds(Arrays.symmetricDifference(selectedRowIds, [rowId]))
        return <BodySelectionCell align="center" {...props}>
            <BodySelectionCheckbox
                checked={selected}
                toggle={toggle}
            />
        </BodySelectionCell>
    }, [BodySelectionCheckbox, BodySelectionCell, selectedRowIds, setSelectedRowIds])

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <State name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template name="row" predicate={isBodySelectionRow} stateNames={['tableColumns']}>
            {bodyRowTemplate}
        </Template>
        <Template name="cell" predicate={isHeaderSelectionCell} stateNames={['tableBodyRows']}>
            {headerSelectionCellTemplate}
        </Template>
        <Template name="cell" predicate={isBodySelectionCell}>
            {bodySelectionCellTemplate}
        </Template>
    </Plugin>
}

function getAllDataRowIds(tableRows: TableRow[]) {
    const rowIds: RowId[] = []
    const stack: TableRow[] = [...tableRows]
    while (stack.length > 0) {
        const currentRow = stack.pop()!
        if (currentRow.type === DATA_TYPE) {
            rowIds.push(currentRow.rowId)
        }
        currentRow.childRows && stack.push(...currentRow.childRows)
    }
    return rowIds
}