import Column from "./Column";
import Row from "./Row";
import RowId from "./RowId";

interface StateSlice {
    // Data
    columns: Column[],
    rows: Row[],
    displayColumns: Column[],
    displayRows: Row[],
    getRowId: (row: Row) => RowId,
    getCellValue: (column: Column, row: Row) => any,
}

export default StateSlice