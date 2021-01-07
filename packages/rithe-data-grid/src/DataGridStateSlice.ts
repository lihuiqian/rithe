import Column from "./types/Column";
import Row from "./types/Row";

interface DataGridStateSlice {
    // Data
    columns: Column[],
    displayColumns: Column[],
    rows: Row[],
    displayRows: Row[],
}

export default DataGridStateSlice