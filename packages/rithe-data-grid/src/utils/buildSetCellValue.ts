import { Records } from "@rithe/utils";
import { Column } from "../types/Column";
import { Row } from "../types/Row";

export function buildSetCellValue(columns: Column[]) {
    const setCellValueRecord = Records.from(columns.map(({ field, setCellValue }) => [field, setCellValue]))
    return function (row: Row, field: string, value: any) {
        const setCellValue = setCellValueRecord[field]
        return setCellValue ? setCellValue(row, value) : Records.set(row, [field, value])
    }
}