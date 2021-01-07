import Column from "./Column";
import Row from "./Row";

interface StateSlice {
    // Data
    columns: Column[],
    displayColumns: Column[],
    rows: Row[],
    displayRows: Row[],
    tableWidth: number,
}

export default StateSlice