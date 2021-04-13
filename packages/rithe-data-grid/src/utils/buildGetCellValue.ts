import { Records } from "@rithe/utils";
import { Column } from "../types/Column";
import { Row } from "../types/Row";

export function buildGetCellValue(columns: Column[]) {
    const getCellValueRecord = Records.from(columns.map(({ field, getCellValue }) => [field, getCellValue]))
    return function (row: Row, field: string) {
        const getCellValue = getCellValueRecord[field]
        return getCellValue ? getCellValue(row) : row[field]
    }
}