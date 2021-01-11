import React, { CSSProperties, useMemo } from "react"
import Column from "../types/Column"
import DataType from "../types/DataType"
import { useDataGridTheme } from "./DataGridTheme"

interface DataGridBandProps {
    title: string,
    dataTypes: DataType<any>[],
    columns: Column[],
}

// eslint-disable-next-line react/display-name
const DataGridBand = React.memo(({ title }: DataGridBandProps) => {
    const { typographyComponent: Typography } = useDataGridTheme()
    const style: CSSProperties = useMemo(() => ({
        display: 'inline-block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontWeight: 600,
        userSelect: 'none',
    }), [])
    return <Typography title={title} style={style}>{title}</Typography>
})

export { DataGridBandProps, DataGridBand }

