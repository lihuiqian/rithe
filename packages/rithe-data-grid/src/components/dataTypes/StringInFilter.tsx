import { Button, Checkbox, ListItemIcon, makeStyles, MenuItem, MenuList, OutlinedInput } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FilterExpression } from "../../types/FilterExpression";
import { FilterPredicate } from "../../types/FilterPredicate";

export interface StringInFilterProps {
    values: string[],
    filter?: FilterExpression | FilterPredicate,
    setFilter: (filter?: FilterExpression | FilterPredicate) => void,
}

export const StringInFilter = (props: StringInFilterProps) => {
    const { values, filter, setFilter } = props

    const [searchValue, setSearchValue] = useState('')
    const [searchedValues, setSearchedValues] = useState(values)

    useEffect(() => {
        const keyWords = searchValue.split(' ').map(keyWord => keyWord.trim()).filter(keyWord => keyWord)
        setSearchedValues(values.filter(value => {
            return keyWords.map(keyWord => value.includes(keyWord))
                .reduce((a, b) => a && b, true)
        }))
    }, [searchValue, values])

    const styles = useStyles()
    return <div>
        <OutlinedInput value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <MenuList className={styles.list}>
            {searchedValues.map((value, index) => {
                return <MenuItem key={index}>
                    <ListItemIcon><Checkbox /></ListItemIcon>
                    {value}
                </MenuItem>
            })}
        </MenuList>
        <div>
            <Button>OK</Button>
            <Button>Cancel</Button>
        </div>
    </div>
}

const useStyles = makeStyles(theme => ({
    list: {
        border: `1px solid ${theme.palette.divider}`,
    },
}))