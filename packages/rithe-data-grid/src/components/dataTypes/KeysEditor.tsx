import { Checkbox, Chip, makeStyles, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import React from "react"
import { Align } from '../../types/Align'

export interface KeysEditorProps {
    align: Align,
    values: any[],
    options: any[],
    formatter: { format: (value: any | null) => string, group?: (value: any | null) => string, disable?: (value: any | null) => boolean },
    setValues: (values: any[]) => void,
}

export const KeysEditor = (props: KeysEditorProps) => {
    const { align, values, options, formatter, setValues } = props

    const styles = useStyles()
    return <Autocomplete
        multiple
        autoHighlight
        autoComplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        disableCloseOnSelect
        disableClearable
        value={values}
        options={options}
        getOptionLabel={option => formatter.format(option)}
        groupBy={formatter.group ? (option => formatter.group!(option)) : undefined}
        getOptionDisabled={formatter.disable ? (option => formatter.disable!(option)) : undefined}
        onChange={(_, newValues) => setValues(newValues)}
        renderInput={params => <TextField {...params} inputProps={{ ...params.inputProps, style: { textAlign: align } }} />}
        renderOption={(option, { selected, inputValue }) => {
            const label = formatter.format(option)
            const matches = match(label, inputValue)
            const parts = parse(label, matches)
            return <div>
                <Checkbox checked={selected} />
                {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        }}
        renderTags={values => values.map((value, index) => <Chip key={index} label={formatter.format(value)} size="small" className={styles.chip} />)}
    />
}

const useStyles = makeStyles({
    chip: {
        fontSize: '1rem',
        backgroundColor: 'transparent',
    }
})