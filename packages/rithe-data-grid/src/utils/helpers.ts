import { TableColumn } from "../types/TableColumn";
import { ACTION_TYPE, BAND_TYPE, DATA_TYPE, DETAIL_TYPE, GROUPING_TYPE, HEADER_TYPE, NO_DATA_TYPE, SELECTION_TYPE, SUMMARY_TYPE, TREE_TYPE } from "./constants";

export const isHeaderRow = (rowType: symbol) => rowType === HEADER_TYPE
export const isDataRow = (rowType: symbol) => rowType === DATA_TYPE
export const isNoDataRow = (rowType: symbol) => rowType === NO_DATA_TYPE
export const isGroupingRow = (rowType: symbol) => rowType === GROUPING_TYPE
export const isDetailRow = (rowType: symbol) => rowType === DETAIL_TYPE
export const isSummaryRow = (rowType: symbol) => rowType === SUMMARY_TYPE

export const isHeaderCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === DATA_TYPE
export const isBandingCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === BAND_TYPE
export const isHeaderGroupingExpandCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === GROUPING_TYPE
export const isHeaderTreeExpandCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === TREE_TYPE
export const isHeaderDetailExpandCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === DETAIL_TYPE
export const isHeaderSelectionCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === SELECTION_TYPE
export const isHeaderActionCell = (colType: symbol, rowType: symbol) => isHeaderRow(rowType) && colType === ACTION_TYPE
export const isDataCell = (colType: symbol, rowType: symbol) => isDataRow(rowType) && colType === DATA_TYPE
export const isNoDataCell = (_: TableColumn, rowType: symbol) => isNoDataRow(rowType)
export const isGroupingExpandCell = (colType: symbol, rowType: symbol) => isGroupingRow(rowType) && colType === GROUPING_TYPE
export const isGroupingCell = (colType: symbol, rowType: symbol) => isGroupingRow(rowType) && colType === DATA_TYPE
export const isTreeExpandCell = (colType: symbol, rowType: symbol) => isDataRow(rowType) && colType === TREE_TYPE
export const isDetailExpandCell = (colType: symbol, rowType: symbol) => isDataRow(rowType) && colType === DETAIL_TYPE
export const isDetailCell = (_: TableColumn, rowType: symbol) => isDetailRow(rowType)
export const isSelectionCell = (colType: symbol, rowType: symbol) => isDataRow(rowType) && colType === SELECTION_TYPE
export const isActionCell = (colType: symbol, rowType: symbol) => isDataRow(rowType) && colType === ACTION_TYPE
export const isSummaryCell = (_: TableColumn, rowType: symbol) => isSummaryRow(rowType)

export const isHeaderContent = isHeaderCell
export const isBandingContent = isBandingCell
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
