import { Input } from "@material-ui/core"
import React, { useState } from "react"
import { Align } from "../../types/Align"

export interface NumberInlineEditorProps {
    align: Align,
    value: number | null,
    formatter: Intl.NumberFormat,
    setValue: (value: number | null) => void,
}

export const NumberInlineEditor = (props: NumberInlineEditorProps) => {
    const { align, value, formatter, setValue } = props

    const [focus, setFocus] = useState(false)

    return <Input
        disableUnderline={!focus}
        type={focus ? 'number' : 'text'}
        value={focus ? value : value === null ? null : formatter.format(value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={e => {
            const string = e.target.value
            const value = string === '' ? null : Number(string) as number
            (value === null || !isNaN(value)) && setValue(value)
        }}
        inputProps={{ style: { textAlign: align } }}
    />
}