import { Typography } from "@material-ui/core"
import React from "react"

export interface DateFormatterProps {
    value: Date | null,
    formatter: Intl.DateTimeFormat,
}

export const DateFormatter = (props: DateFormatterProps) => {
    const { value, formatter } = props

    return <Typography variant="body1">
        {value === null ? '' : formatter.format(value)}
    </Typography>
}