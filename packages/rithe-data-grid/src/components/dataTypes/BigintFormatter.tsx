import { Typography } from "@material-ui/core"
import React from "react"

export interface BigintFormatterProps {
    value: number | null,
    formatter: Intl.NumberFormat,
}

export const BigintFormatter = (props: BigintFormatterProps) => {
    const { value, formatter } = props

    return <Typography variant="body1">
        {value === null ? '' : formatter.format(value)}
    </Typography>
}