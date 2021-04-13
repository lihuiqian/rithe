import { Typography } from "@material-ui/core"
import React from "react"

export interface TimeFormatterProps {
    value: Date | null,
    formatter: Intl.DateTimeFormat,
}

export const TimeFormatter = (props: TimeFormatterProps) => {
    const { value, formatter } = props

    return <Typography variant="body1">
        {value === null ? '' : formatter.format(value)}
    </Typography>
}