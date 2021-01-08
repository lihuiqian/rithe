import React from "react"
import { useDataGridTheme } from "../DataGridTheme"
import Column from "../types/Column"
import DataType from "../types/DataType"
import Row from "../types/Row"
import RowId from "../types/RowId"

interface DataGridFormatterProps {
    value: unknown,
    dataType: DataType<never>,
    column: Column,
    rowId: RowId,
    row: Row,
}

const DataGridFormatter = ({ value, dataType, column, rowId, row }: DataGridFormatterProps) => {
    const { typographyComponent: Typography } = useDataGridTheme()
    return <Typography>{dataType.formatter(value as any, dataType, column, rowId, row)}</Typography>
}

export type { DataGridFormatterProps }
export default DataGridFormatter