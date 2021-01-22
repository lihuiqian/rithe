import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { ACTION_TYPE, DATA_TYPE, DETAIL_TYPE, GROUPING_TYPE, HEADER_TYPE, NO_DATA_TYPE, SELECTION_TYPE, SUMMARY_TYPE, TREE_TYPE } from "./constants";

export const isHeaderRow = (tableRow: TableRow) => tableRow.type === HEADER_TYPE
export const isDataRow = (tableRow: TableRow) => tableRow.type === DATA_TYPE
export const isNoDataRow = (tableRow: TableRow) => tableRow.type === NO_DATA_TYPE
export const isGroupingRow = (tableRow: TableRow) => tableRow.type === GROUPING_TYPE
export const isDetailRow = (tableRow: TableRow) => tableRow.type === DETAIL_TYPE
export const isSummaryRow = (tableRow: TableRow) => tableRow.type === SUMMARY_TYPE

export const isBandingCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && false
export const isHeaderCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && tableColumn.type === DATA_TYPE
export const isHeaderGroupingExpandCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && tableColumn.type === GROUPING_TYPE
export const isHeaderTreeExpandCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && tableColumn.type === TREE_TYPE
export const isHeaderDetailExpandCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && tableColumn.type === DETAIL_TYPE
export const isHeaderSelectionCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && tableColumn.type === SELECTION_TYPE
export const isHeaderActionCell = (tableColumn: TableColumn, tableRow: TableRow) => isHeaderRow(tableRow) && tableColumn.type === ACTION_TYPE
export const isDataCell = (tableColumn: TableColumn, tableRow: TableRow) => isDataRow(tableRow) && tableColumn.type === DATA_TYPE
export const isNoDataCell = (_: TableColumn, tableRow: TableRow) => isNoDataRow(tableRow)
export const isGroupingExpandCell = (tableColumn: TableColumn, tableRow: TableRow) => isGroupingRow(tableRow) && tableColumn.type === GROUPING_TYPE
export const isGroupingCell = (tableColumn: TableColumn, tableRow: TableRow) => isGroupingRow(tableRow) && tableColumn.type === DATA_TYPE
export const isTreeExpandCell = (tableColumn: TableColumn, tableRow: TableRow) => isDataRow(tableRow) && tableColumn.type === TREE_TYPE
export const isDetailExpandCell = (tableColumn: TableColumn, tableRow: TableRow) => isDataRow(tableRow) && tableColumn.type === DETAIL_TYPE
export const isDetailCell = (_: TableColumn, tableRow: TableRow) => isDetailRow(tableRow)
export const isSelectionCell = (tableColumn: TableColumn, tableRow: TableRow) => isDataRow(tableRow) && tableColumn.type === SELECTION_TYPE
export const isActionCell = (tableColumn: TableColumn, tableRow: TableRow) => isDataRow(tableRow) && tableColumn.type === ACTION_TYPE
export const isSummaryCell = (_: TableColumn, tableRow: TableRow) => isSummaryRow(tableRow)

export const isBandingContent = isBandingCell
export const isHeaderContent = isHeaderCell
export const isHeaderGroupingExpandContent = isHeaderGroupingExpandCell
export const isHeaderTreeExpandContent = isHeaderTreeExpandCell
export const isHeaderDetailExpandContent = isHeaderDetailExpandCell
export const isHeaderSelectionContent = isHeaderSelectionCell
export const isHeaderActionContent = isHeaderActionCell
export const isDataContent = isDataCell
export const isNoDataContent = isNoDataCell
export const isGroupingExpandContent = isGroupingExpandCell
export const isGroupingContent = isGroupingCell
export const isTreeExpandContent = isTreeExpandCell
export const isDetailExpandContent = isDetailExpandCell
export const isDetailContent = isDetailCell
export const isSelectionContent = isSelectionCell
export const isActionContent = isActionCell
export const isSummaryContent = isSummaryCell

export const isCurrentMenuItems = () => false
export const isCurrentFormatter = (dataTypeName: string, tableColumn: TableColumn) => {
    const dataType = tableColumn.dataType
    return !!dataType && dataType.name === dataTypeName
}
export const isCurrentEditor = (dataTypeName: string, tableColumn: TableColumn) => {
    const dataType = tableColumn.dataType
    return !!dataType && dataType.name === dataTypeName
}