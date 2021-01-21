import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { DATA_TYPE, HEADER_TYPE, SUMMARY_TYPE } from "./constants";

export const isHeaderRow = (tableRow: TableRow) => tableRow.type === HEADER_TYPE
export const isBodyRow = (tableRow: TableRow) => tableRow.type === DATA_TYPE
export const isFooterRow = (tableRow: TableRow) => tableRow.type === SUMMARY_TYPE
export const isHeaderCell = (tableRow: TableRow) => tableRow.type === HEADER_TYPE
export const isBodyCell = (tableRow: TableRow) => tableRow.type === DATA_TYPE
export const isFooterCell = (tableRow: TableRow) => tableRow.type === SUMMARY_TYPE


export const isCurrentFormatter = (dataTypeName: string, tableColumn: TableColumn) => {
    const dataType = tableColumn.dataType
    return !!dataType && dataType.name === dataTypeName
}

export const isCurrentEditor = (dataTypeName: string, tableColumn: TableColumn) => {
    const dataType = tableColumn.dataType
    return !!dataType && dataType.name === dataTypeName
}