import { TimePicker } from '@material-ui/pickers'
import React, { useState } from "react"
import { Align } from '../../types/Align'

export interface TimeInlineEditorProps {
    align: Align,
    value: Date | null,
    formatter: Intl.DateTimeFormat,
    setValue: (value: Date | null) => void,
}

export const TimeInlineEditor = (props: TimeInlineEditorProps) => {
    const { align, value, formatter, setValue } = props
    const [focus, setFocus] = useState(false)

    return <TimePicker
        autoOk
        clearable
        value={value}
        labelFunc={date => date ? formatter.format(date.toDate()) : ''}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={date => setValue(date?.toDate() ?? null)}
        InputProps={{
            disableUnderline: !focus,
            style: { textAlign: align },
        }}
    />
}