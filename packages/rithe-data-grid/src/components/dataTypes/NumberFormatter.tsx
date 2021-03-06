import { Typography } from "@material-ui/core"
import React from "react"

export interface NumberFormatterProps {
    value: number | null,
    formatter: Intl.NumberFormat,
}

export const NumberFormatter = (props: NumberFormatterProps) => {
    const { value, formatter } = props

    return <Typography variant="body1">
        {value === null ? '' : formatter.format(value)}
    </Typography>
}