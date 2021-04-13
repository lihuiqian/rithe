import { Plugin } from "@rithe/plugin";
import { Records, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridEditingAddRowAction, DataGridEditingAddRowActionProps } from "../components/editing/DataGridEditingAddRowAction";
import { DataGridEditingAddRowCancelAction, DataGridEditingAddRowCancelActionProps } from "../components/editing/DataGridEditingAddRowCancelAction";
import { DataGridEditingAddRowCommitAction, DataGridEditingAddRowCommitActionProps } from "../components/editing/DataGridEditingAddRowCommitAction";
import { DataGridEditingDeleteRowAction, DataGridEditingDeleteRowActionProps } from "../components/editing/DataGridEditingDeleteRowAction";
import { DataGridEditingEditRowAction, DataGridEditingEditRowActionProps } from "../components/editing/DataGridEditingEditRowAction";
import { DataGridEditingEditRowCancelAction, DataGridEditingEditRowCancelActionProps } from "../components/editing/DataGridEditingEditRowCancelAction";
import { DataGridEditingEditRowCommitAction, DataGridEditingEditRowCommitActionProps } from "../components/editing/DataGridEditingEditRowCommitAction";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { DataProps, RowActionProps } from "../TemplateBaseProps";
import { Column } from "../types/Column";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";
import { TableRow } from "../types/TableRow";
import { buildSetCellValue } from "../utils/buildSetCellValue";
import { ADD_ROW_ACTION_KEY, ADD_ROW_CANCEL_ACTION_KEY, ADD_ROW_COMMIT_ACTION_KEY, CATEGORY_TYPE, DATA_TYPE, DEFAULT_ROW_HEIGHT, DELETE_ROW_ACTION_KEY, EDIT_ROW_ACTION_KEY, EDIT_ROW_CANCEL_ACTION_KEY, EDIT_ROW_COMMIT_ACTION_KEY } from "../utils/constants";
import { updateTableRow } from "../utils/updateTableRow";

export interface ColumnSetting {
    editingDisabled?: boolean,
}

export interface EditingProps {
    addingRows?: TableRow[],
    onAddingRowsChange?: (addingRows: TableRow[]) => void,
    defaultAddingRows?: TableRow[],
    editingRows?: TableRow[],
    onEditingRowsChange?: (editingRows: TableRow[]) => void,
    defaultEditingRows?: TableRow[],
    onAddingRowCommit?: (row: Row) => boolean,
    onEditingRowCommit?: (row: Row) => boolean,
    onDeletingRowCommit?: (row: Row) => boolean,
    onEditingCellCommit?: (column: Column, row: Row) => boolean,
    showAddAction?: boolean | (() => boolean),
    showEditAction?: boolean | ((row: Row) => boolean),
    showDeleteAction?: boolean | ((row: Row) => boolean),
    disableAddAction?: boolean | (() => boolean),
    disableAddCommitAction?: boolean | ((row: Row) => boolean),
    disableEditAction?: boolean | ((row: Row) => boolean),
    disableEditCommitAction?: boolean | ((row: Row) => boolean),
    disableDeleteAction?: boolean | ((row: Row) => boolean),
    enableInlineEdit?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    AddRowAction?: ComponentType<DataGridEditingAddRowActionProps>,
    AddRowCommitAction?: ComponentType<DataGridEditingAddRowCommitActionProps>,
    AddRowCancelAction?: ComponentType<DataGridEditingAddRowCancelActionProps>,
    EditRowAction?: ComponentType<DataGridEditingEditRowActionProps>,
    EditRowCommitAction?: ComponentType<DataGridEditingEditRowCommitActionProps>,
    EditRowCancelAction?: ComponentType<DataGridEditingEditRowCancelActionProps>,
    DeleteRowAction?: ComponentType<DataGridEditingDeleteRowActionProps>,
}

export const Editing = (props: EditingProps) => {
    const {
        onAddingRowCommit,
        onEditingRowCommit,
        onDeletingRowCommit,
        onEditingCellCommit,
        showAddAction = false,
        showEditAction = false,
        showDeleteAction = false,
        disableAddAction = false,
        disableAddCommitAction = false,
        disableEditAction = false,
        disableEditCommitAction = false,
        disableDeleteAction = false,
        enableInlineEdit = false,
        AddRowAction = DataGridEditingAddRowAction,
        AddRowCommitAction = DataGridEditingAddRowCommitAction,
        AddRowCancelAction = DataGridEditingAddRowCancelAction,
        EditRowAction = DataGridEditingEditRowAction,
        EditRowCommitAction = DataGridEditingEditRowCommitAction,
        EditRowCancelAction = DataGridEditingEditRowCancelAction,
        DeleteRowAction = DataGridEditingDeleteRowAction,
    } = props

    const [addingRows, setAddingRows] = useMixed(props.addingRows, props.onAddingRowsChange, props.defaultAddingRows, [])
    const [editingRows, setEditingRows] = useMixed(props.editingRows, props.onEditingRowsChange, props.defaultEditingRows, [])
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableHeaderRows
    const tableHeaderRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableHeaderRowsComputed = useCallback((tableHeaderRows: TableRow[] = []) => {
        const showAdd = typeof showAddAction === 'boolean' ? showAddAction : showAddAction()
        if (!showAdd) return tableHeaderRows
        return tableHeaderRows.map(tableRow => {
            if (tableRow.type === CATEGORY_TYPE) return tableRow
            return updateTableRow(tableRow, {
                actions: [...(tableRow.actions ?? []), ADD_ROW_ACTION_KEY]
            }, tableHeaderRowsCacheRef.current)
        })
    }, [showAddAction])

    // State tableBodyRows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = []) => {
        const editingRowRecord = Records.from(editingRows.map(tableRow => [tableRow.rowId, tableRow]))
        function recursion(tableRow: TableRow): TableRow {
            const childRows = tableRow.childRows ? tableRow.childRows.map(recursion) : undefined
            const additionalActions: string[] = []
            const editingRow = editingRowRecord[tableRow.rowId]
            if (!editingRow && tableRow.type === DATA_TYPE) {
                if (typeof showEditAction === 'boolean' ? showEditAction : showEditAction(tableRow.row!)) additionalActions.push(EDIT_ROW_ACTION_KEY)
                if (typeof showDeleteAction === 'boolean' ? showDeleteAction : showDeleteAction(tableRow.row!)) additionalActions.push(DELETE_ROW_ACTION_KEY)
            }
            const originalActions = (editingRow ?? tableRow).actions
            const actions = additionalActions.length === 0 ? originalActions : [...(originalActions ?? []), ...additionalActions]
            return updateTableRow(editingRow ?? tableRow, {
                childRows,
                actions,
            }, tableBodyRowsCacheRef.current)
        }
        return [
            ...addingRows,
            ...tableBodyRows.map(recursion)
        ]
    }, [addingRows, editingRows, showDeleteAction, showEditAction])

    // Template addRowAction
    const isAddAction = useCallback((props: RowActionProps) => props.actionName === ADD_ROW_ACTION_KEY, [])
    const addRowActionTemplate = useCallback(() => {
        return <AddRowAction
            disabled={typeof disableAddAction === 'boolean' ? disableAddAction : disableAddAction()}
            action={() => {
                setAddingRows([...addingRows, {
                    type: DATA_TYPE,
                    row: {},
                    rowId: `${DATA_TYPE.toString()}_${Math.random()}`,
                    height: DEFAULT_ROW_HEIGHT,
                    actions: [ADD_ROW_COMMIT_ACTION_KEY, ADD_ROW_CANCEL_ACTION_KEY],
                }])
            }}
        />
    }, [AddRowAction, addingRows, disableAddAction, setAddingRows])

    // Template addRowCommitAction
    const isAddCommitAction = useCallback((props: RowActionProps) => props.actionName === ADD_ROW_COMMIT_ACTION_KEY, [])
    const addRowCommitActionTemplate = useCallback((props: RowActionProps) => {
        const commitRow = props.tableRow
        return <AddRowCommitAction
            disabled={typeof disableAddCommitAction === 'boolean' ? disableAddCommitAction : disableAddCommitAction(commitRow)}
            action={() => {
                setAddingRows(addingRows.filter(tableRow => tableRow.rowId !== commitRow.rowId))
                onAddingRowCommit && onAddingRowCommit(commitRow.row!)
            }}
        />
    }, [AddRowCommitAction, addingRows, disableAddCommitAction, onAddingRowCommit, setAddingRows])

    // Template addRowCancelAction
    const isAddCancelAction = useCallback((props: RowActionProps) => props.actionName === ADD_ROW_CANCEL_ACTION_KEY, [])
    const addRowCancelActionTemplate = useCallback((props: RowActionProps) => {
        const cancelRow = props.tableRow
        return <AddRowCancelAction
            disabled={false}
            action={() => {
                setAddingRows(addingRows.filter(tableRow => tableRow.rowId !== cancelRow.rowId))
            }}
        />
    }, [AddRowCancelAction, addingRows, setAddingRows])

    // Template editRowAction
    const isEditAction = useCallback((props: RowActionProps) => props.actionName === EDIT_ROW_ACTION_KEY, [])
    const editRowActionTemplate = useCallback((props: RowActionProps) => {
        const editingRow = props.tableRow
        return <EditRowAction
            disabled={typeof disableEditAction === 'boolean' ? disableEditAction : disableEditAction(editingRow.row!)}
            action={() => {
                setEditingRows([...editingRows, {
                    ...editingRow,
                    actions: [EDIT_ROW_COMMIT_ACTION_KEY, EDIT_ROW_CANCEL_ACTION_KEY],
                }])
            }}
        />
    }, [EditRowAction, disableEditAction, editingRows, setEditingRows])

    // Template editRowCommitAction
    const isEditCommitAction = useCallback((props: RowActionProps) => props.actionName === EDIT_ROW_COMMIT_ACTION_KEY, [])
    const editRowCommitActionTemplate = useCallback((props: RowActionProps) => {
        const commitRow = props.tableRow
        return <EditRowCommitAction
            disabled={typeof disableEditCommitAction === 'boolean' ? disableEditCommitAction : disableEditCommitAction(commitRow.row!)}
            action={() => {
                setEditingRows(editingRows.filter(tableRow => tableRow.rowId !== commitRow.rowId))
                onEditingRowCommit && onEditingRowCommit(commitRow.row!)
            }}
        />
    }, [EditRowCommitAction, disableEditCommitAction, editingRows, onEditingRowCommit, setEditingRows])

    // Template editRowCancelAction
    const isEditCancelAction = useCallback((props: RowActionProps) => props.actionName === EDIT_ROW_CANCEL_ACTION_KEY, [])
    const editRowCancelActionTemplate = useCallback((props: RowActionProps) => {
        const cancelRow = props.tableRow
        return <EditRowCancelAction
            disabled={false}
            action={() => {
                setEditingRows(editingRows.filter(tableRow => tableRow.rowId !== cancelRow.rowId))
            }}
        />
    }, [EditRowCancelAction, editingRows, setEditingRows])

    // Template deleteRowAction
    const isDeleteAction = useCallback((props: RowActionProps) => props.actionName === DELETE_ROW_ACTION_KEY, [])
    const deleteRowActionTemplate = useCallback((props: RowActionProps) => {
        const deletingRow = props.tableRow
        return <DeleteRowAction
            disabled={typeof disableDeleteAction === 'boolean' ? disableDeleteAction : disableDeleteAction(deletingRow.row!)}
            action={() => {
                onDeletingRowCommit && onDeletingRowCommit(deletingRow.row!)
            }}
        />
    }, [DeleteRowAction, disableDeleteAction, onDeletingRowCommit])

    // Template dataContentTemplate
    const containsAddRowEditor = useCallback((props: DataProps) => {
        const { tableRow, tableColumn } = props
        if (tableRow.type !== DATA_TYPE || tableColumn.type !== DATA_TYPE) return false
        if (columnSettings[tableColumn.field]?.editingDisabled) return false
        return addingRows.findIndex(addingRow => tableRow.rowId === addingRow.rowId) >= 0
    }, [addingRows, columnSettings])
    const addRowEditorTemplate = useCallback((props: DataProps) => {
        const { tableRow, tableColumn } = props
        const column = tableColumn.column!, row = tableRow.row!
        const setCellValue = buildSetCellValue([column])
        const setValue = (value: any) => {
            const newRow = setCellValue(row, column.field, value)
            setAddingRows(addingRows.map(addingRow => addingRow.rowId === tableRow.rowId ? { ...addingRow, row: newRow } : addingRow))
        }
        return <Render override="data" props={{
            type: 'editor',
            setValue,
        }} />
    }, [addingRows, setAddingRows])

    // Template dataContentTemplate
    const containsEditRowEditor = useCallback((props: DataProps) => {
        const { tableRow, tableColumn } = props
        if (tableRow.type !== DATA_TYPE || tableColumn.type !== DATA_TYPE) return false
        if (columnSettings[tableColumn.field]?.editingDisabled) return false
        return editingRows.findIndex(editingRow => tableRow.rowId === editingRow.rowId) >= 0
    }, [columnSettings, editingRows])
    const editRowEditorTemplate = useCallback((props: DataProps) => {
        const { tableRow, tableColumn } = props
        const column = tableColumn.column!, row = tableRow.row!
        const setCellValue = buildSetCellValue([column])
        const setValue = (value: any) => {
            const newRow = setCellValue(row, column.field, value)
            setEditingRows(editingRows.map(editingRow => editingRow.rowId === tableRow.rowId ? { ...editingRow, row: newRow } : editingRow))
        }
        return <Render override="data" props={{
            type: 'editor',
            setValue,
        }} />
    }, [editingRows, setEditingRows])

    // Template dataContentTemplate
    const containsInlineEditor = useCallback((props: DataProps) => {
        const { tableColumn, tableRow } = props
        if (tableRow.type !== DATA_TYPE) return false
        if (tableColumn.type !== DATA_TYPE) return false
        if (columnSettings[tableColumn.field]?.editingDisabled) return false
        const isAddingRow = addingRows.findIndex(addingRow => tableRow.rowId === addingRow.rowId) >= 0
        const isEditingRow = editingRows.findIndex(editingRow => tableRow.rowId === editingRow.rowId) >= 0
        return enableInlineEdit && !isAddingRow && !isEditingRow
    }, [addingRows, columnSettings, editingRows, enableInlineEdit])
    const inlineEditorTemplate = useCallback((props: DataProps) => {
        const { tableColumn, tableRow } = props
        const column = tableColumn.column!, row = tableRow.row!
        const setCellValue = buildSetCellValue([column])
        const setValue = (value: any) => {
            const newRow = setCellValue(row, column.field, value)
            onEditingCellCommit && onEditingCellCommit(column, newRow)
        }
        return <Render override="data" props={{
            type: 'inlineEditor',
            setValue,
        }} />
    }, [onEditingCellCommit])

    return <Plugin>
        <State name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <State name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template name="rowAction" predicate={isAddAction}>
            {addRowActionTemplate}
        </Template>
        <Template name="rowAction" predicate={isAddCommitAction}>
            {addRowCommitActionTemplate}
        </Template>
        <Template name="rowAction" predicate={isAddCancelAction}>
            {addRowCancelActionTemplate}
        </Template>
        <Template name="rowAction" predicate={isEditAction}>
            {editRowActionTemplate}
        </Template>
        <Template name="rowAction" predicate={isEditCommitAction}>
            {editRowCommitActionTemplate}
        </Template>
        <Template name="rowAction" predicate={isEditCancelAction}>
            {editRowCancelActionTemplate}
        </Template>
        <Template name="rowAction" predicate={isDeleteAction}>
            {deleteRowActionTemplate}
        </Template>
        <Template name="data" predicate={containsAddRowEditor}>
            {addRowEditorTemplate}
        </Template>
        <Template name="data" predicate={containsEditRowEditor}>
            {editRowEditorTemplate}
        </Template>
        <Template name="data" predicate={containsInlineEditor}>
            {inlineEditorTemplate}
        </Template>
    </Plugin>
}