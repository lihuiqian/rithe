import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingAddRowCommitActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingAddRowCommitAction = (props: DataGridEditingAddRowCommitActionProps) => {
    const { disabled, action } = props
    return <Button
        color="primary"
        disabled={disabled}
        onClick={e => {
            action()
            e.stopPropagation()
        }}>
        Save
    </Button>
}