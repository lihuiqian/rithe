import { Checkbox, makeStyles } from "@material-ui/core";
import React from "react";

export interface DataGridSelectionBodyCheckboxProps {
    checked: boolean,
    toggle: () => void,
}

export const DataGridSelectionBodyCheckbox = (props: DataGridSelectionBodyCheckboxProps) => {
    const { checked, toggle } = props
    const styles = useStyles()
    return <Checkbox
        checked={checked}
        onClick={e => {
            toggle()
            e.stopPropagation()
        }}
        className={styles.root}
    />
}

const useStyles = makeStyles({
    root: {
        zIndex: 0,
    }
})