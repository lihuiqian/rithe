import { TimePicker } from '@material-ui/pickers'
import React from "react"
import { Align } from '../../types/Align'

export interface TimeEditorProps {
    align: Align,
    value: Date | null,
    formatter: Intl.DateTimeFormat,
    setValue: (value: Date | null) => void,
}

export const TimeEditor = (props: TimeEditorProps) => {
    const { align, value, formatter, setValue } = props

    return <TimePicker
        autoOk
        clearable
        value={value}
        labelFunc={date => date ? formatter.format(date.toDate()) : ''}
        onChange={date => setValue(date?.toDate() ?? null)}
        InputProps={{ style: { textAlign: align } }}
    />
}