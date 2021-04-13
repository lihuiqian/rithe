import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingEditRowActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingEditRowAction = (props: DataGridEditingEditRowActionProps) => {
    const { disabled, action } = props
    return <Button
        color="primary"
        disabled={disabled}
        onClick={e => {
            action()
            e.stopPropagation()
        }}>
        Edit
    </Button>
}