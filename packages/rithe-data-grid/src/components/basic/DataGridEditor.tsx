import { Typography } from "@material-ui/core";
import React from "react";
import { TableColumn } from "../../types/TableColumn";
import { TableRow } from "../../types/TableRow";

export interface DataGridEditorProps {
    value: any,
    setValue: (newValue: any) => void,
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export const DataGridEditor = (props: DataGridEditorProps) => {
    const { value } = props

    return <Typography variant="body1">
        {toString(value)}
    </Typography>
}

function toString(value: any) {
    if (value === undefined || value === null) {
        return value
    } else {
        return value.toString()
    }
}