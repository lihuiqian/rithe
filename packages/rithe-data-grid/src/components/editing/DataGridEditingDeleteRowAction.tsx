import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingDeleteRowActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingDeleteRowAction = (props: DataGridEditingDeleteRowActionProps) => {
    const { disabled, action } = props
    return <Button
        color="primary"
        disabled={disabled}
        onClick={e => {
            action()
            e.stopPropagation()
        }}>
        Delete
    </Button>
}