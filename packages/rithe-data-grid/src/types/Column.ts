import { Row } from "./Row";

export interface Column {
    field: string,
    dataTypeName: string,
    categories?: (string | { value: string, merge: boolean })[],
    title: string,
    width?: number,
    getCellValue?: (row: Row) => any,
}