import React, { CSSProperties, useMemo } from "react"
import Column from "../types/Column"
import DataType from "../types/DataType"
import Row from "../types/Row"
import RowId from "../types/RowId"
import { useDataGridTheme } from "./DataGridTheme"

interface DataGridFormatterProps {
    value: any,
    formattedValue: any,
    dataType: DataType<any>,
    column: Column,
    rowId: RowId,
    row: Row,
}

const DataGridFormatter = ({ formattedValue }: DataGridFormatterProps) => {
    const { typographyComponent: Typography } = useDataGridTheme()
    const style = useMemo<CSSProperties>(() => ({
        display: 'inline-block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    }), [])
    return <Typography title={formattedValue} style={style}>{formattedValue}</Typography>
}

export { DataGridFormatterProps, DataGridFormatter }

