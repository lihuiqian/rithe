import { Input } from "@material-ui/core"
import React from "react"
import { Align } from "../../types/Align"

export interface NumberEditorProps {
    align: Align,
    value: number | null,
    setValue: (value: number | null) => void,
}

export const NumberEditor = (props: NumberEditorProps) => {
    const { align, value, setValue } = props

    return <Input
        type="number"
        value={value}
        onChange={e => {
            const string = e.target.value
            const value = string === '' ? null : Number(string) as number
            (value === null || !isNaN(value)) && setValue(value)
        }}
        inputProps={{ style: { textAlign: align } }}
    />
}