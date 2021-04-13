import React from "react";
import { Row } from "../../types/Row";

export interface DataGridDetailFormatterProps {
    row?: Row,
}

export const DataGridDetailFormatter = (props: DataGridDetailFormatterProps) => {
    const { row } = props
    return <div>{`Detail Panel ${row}`}</div>
}