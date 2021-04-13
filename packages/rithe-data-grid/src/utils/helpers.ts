import { CellProps, RowProps } from "../TemplateBaseProps";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { ACTION_TYPE, CATEGORY_TYPE, DATA_TYPE, DETAIL_TYPE, EXPAND_TYPE, FOOTER_TYPE, GROUPING_TYPE, HEADER_TYPE, NUMBERING_TYPE, SELECTION_TYPE, TREE_TYPE } from "./constants";

// Row
export function isHeaderRow(props: RowProps) {
    const rowType = props.tableRow.type
    return rowType === HEADER_TYPE || rowType === CATEGORY_TYPE
}
export function isBodyRow(props: RowProps) {
    const rowType = props.tableRow.type
    return rowType !== HEADER_TYPE && rowType !== CATEGORY_TYPE && rowType !== FOOTER_TYPE
}
export function isFooterRow(props: RowProps) {
    const rowType = props.tableRow.type
    return rowType === FOOTER_TYPE
}
// Cell
export function isHeaderCell(props: CellProps) {
    const { tableRows } = props
    const rowType = tableRows[tableRows.length - 1].type
    return rowType === HEADER_TYPE || rowType === CATEGORY_TYPE
}
export function isBodyCell(props: CellProps) {
    const { tableRows } = props
    const rowType = tableRows[0].type
    return rowType !== HEADER_TYPE && rowType !== CATEGORY_TYPE && rowType !== FOOTER_TYPE
}
export function isFooterCell(props: CellProps) {
    const { tableRows } = props
    const rowType = tableRows[0].type
    return rowType === FOOTER_TYPE
}
// Title
function isTitle(lastTableRow: TableRow, firstTableColumn: TableColumn) {
    return lastTableRow.type === HEADER_TYPE && firstTableColumn.type === DATA_TYPE
}
export function isTitleCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isTitle(tableRows[tableRows.length - 1], tableColumns[0])
}
// Category
function isCategory(lastTableRow: TableRow, firstTableColumn: TableColumn) {
    return lastTableRow.type === CATEGORY_TYPE && firstTableColumn.type === DATA_TYPE
}
export function isCategoryCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isCategory(tableRows[tableRows.length - 1], tableColumns[0])
}
// Data
function isData(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === DATA_TYPE && tableColumn.type === DATA_TYPE
}
export function isDataCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isData(tableRows[0], tableColumns[0])
}
// Grouping
function isGrouping(tableRow: TableRow, tableColumn?: TableColumn) {
    return tableRow.type === GROUPING_TYPE && (!tableColumn || tableColumn.type === DATA_TYPE)
}
export function isGroupingRow(props: RowProps) {
    const { tableRow } = props
    return isGrouping(tableRow)
}
export function isGroupingCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isGrouping(tableRows[0], tableColumns[0])
}
// Detail
function isHeaderDetailExpand(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === HEADER_TYPE && tableColumn.type === DETAIL_TYPE
}
function isBodyDetailExpand(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === DATA_TYPE && tableColumn.type === DETAIL_TYPE
}
function isDetail(tableRow: TableRow) {
    return tableRow.type === DETAIL_TYPE
}
export function isHeaderDetailExpandCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isHeaderDetailExpand(tableRows[tableRows.length - 1], tableColumns[0])
}
export function isBodyDetailExpandCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isBodyDetailExpand(tableRows[0], tableColumns[0])
}
export function isDetailRow(props: RowProps) {
    const { tableRow } = props
    return isDetail(tableRow)
}
export function isDetailCell(props: CellProps) {
    const { tableRows } = props
    return isDetail(tableRows[0])
}
// Tree
function isHeaderTreeExpand(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === HEADER_TYPE && tableColumn.type === TREE_TYPE
}
function isBodyTreeExpand(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === DATA_TYPE && tableColumn.type === TREE_TYPE
}
export function isTreeRow(props: RowProps) {
    return props.tableRow.type === TREE_TYPE
}
export function isHeaderTreeExpandCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isHeaderTreeExpand(tableRows[tableRows.length - 1], tableColumns[0])
}
export function isBodyTreeExpandCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isBodyTreeExpand(tableRows[0], tableColumns[0])
}
// Expanding
function isHeaderExpand(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === HEADER_TYPE && tableColumn.type === EXPAND_TYPE
}
function isBodyExpand(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type !== HEADER_TYPE && tableRow.type !== CATEGORY_TYPE && tableRow.type !== FOOTER_TYPE && tableColumn.type === EXPAND_TYPE
}
export function isBodyExpandRow(props: RowProps) {
    const { tableRow } = props
    return tableRow.childRows !== undefined
}
export function isHeaderExpandCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isHeaderExpand(tableRows[tableRows.length - 1], tableColumns[0])
}
export function isBodyExpandCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isBodyExpand(tableRows[0], tableColumns[0])
}
// Selection
function isHeaderSelection(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === HEADER_TYPE && tableColumn.type === SELECTION_TYPE
}
function isBodySelection(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === DATA_TYPE && tableColumn.type === SELECTION_TYPE
}
export function isBodySelectionRow(props: RowProps) {
    const { tableRow } = props
    return tableRow.type === DATA_TYPE
}
export function isHeaderSelectionCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isHeaderSelection(tableRows[tableRows.length - 1], tableColumns[0])
}
export function isBodySelectionCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isBodySelection(tableRows[0], tableColumns[0])
}
// Action
function isHeaderAction(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === HEADER_TYPE && tableColumn.type === ACTION_TYPE
}
function isBodyAction(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type !== HEADER_TYPE && tableRow.type !== CATEGORY_TYPE && tableRow.type !== FOOTER_TYPE && tableColumn.type === ACTION_TYPE
}
export function isHeaderActionCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isHeaderAction(tableRows[tableRows.length - 1], tableColumns[0])
}
export function isBodyActionCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isBodyAction(tableRows[0], tableColumns[0])
}
// Numbering
function isHeaderNumber(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === HEADER_TYPE && tableColumn.type === NUMBERING_TYPE
}
function isBodyNumber(tableRow: TableRow, tableColumn: TableColumn) {
    return tableRow.type === DATA_TYPE && tableColumn.type === NUMBERING_TYPE
}
export function isHeaderNumberCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isHeaderNumber(tableRows[tableRows.length - 1], tableColumns[0])
}
export function isBodyNumberCell(props: CellProps) {
    const { tableRows, tableColumns } = props
    return isBodyNumber(tableRows[0], tableColumns[0])
}