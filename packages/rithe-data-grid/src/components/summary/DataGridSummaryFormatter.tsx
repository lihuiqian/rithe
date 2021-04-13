import { Typography } from "@material-ui/core";
import React from "react";
import { DataTypeInfer } from "../../types/DataType";
import { TableColumn } from "../../types/TableColumn";
import { TableRow } from "../../types/TableRow";

export interface DataGridSummaryFormatterProps {
    value: any,
    dataType: keyof DataTypeInfer,
    tableColumn: TableColumn,
    tableRow: TableRow,
}

export const DataGridSummaryFormatter = (props: DataGridSummaryFormatterProps) => {
    const { value, dataType } = props

    return <Typography variant="body1">
        {toString(value, dataType)}
    </Typography>
}

const dateFormat = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
})

const timeFormat = new Intl.DateTimeFormat(undefined, {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
})

const datetimeFormat = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
})

function toString<T extends keyof DataTypeInfer>(value: any, dataType: T) {
    if (dataType === 'string') {
        return value
    } else if (dataType === 'number') {
        return value
    } else if (dataType === 'bigint') {
        return value
    } else if (dataType === 'boolean') {
        return value
    } else if (dataType === 'date') {
        return dateFormat.format(value)
    } else if (dataType === 'time') {
        return timeFormat.format(value)
    } else if (dataType === 'datetime') {
        return datetimeFormat.format(value)
    } else if (dataType === 'code') {
        return value
    } else if (dataType === 'object') {
        return new String(value)
    } else if (dataType === 'array') {
        return new String(value)
    } else {
        return 'UNKNOWN DATA TYPE'
    }
}