import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import React, { useState } from "react"
import { Align } from '../../types/Align'

export interface KeyInlineEditorProps {
    align: Align,
    value: any | null,
    options: any[],
    formatter: { format: (value: any | null) => string, group?: (value: any | null) => string, disable?: (value: any | null) => boolean },
    setValue: (value: any | null) => void,
}

export const KeyInlineEditor = (props: KeyInlineEditorProps) => {
    const { align, value, options, formatter, setValue } = props
    const [focus, setFocus] = useState(false)

    return <Autocomplete
        autoHighlight
        autoComplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        disableClearable
        value={value}
        options={options}
        getOptionLabel={option => formatter.format(option)}
        groupBy={formatter.group ? (option => formatter.group!(option)) : undefined}
        getOptionDisabled={formatter.disable ? (option => formatter.disable!(option)) : undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(_, newValue) => setValue(newValue)}
        renderInput={params => <TextField {...params} InputProps={{ ...params.InputProps, disableUnderline: !focus }} inputProps={{ ...params.inputProps, style: { textAlign: align } }} />}
        renderOption={(option, { inputValue }) => {
            const label = formatter.format(option)
            const matches = match(label, inputValue)
            const parts = parse(label, matches)
            return <div>
                {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        }}
    />
}