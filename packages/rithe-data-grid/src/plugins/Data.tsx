import { Plugin } from '@rithe/plugin';
import React from "react";
import { StatePipe } from '../StatePipe';
import Column from "../types/Column";
import Row from "../types/Row";
import RowId from "../types/RowId";

interface DataProps {
    // controlled
    columns: Column[],
    rows: Row[],
    // other
    getRowId?: (row: Row) => RowId,
}

const Data = ({ columns, rows, getRowId }: DataProps) => {

    return <Plugin>
        <StatePipe name="columns" value={columns} />
        <StatePipe name="rows" value={rows} />
        <StatePipe name="displayColumns" value={columns} />
        <StatePipe name="displayRows" value={rows} />
        <StatePipe name="getRowId" value={getRowId} />
    </Plugin>
}

export { DataProps, Data };

