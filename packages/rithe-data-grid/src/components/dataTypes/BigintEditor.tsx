import { Input } from "@material-ui/core"
import React from "react"
import { Align } from "../../types/Align"

export interface BigintEditorProps {
    align: Align,
    value: bigint | null,
    setValue: (value: bigint | null) => void,
}

export const BigintEditor = (props: BigintEditorProps) => {
    const { align, value, setValue } = props

    return <Input
        type="text"
        value={value?.toString()}
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