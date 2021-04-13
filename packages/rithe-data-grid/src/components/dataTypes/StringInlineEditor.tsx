import { Input } from "@material-ui/core"
import React, { useState } from "react"
import { Align } from "../../types/Align"

export interface StringInlineEditorProps {
    align: Align,
    value: string | null,
    setValue: (value: string | null) => void,
}

export const StringInlineEditor = (props: StringInlineEditorProps) => {
    const { align, value, setValue } = props

    const [focus, setFocus] = useState(false)
    const [draft, setDraft] = useState(value)

    const change = (value: string | null) => setDraft(value)
    const cancel = () => setDraft(value)
    const commit = () => setValue(draft)

    return <Input
        disableUnderline={!focus}
        type={'text'}
        value={(focus ? draft : value) ?? ''}
        onFocus={() => setFocus(true)}
        onBlur={() => {
            setFocus(false)
            commit()
        }}
        onKeyDown={e => e.key === 'Escape' && cancel()}
        onChange={e => change(e.target.value || null)}
        inputProps={{ style: { textAlign: align } }}
    />
}