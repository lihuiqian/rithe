import { Typography } from "@material-ui/core"
import React from "react"

export interface KeyFormatterProps {
    value: any | null,
    formatter: { format: (value: any | null) => string },
}

export const KeyFormatter = (props: KeyFormatterProps) => {
    const { value, formatter } = props

    return <Typography variant="body1">
        {value === null ? '' : formatter.format(value)}
    </Typography>
}