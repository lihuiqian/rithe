import { Row } from "./Row";

export interface Column {
    field: string,
    dataTypeName: string,
    categories?: string[],
    title: string,
    width?: number,
    getCellValue?: (row: Row) => any,
}