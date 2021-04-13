import { Typography } from "@material-ui/core"
import React from "react"

export interface StringFormatterProps {
    value: string | null,
}

export const StringFormatter = (props: StringFormatterProps) => {
    const { value } = props

    return <Typography variant="body1">
        {value}
    </Typography>
}