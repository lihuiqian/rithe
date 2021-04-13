import { Button, InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { SearchOperator } from "../../types/SearchOperator";

export interface DataGridSearchInputProps {
    value: string,
    setValue: (value: string) => void,
    operator: SearchOperator,
    setOperator: (operator: SearchOperator) => void,
}

export const DataGridSearchInput = (props: DataGridSearchInputProps) => {
    const { value, setValue, operator, setOperator } = props

    const styles = useStyles()
    return <OutlinedInput
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        endAdornment={<InputAdornment position="end">
            <Button onClick={() => setOperator(operator === 'AND' ? 'OR' : 'AND')}>
                {operator}
            </Button>
            <Search />
        </InputAdornment>}
        inputProps={{
            className: styles.input,
        }}
    />
}

const useStyles = makeStyles(theme => ({
    input: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))