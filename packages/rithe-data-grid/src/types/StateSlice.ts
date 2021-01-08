import Column from "./Column";
import DataType from "./DataType";
import Row from "./Row";
import RowId from "./RowId";

interface StateSlice {
    // DataTypeProvider
    dataTypes: DataType<any>[],
    // Data
    columns: Column[],
    rows: Row[],
    displayColumns: Column[],
    displayRows: Row[],
    getRowId: (row: Row) => RowId,
    getCellValue: (column: Column, row: Row) => any,
    // TableLayout
    tableWidth: number,
}

export default StateSlice