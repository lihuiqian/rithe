import Row from "./Row";

interface Column {
    field: string,
    dataTypeName: string,
    categories?: string[],
    title: string,
    width?: number,
    getCellValue?: (row: Row) => any,
}

export default Column