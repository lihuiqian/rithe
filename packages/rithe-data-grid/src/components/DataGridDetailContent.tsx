import React from "react";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";

export interface DataGridDetailContentProps {
    row?: Row,
    rowId?: RowId,
}

export const DataGridDetailContent = (props: DataGridDetailContentProps) => {
    const { rowId } = props
    return <div>{`Detail ${rowId}`}</div>
}