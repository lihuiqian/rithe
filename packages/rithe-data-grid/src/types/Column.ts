import { Row } from "./Row";

export interface Column {
    field: string,
    dataTypeName: string,
    categories?: { value: string, key: string }[],
    title: string,
    width?: number,
    getCellValue?: (row: Row) => any,
    setCellValue?: (row: Row, value: any) => Row,
}