import { Typography } from "@material-ui/core"
import React from "react"

export interface KeysFormatterProps {
    values: any[],
    formatter: { format: (values: any) => string },
}

export const KeysFormatter = (props: KeysFormatterProps) => {
    const { values, formatter } = props

    return <Typography variant="body1">
        {values.map(value => formatter.format(value)).join(' ')}
    </Typography>
}