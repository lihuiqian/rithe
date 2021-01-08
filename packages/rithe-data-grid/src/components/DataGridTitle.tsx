import React, { CSSProperties, useMemo } from "react"
import { useDataGridTheme } from "../DataGridTheme"
import Column from "../types/Column"
import DataType from "../types/DataType"

interface DataGridTitleProps {
    title: string,
    dataType: DataType<any>,
    column: Column,
}

// eslint-disable-next-line react/display-name
const DataGridTitle = React.memo(({ title }: DataGridTitleProps) => {
    const { typographyComponent: Typography } = useDataGridTheme()
    const style: CSSProperties = useMemo(() => ({
        fontWeight: 600,
        userSelect: 'none',
    }), [])
    return <Typography style={style}>{title}</Typography>
})

export type { DataGridTitleProps }
export default DataGridTitle