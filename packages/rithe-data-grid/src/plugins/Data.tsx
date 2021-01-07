import { Plugin } from '@rithe/plugin';
import React from "react";
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

const Data = (props: DataProps) => {

    return <Plugin>

    </Plugin>
}