import React from "react";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { TableCellProps } from "../types/TemplateBaseProps";

export interface DataGridFormatterProps extends TableCellProps {
    value: any,
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export const DataGridFormatter = (props: DataGridFormatterProps) => {
    const { value, tableColumn, tableRow } = props
    return <span>{value}</span>
}