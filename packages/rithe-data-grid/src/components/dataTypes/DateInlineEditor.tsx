import { DatePicker } from '@material-ui/pickers'
import React, { useState } from "react"
import { Align } from '../../types/Align'

export interface DateInlineEditorProps {
    align: Align,
    value: Date | null,
    formatter: Intl.DateTimeFormat,
    setValue: (value: Date | null) => void,
}

export const DateInlineEditor = (props: DateInlineEditorProps) => {
    const { align, value, formatter, setValue } = props
    const [focus, setFocus] = useState(false)

    return <DatePicker
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