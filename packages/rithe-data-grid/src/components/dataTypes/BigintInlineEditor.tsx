import { Input } from "@material-ui/core"
import React, { useState } from "react"
import { Align } from "../../types/Align"

export interface BigintInlineEditorProps {
    align: Align,
    value: bigint | null,
    formatter: Intl.NumberFormat,
    setValue: (value: bigint | null) => void,
}

export const BigintInlineEditor = (props: BigintInlineEditorProps) => {
    const { align, value, formatter, setValue } = props
    const [focus, setFocus] = useState(false)

    return <Input
        disableUnderline={!focus}
        type={focus ? 'number' : 'text'}
        value={focus ? value?.toString() : value === null ? null : formatter.format(value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={e => {
            const string = e.target.value
            if (string === '') {
                setValue(null)
            } else {
                try {
                    const value = BigInt(string)
                    setValue(value)
                } catch {/* do nothing */ }
            }
        }}
        inputProps={{ style: { textAlign: align } }}
    />
}