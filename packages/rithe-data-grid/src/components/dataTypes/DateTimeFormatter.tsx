import { Typography } from "@material-ui/core"
import React from "react"

export interface DateTimeFormatterProps {
    value: Date | null,
    formatter: Intl.DateTimeFormat,
}

export const DateTimeFormatter = (props: DateTimeFormatterProps) => {
    const { value, formatter } = props

    return <Typography variant="body1">
        {value === null ? '' : formatter.format(value)}
    </Typography>
}