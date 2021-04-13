import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingAddRowActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingAddRowAction = (props: DataGridEditingAddRowActionProps) => {
    const { disabled, action } = props
    return <Button
        color="primary"
        disabled={disabled}
        onClick={e => {
            action()
            e.stopPropagation()
        }}>
        Add
    </Button>
}