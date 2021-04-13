import { Checkbox } from "@material-ui/core";
import React from "react";

export interface DataGridSelectionHeaderCheckboxProps {
    checked: boolean,
    indeterminate: boolean,
    toggle: () => void,
}

export const DataGridSelectionHeaderCheckbox = (props: DataGridSelectionHeaderCheckboxProps) => {
    const { checked, indeterminate, toggle } = props
    return <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onClick={e => {
            toggle()
            e.stopPropagation()
        }}
    />
}