import { TableColumn } from "../types/TableColumn";

export const isCurrentFormatter = (dataTypeName: string, tableColumn: TableColumn) => {
    const dataType = tableColumn.dataType
    return !!dataType && dataType.name === dataTypeName
}

export const isCurrentEditor = (dataTypeName: string, tableColumn: TableColumn) => {
    const dataType = tableColumn.dataType
    return !!dataType && dataType.name === dataTypeName
}